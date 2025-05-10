import React, { useState, useRef } from 'react';
import './App.css';
import RuleTable from './components/ruletable';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// In paste-2.txt - Updated generateDiffSummary
function generateDiffSummary(oldRules, newRules) {
  const changes = [];

  const findDeepChanges = (oldObj, newObj, path = '', ruleId = '') => {
    // Handle cases where either value is null/undefined or non-object
    if (
      oldObj === null || newObj === null ||
      typeof oldObj !== 'object' || typeof newObj !== 'object'
    ) {
      if (JSON.stringify(oldObj) !== JSON.stringify(newObj)) {
        changes.push({
          ruleId,
          path,
          old: oldObj,
          new: newObj
        });
      }
      return;
    }

    // Get keys from both objects safely
    const oldKeys = oldObj ? Object.keys(oldObj) : [];
    const newKeys = newObj ? Object.keys(newObj) : [];
    const allKeys = [...new Set([...oldKeys, ...newKeys])];

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key;
      const oldVal = oldObj ? oldObj[key] : undefined;
      const newVal = newObj ? newObj[key] : undefined;

      // Check if either value is object before recursing
      const isOldObject = oldVal !== null && typeof oldVal === 'object';
      const isNewObject = newVal !== null && typeof newVal === 'object';

      if (isOldObject || isNewObject) {
        findDeepChanges(
          isOldObject ? oldVal : {},
          isNewObject ? newVal : {},
          currentPath,
          ruleId
        );
      } else if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
        changes.push({
          ruleId,
          path: currentPath,
          old: oldVal,
          new: newVal
        });
      }
    }
  };

  // Compare rules using maps
  const oldMap = new Map(oldRules.map(r => [r.ruleId, r]));
  const newMap = new Map(newRules.map(r => [r.ruleId, r]));

  // Check added/removed rules
  const allRuleIds = [...new Set([...oldMap.keys(), ...newMap.keys()])];
  
  for (const ruleId of allRuleIds) {
    const oldRule = oldMap.get(ruleId) || {};
    const newRule = newMap.get(ruleId) || {};
    
    if (!oldMap.has(ruleId) || !newMap.has(ruleId)) {
      // Handle added/removed rules
      changes.push({
        ruleId,
        path: '',
        old: oldMap.has(ruleId) ? oldRule : undefined,
        new: newMap.has(ruleId) ? newRule : undefined
      });
    } else {
      // Compare existing rules, path starts empty, pass ruleId separately
      findDeepChanges(oldRule, newRule, '', ruleId);
    }
  }

  // Format for Excel output
  return changes.map(change => ({
    'Rule ID': change.ruleId,
    'Field Path': change.path, // No ruleId prefix
    'Old Value': JSON.stringify(change.old, null, 2),
    'New Value': JSON.stringify(change.new, null, 2)
  }));
}



function jsonToSheetAndBlob(data, sheetName = 'Sheet1') {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: 'application/octet-stream' });
}

function getFileExtension(filename) {
  return filename ? filename.split('.').pop().toLowerCase() : '';
}

function getClientRequestFilename(file) {
  if (!file) return null;
  const ext = getFileExtension(file.name);
  if (ext === 'pdf' || ext === 'xlsx') return `client-request.${ext}`;
  return `client-request.${ext || 'bin'}`;
}

