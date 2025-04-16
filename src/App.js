import React, { useState } from 'react';
import './App.css';
import RuleTable from './components/ruletable';

function App() {
  const [policyData, setPolicyData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [adding, setAdding] = useState(false);

  // Upload JSON
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setPolicyData(json);
        setEditingIndex(null);
        setFormData({});
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Download JSON
  const handleDownload = () => {
    const dataStr = JSON.stringify(policyData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policyData.policyDto?.brePolicyName?.replace(/ /g, '_') || 'policy'}.json`;
    link.click();
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

  // Add rule
  const handleAddRule = () => {
    setFormData({
      ruleId: `rule-${Date.now()}`,
      ruleCheckpointParameter: '',
      ruleTemplateGroupCategory: '',
      ruleMetadata: { ruleDescription: '' },
      ruleConfig: {},
      operand: {},
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

  return (
    <div className="App">
      <div className="header">
        <h1>Rule Editor</h1>
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
        {policyData && (
          <>
            <button className="add-btn" onClick={handleAddRule}>
              + Add Rule
            </button>
            <button className="download-btn" onClick={handleDownload}>
              Download Policy
            </button>
          </>
        )}
      </div>
      {policyData && (
        <RuleTable
          rules={policyData.ruleUnitDtoList || []}
          editingIndex={editingIndex}
          setEditingIndex={setEditingIndex}
          formData={formData}
          setFormData={setFormData}
          handleSave={(updatedRule) => {
            const updatedRules = [...policyData.ruleUnitDtoList];
            updatedRules[editingIndex] = updatedRule;
            setPolicyData(prev => ({
              ...prev,
              ruleUnitDtoList: updatedRules
            }));
            setEditingIndex(null);
          }}
          handleDelete={handleDelete}
          adding={adding}
          setAdding={setAdding}
          handleSaveNewRule={handleSaveNewRule}
        />
      )}
    </div>
  );
}

export default App;
