import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, Typography, IconButton
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

// Flatten all fields into {label, value, path, editable, level, isCollapsible, children}
function flattenFields(obj, path = '', level = 0) {
  let rows = [];
  Object.entries(obj).forEach(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;
    if (path.endsWith('ruleConfig')) {
      // Special: allow editing key and value for ruleConfig
      rows.push({
        keyLabel: key,
        value,
        path: currentPath,
        editable: true,
        level,
        isRuleConfigPair: true
      });
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


function RenderGridRows({ rows, handleDeepChange, handleRenameRuleConfigKey }) {
  const [openMap, setOpenMap] = useState({});

  const handleToggle = (label, level) => {
    setOpenMap(prev => ({
      ...prev,
      [label + level]: !prev[label + level]
    }));
  };

  return rows.map((row, idx) => {
    // Handle ruleConfig key-value pairs first
    if (row.isRuleConfigPair) {
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
            <TextField
              value={row.keyLabel}
              size="small"
              sx={{ width: 180, marginRight: 2 }}
              onChange={e => {
                const newKey = e.target.value;
                handleRenameRuleConfigKey(row.path, newKey, row.value);
              }}
            />
            :
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
              value={Array.isArray(row.value) ? row.value.join(', ') : row.value || ''}
              onChange={e => {
                handleDeepChange(
                  row.path,
                  typeof row.value === 'string' 
                    ? e.target.value 
                    : e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                );
              }}
              sx={{ width: 400, background: 'white' }}
              inputProps={{ style: { textAlign: 'left' } }}
            />
          </Box>
        </React.Fragment>
      );
    }

    // Handle collapsible sections
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
          {isOpen && <RenderGridRows 
            rows={row.children} 
            handleDeepChange={handleDeepChange}
            handleRenameRuleConfigKey={handleRenameRuleConfigKey}
          />}
        </React.Fragment>
      );
    }

    // Handle normal fields
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
            className={row.editable ? '' : 'read-only-field'}
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
  const [viewMode, setViewMode] = useState('allowed');
  const [modalViewMode, setModalViewMode] = useState('allowed');

  // ✅ Declare handleRenameRuleConfigKey FIRST
  const handleRenameRuleConfigKey = (path, newKey, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      if (keys.length === 2 && keys[0] === 'ruleConfig') {
        const oldKey = keys[1];
        if (newKey && newKey !== oldKey && !newData.ruleConfig[newKey]) {
          newData.ruleConfig[newKey] = value;
          delete newData.ruleConfig[oldKey];
        }
      }
      return newData;
    });
  };

  const handleDeepChange = (path, value) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
      let obj = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newData;
    });
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
                <th className="dropdown-header">
                  <select
                    className="column-dropdown"
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                  >
                    <option value="allowed">Allowed</option>
                    <option value="block">Block</option>
                  </select>
                </th>
                <th>Full Path</th>
                <th>Display Name</th>
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
            <tr key={rule.ruleId}>
              {isDeviation ? (
                <>
                  <td>{rule?.ruleConfig?.param || '--'}</td>
                  <td>
                    {viewMode === 'allowed'
                      ? (rule?.ruleConfig?.allowedList
                          ? (Array.isArray(rule.ruleConfig.allowedList)
                              ? rule.ruleConfig.allowedList.join(', ')
                              : rule.ruleConfig.allowedList)
                          : '--')
                      : (rule?.ruleConfig?.blockList
                          ? (Array.isArray(rule.ruleConfig.blockList)
                              ? rule.ruleConfig.blockList.join(', ')
                              : rule.ruleConfig.blockList)
                          : '--')}
                  </td>
                  <td>{rule?.ruleMetadata?.orderOfOccurence?.[0]?.fullPath || '--'}</td>
                  <td>{rule?.ruleMetadata?.orderOfOccurence?.[0]?.displayName || '--'}</td>
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
            <RenderGridRows
              rows={rows}
              handleDeepChange={handleDeepChange}
              handleRenameRuleConfigKey={handleRenameRuleConfigKey}
            />
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