export default function App() {
  const [policyData, setPolicyData] = useState(null);
  const [oldPolicyData, setOldPolicyData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState('rules');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadMeta, setDownloadMeta] = useState({
    fullName: "",
    email: "",
    editDate: new Date().toISOString().slice(0, 10),
    downloadDate: "",
    description: ""
  });
  const [clientRequestFile, setClientRequestFile] = useState(null);
  const clientRequestInputRef = useRef();

  // Category filter state
  const [categoryFilter, setCategoryFilter] = useState('');

  // Extract unique categories for dropdown, excluding 'deviation parameter'
  const allCategories = policyData
    ? Array.from(
        new Set(
          policyData.ruleUnitDtoList
            .map(r => r.ruleTemplateGroupCategory)
            .filter(
              cat =>
                !!cat &&
                cat.toLowerCase() !== 'deviation parameter'
            )
        )
      )
    : [];

  // Upload JSON
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setPolicyData(json);
        setOldPolicyData(JSON.parse(event.target.result)); // Save original for diff
        setEditingIndex(null);
        setFormData({});
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Upload client request file
  const handleClientRequestUpload = (e) => {
    const file = e.target.files[0];
    if (file) setClientRequestFile(file);
  };

  // Download button triggers modal
  const handleDownloadClick = () => {
    setDownloadMeta(meta => ({
      ...meta,
      downloadDate: new Date().toISOString().slice(0, 10)
    }));
    setShowDownloadModal(true);
  };

  // Download logic (attach metadata)
  const handleDownload = async () => {
    const zip = new JSZip();
    // old-rules.json
    zip.file('old-rules.json', JSON.stringify(oldPolicyData, null, 2));
    // new-rules.json
    zip.file('new-rules.json', JSON.stringify(policyData, null, 2));
    // audit-metadata.json
    zip.file('audit-metadata.json', JSON.stringify(downloadMeta, null, 2));
    // client-request.pdf/xlsx
    if (clientRequestFile) {
      const data = await clientRequestFile.arrayBuffer();
      zip.file(getClientRequestFilename(clientRequestFile), data);
    }
    // diff-summary.xlsx (only changed fields)
    const oldRules = oldPolicyData?.ruleUnitDtoList || [];
    const newRules = policyData?.ruleUnitDtoList || [];
    const diffSummary = generateDiffSummary(oldRules, newRules);
    const diffBlob = jsonToSheetAndBlob(diffSummary, 'DiffSummary');
    zip.file('diff-summary.xlsx', diffBlob);

    // Download ZIP
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${policyData.policyDto?.brePolicyName?.replace(/ /g, '_') || 'policy'}_export.zip`);
    });
    setShowDownloadModal(false);
  };

  // Delete rule
  const handleDelete = (index) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) return;
    const updatedRules = [...policyData.ruleUnitDtoList];
    updatedRules.splice(index, 1);
    setPolicyData(prev => ({
      ...prev,
      ruleUnitDtoList: updatedRules
    }));
    setEditingIndex(null);
  };

  //Add rule
  const handleAddRule = () => {
    setFormData({
      ruleId: `rule-${Date.now()}`,
      ruleCheckpointParameter: '',
      ruleTemplateGroupCategory: '',
      ruleType: '',
      ruleConfig: { value: '' },
      ruleMetadata: { ruleDescription: '' },
      operand: {
        operandType: '',
        value: '',
        operandDefinition: [
          {
            operandType: '',
            value: '',
            operandDefinition: null,
            operation: null
          }
        ],
        operation: {
          operatorType: '',
          operatorValue: ''
        }
      },
      isActive: true
    });
    setAdding(true);
  };

  const handleSaveNewRule = (newRule) => {
    setPolicyData(prev => ({
      ...prev,
      ruleUnitDtoList: [...prev.ruleUnitDtoList, newRule]
    }));
    setAdding(false);
    setFormData({});
  };

  // Filter rules based on tab and category
  let filteredRules = [];
  if (policyData) {
    if (activeTab === 'rules') {
      filteredRules = policyData.ruleUnitDtoList
        .filter(rule =>
          rule.ruleTemplateGroupCategory?.toLowerCase() !== 'deviation parameter' &&
          (!categoryFilter || rule.ruleTemplateGroupCategory === categoryFilter)
        );
    } else {
      // Deviations tab: show all deviations, ignore categoryFilter
      filteredRules = policyData.ruleUnitDtoList
        .filter(rule => rule.ruleTemplateGroupCategory?.toLowerCase() === 'deviation parameter');
    }
  }
  

  return (
    <div className="App">
      <div className="header">
        <h1>Business Rule Editor</h1>
        {policyData && <h2>{policyData.policyDto?.brePolicyName || 'No Policy Loaded'}</h2>}
      </div>
      <div className="button-row">
        <label className="upload-btn">
          Upload JSON
          <input
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
        </label>
        <label className="upload-btn" style={{ marginLeft: 10 }}>
          Upload Client Request (PDF/XLSX)
          <input
            ref={clientRequestInputRef}
            type="file"
            accept=".pdf,.xlsx"
            style={{ display: 'none' }}
            onChange={handleClientRequestUpload}
          />
        </label>
        {clientRequestFile && (
          <span style={{ marginLeft: 10, color: '#007bff' }}>
            {clientRequestFile.name}
          </span>
        )}
        {policyData && (
          <>
            {/*<button className="add-btn" onClick={handleAddRule}>
              + Add Rule
            </button>*/}
            <button className="download-btn" onClick={handleDownloadClick}>
              Download Policy ZIP
            </button>
          </>
        )}
      </div>
      {policyData && (
  <div className="tabs-container">
    <div className="tabs-filter-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'rules' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Rules
        </button>
        <button
          className={`tab ${activeTab === 'deviations' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('deviations')}
        >
          Deviations
        </button>
      </div>
      {activeTab === 'rules' && (
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="category-filter-label">Filter by Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Filter by Category"
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {allCategories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
    <RuleTable
      rules={filteredRules}
      isDeviation={activeTab === 'deviations'}
      editingIndex={editingIndex}
      setEditingIndex={setEditingIndex}
      formData={formData}
      setFormData={setFormData}
      handleSave={(updatedRule) => {
        const updatedRules = [...policyData.ruleUnitDtoList];
        const globalIndex = policyData.ruleUnitDtoList.findIndex(
          rule => rule.ruleId === updatedRule.ruleId
        );
        updatedRules[globalIndex] = updatedRule;
        setPolicyData(prev => ({
          ...prev,
          ruleUnitDtoList: updatedRules
        }));
        setEditingIndex(null);
      }}
      handleDelete={(index) => {
        const globalIndex = policyData.ruleUnitDtoList.findIndex(
          rule => rule.ruleId === filteredRules[index].ruleId
        );
        handleDelete(globalIndex);
      }}
      adding={adding}
      setAdding={setAdding}
      handleSaveNewRule={handleSaveNewRule}
    />
  </div>
)}


      {/* Download Metadata Modal */}
      <Dialog open={showDownloadModal} onClose={() => setShowDownloadModal(false)}>
        <DialogTitle>Download Policy Metadata</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400 }}>
            <TextField
              label="Full Name"
              value={downloadMeta.fullName}
              onChange={e => setDownloadMeta(meta => ({ ...meta, fullName: e.target.value }))}
              required
            />
            <TextField
              label="Official Email"
              type="email"
              value={downloadMeta.email}
              onChange={e => setDownloadMeta(meta => ({ ...meta, email: e.target.value }))}
              required
            />
            <TextField
              label="Date of Editing"
              value={downloadMeta.editDate}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Date of Download"
              value={downloadMeta.downloadDate}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Description of Changes"
              value={downloadMeta.description}
              onChange={e => setDownloadMeta(meta => ({ ...meta, description: e.target.value }))}
              multiline
              minRows={2}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDownloadModal(false)} color="secondary">Cancel</Button>
          <Button
            onClick={handleDownload}
            variant="contained"
            disabled={
              !downloadMeta.fullName ||
              !downloadMeta.email ||
              !downloadMeta.description
            }
          >
            Download ZIP
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
