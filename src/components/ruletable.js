import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, IconButton, Select, MenuItem
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import './ruletable.css';

// Editable fields logic
function isEditable(path) {
  const normalized = path.replace(/\[(\d+)\]/g, '.$1');
  return (
    normalized.startsWith('ruleConfig') ||
    /\.orderOfOccurence\.\d+\./.test(normalized) ||
    /\.?value$/.test(normalized) ||
    /\.?operatorValue$/.test(normalized) ||
    normalized === 'ruleString' ||
    normalized === 'ruleMetadata.ruleDescription' ||
    normalized === 'ruleMetadata.failureDescription' ||
    normalized === 'ruleActionString' ||
    normalized === 'importList' ||
    /^importList\.\d+$/.test(normalized)
  );
}

function flattenFields(obj, path = '', level = 0) {
  let rows = [];
  Object.entries(obj).forEach(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (path.endsWith('ruleConfig')) {
      if (key === 'allowedList' || key === 'blockList') {
        rows.push({
          label: 'listType',
          value: key,
          listValue: value,
          path: currentPath,
          editable: true,
          level,
          isDropdownList: true
        });
      } else {
        rows.push({
          label: key,
          value,
          path: currentPath,
          editable: key === 'param',
          level
        });
      }
    } else if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        if (typeof item !== 'object' || item === null) {
          rows.push({
            label: `${key} [${idx}]`,
            value: item,
            path: `${currentPath}[${idx}]`,
            editable: isEditable(`${currentPath}[${idx}]`),
            level
          });
        } else {
          rows.push({
            label: `${key} [${idx}]`,
            isCollapsible: true,
            level,
            children: flattenFields(item, `${currentPath}[${idx}]`, level + 1)
          });
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      rows.push({
        label: key,
        isCollapsible: true,
        level,
        children: flattenFields(value, currentPath, level + 1)
      });
    } else {
      rows.push({
        label: key,
        value,
        path: currentPath,
        editable: isEditable(currentPath),
        level
      });
    }
  });
  return rows;
}

