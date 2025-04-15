import React, { useState } from 'react';
import './App.css';
import breRules from './data/breRules';
import RuleTable from './components/ruletable';

function App() {
  const [policyData, setPolicyData] = useState(breRules);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  // Handle file upload
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

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData({ 
      ...policyData.ruleUnitDtoList[index],
      ruleConfig: policyData.ruleUnitDtoList[index].ruleConfig || {},
      ruleMetadata: policyData.ruleUnitDtoList[index].ruleMetadata || {}
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [parentKey]: { ...prev[parentKey], [name]: value }
    }));
  };

  const handleSave = () => {
    const updatedRules = [...policyData.ruleUnitDtoList];
    updatedRules[editingIndex] = formData;
    setPolicyData(prev => ({
      ...prev,
      ruleUnitDtoList: updatedRules
    }));
    setEditingIndex(null);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(policyData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${policyData.policyDto?.brePolicyName?.replace(/ /g, '_') || 'policy'}.json`;
    link.click();
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Rule Editor</h1>
        <h2>{policyData.policyDto?.brePolicyName || 'No Policy Loaded'}</h2>
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
        <button className="download-btn" onClick={handleDownload}>
          Download Policy
        </button>
      </div>
      <RuleTable
        rules={policyData.ruleUnitDtoList || []}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        formData={formData}
        handleEdit={handleEdit}
        handleChange={handleChange}
        handleNestedChange={handleNestedChange}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