function RenderGridRows({ rows, handleDeepChange }) {
  const [openMap, setOpenMap] = useState({});

  const handleToggle = (label, level) => {
    setOpenMap(prev => ({
      ...prev,
      [label + level]: !prev[label + level]
    }));
  };

  return rows.map((row, idx) => {
    if (row.isDropdownList) {
      return (
        <React.Fragment key={row.path}>
          <Box
            sx={{
              gridColumn: 1,
              display: 'flex',
              alignItems: 'center',
              pl: `${row.level * 2}em`,
              whiteSpace: 'nowrap'
            }}
          >
            <Typography variant="body2">List Type:</Typography>
          </Box>
          <Box
            sx={{
              gridColumn: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Select
              value={row.value}
              onChange={e => handleDeepChange(row.path + '.listType', e.target.value)}
              size="small"
              sx={{ minWidth: 120, marginRight: 2 }}
            >
              <MenuItem value="allowedList">allowedList</MenuItem>
              <MenuItem value="blockList">blockList</MenuItem>
            </Select>
            <TextField
              size="small"
              value={
                typeof row.listValue === 'string'
                  ? row.listValue
                  : (Array.isArray(row.listValue) ? row.listValue.join(', ') : '')
              }
              onChange={e => handleDeepChange(row.path + '.listValue', e.target.value)}
              sx={{ width: 300 }}
            />
          </Box>
        </React.Fragment>
      );
    }

    if (row.isCollapsible) {
      const isOpen = openMap[row.label + row.level] ?? row.level < 1;
      return (
        <React.Fragment key={row.label + idx}>
          <Box
            sx={{
              gridColumn: '1 / span 2',
              display: 'flex',
              alignItems: 'center',
              pl: `${row.level * 2}em`,
              cursor: 'pointer',
              userSelect: 'none',
              mb: 0.5
            }}
            onClick={() => handleToggle(row.label, row.level)}
          >
            <IconButton size="small">
              {isOpen ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </IconButton>
            <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>{row.label}</Typography>
          </Box>
          {isOpen && <RenderGridRows rows={row.children} handleDeepChange={handleDeepChange} />}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={row.path}>
        <Box
          sx={{
            gridColumn: 1,
            display: 'flex',
            alignItems: 'center',
            pl: `${row.level * 2}em`,
            whiteSpace: 'nowrap'
          }}
          component="label"
          htmlFor={row.path}
        >
          {row.label}:
        </Box>
        <Box
          sx={{
            gridColumn: 2,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <TextField
            id={row.path}
            size="small"
            value={row.value ?? ''}
            onChange={e => handleDeepChange(row.path, e.target.value)}
            disabled={!row.editable}
            sx={{
              width: 400,
              background: row.editable ? 'white' : '#f8f9fa'
            }}
            inputProps={{ style: { textAlign: 'left' } }}
          />
        </Box>
      </React.Fragment>
    );
  });
}

export default function RuleTable({
  rules,
  isDeviation,
  editingIndex,
  setEditingIndex,
  formData,
  setFormData,
  handleSave,
  handleDelete,
  adding,
  setAdding,
  handleSaveNewRule
}) {
  const handleDeepChange = (path, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');

      // Handle dropdown toggle for allowedList/blockList
      if (keys[keys.length - 1] === 'listType') {
        const parentPath = keys.slice(0, -2).join('.');
        const parent = getNestedObject(newData, parentPath);
        if (parent) {
          const oldKey = Object.keys(parent).find(k => k === 'allowedList' || k === 'blockList');
          if (oldKey && oldKey !== value) {
            parent[value] = parent[oldKey];
            delete parent[oldKey];
          }
        }
        return newData;
      }

      // Handle value change for the list
      if (keys[keys.length - 2] && keys[keys.length - 1] === 'listValue') {
        const parentPath = keys.slice(0, -2).join('.');
        const parent = getNestedObject(newData, parentPath);
        const listKey = Object.keys(parent).find(k => k === 'allowedList' || k === 'blockList');
        if (listKey) {
          parent[listKey] = value;
        }
        return newData;
      }

      // Default: normal deep change
      let obj = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const getNestedObject = (obj, path) => {
    if (!path) return obj;
    return path.split('.').reduce((o, p) => o?.[p], obj);
  };

  const getFullPath = (rule) => {
    return rule?.operand?.operandDefinition?.[0]?.fullPath ||
           rule?.fullPath ||
           rule?.ruleMetadata?.orderOfOccurence?.[0]?.fullPath ||
           '--';
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(JSON.parse(JSON.stringify(rules[index])));
  };

  const editingRule = editingIndex !== null && rules[editingIndex] ? rules[editingIndex] : null;
  const editingRuleName = editingRule?.ruleCheckpointParameter || '';
  const rows = editingIndex !== null && formData ? flattenFields(formData, '', 0) : [];

  return (
    <div className="rule-table-container">
      <table className="rule-table">
        <thead>
          <tr>
            {isDeviation ? (
              <>
                <th>Param</th>
                <th>List Type</th>
                <th>List Value</th>
                <th>Full Path</th>
                <th>Actions</th>
              </>
            ) : (
              <>
                <th>Display Name</th>
                <th>Category</th>
                <th>Rule Description</th>
                <th>Failure Description</th>
                <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule.ruleId || index}>
              {isDeviation ? (
                <>
                  <td>{rule?.ruleConfig?.param || '--'}</td>
                  <td>{rule?.ruleConfig?.allowedList ? "allowedList" : "blockList"}</td>
                  <td>
                    {rule?.ruleConfig?.allowedList 
                      ? (Array.isArray(rule.ruleConfig.allowedList) 
                          ? rule.ruleConfig.allowedList.join(', ') 
                          : rule.ruleConfig.allowedList)
                      : (Array.isArray(rule.ruleConfig.blockList) 
                          ? rule.ruleConfig.blockList.join(', ') 
                          : rule.ruleConfig.blockList)}
                  </td>
                  <td>{getFullPath(rule)}</td>
                </>
              ) : (
                <>
                  <td>{rule?.ruleMetadata?.orderOfOccurence?.[0]?.displayName || '--'}</td>
                  <td>{rule?.ruleTemplateGroupCategory || '--'}</td>
                  <td>{rule?.ruleMetadata?.ruleDescription || '--'}</td>
                  <td>{rule?.ruleMetadata?.failureDescription || '--'}</td>
                </>
              )}
              <td className="actions-cell">
                <button className="edit-btn" onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Dialog
        open={editingIndex !== null}
        onClose={() => setEditingIndex(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: { overflowX: 'auto', minWidth: 700 }
        }}
      >
        <DialogTitle>
          {isDeviation ? "Edit Deviation: " : "Edit Rule: "}
          <span style={{ color: "#1976d2", fontWeight: 600 }}>
            {editingRuleName}
          </span>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            maxHeight: '60vh',
            overflowY: 'auto',
            overflowX: 'auto',
            minWidth: 700,
            p: 0
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr',
              alignItems: 'center',
              gap: 2,
              minWidth: 700,
              p: 4
            }}
          >
            <RenderGridRows rows={rows} handleDeepChange={handleDeepChange} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ position: 'sticky', bottom: 0, background: '#fff', zIndex: 2 }}>
          <Button
            onClick={() => setEditingIndex(null)}
            variant="outlined"
            sx={{
              color: '#fff',
              background: '#e74c3c',
              borderColor: '#e74c3c',
              '&:hover': { background: '#c0392b', borderColor: '#c0392b' }
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleSave(formData)} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Rule Modal */}
      <Dialog open={adding} onClose={() => setAdding(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Rule</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: '60vh', overflowY: 'auto', overflowX: 'auto', minWidth: 700, p: 0 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'max-content 1fr',
              alignItems: 'center',
              gap: 2,
              minWidth: 700,
              p: 4
            }}
          >
            {adding && <RenderGridRows rows={flattenFields(formData, '', 0)} handleDeepChange={handleDeepChange} />}
          </Box>
        </DialogContent>
        <DialogActions sx={{ position: 'sticky', bottom: 0, background: '#fff', zIndex: 2 }}>
          <Button
            onClick={() => setAdding(false)}
            variant="outlined"
            sx={{
              color: '#fff',
              background: '#e74c3c',
              borderColor: '#e74c3c',
              '&:hover': { background: '#c0392b', borderColor: '#c0392b' }
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleSaveNewRule(formData)} variant="contained">
            Add Rule
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
