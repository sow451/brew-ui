import React, { useState } from 'react';
import './App.css';
import breRules from './data/breRules';
import RuleTable from './components/ruletable';



function App() {

  const [rules, setRules] = useState([breRules]); //Start with an array that contains 1 rule — the sample rule — and let me update it later.
  const [editingIndex, setEditingIndex] = useState(null); //Keep track of which rule I'm editing (if any), and start with no rule selected.
  const [formData, setFormData] = useState({}); //Set formData as a scratchpad where you hold the current version of a rule the user is editing, before saving it into the main list.

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(rules[index]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: {
        ...formData[parentKey],
        [name]: value
      }
    });
  };

  const handleSave = () => {
    const updatedRules = [...rules];
    updatedRules[editingIndex] = formData;
    setRules(updatedRules);
    setEditingIndex(null);
  };

  return (
    <div className="App">
    <h1>Rule Manager</h1>
    <RuleTable
      rules={rules}
      formData={formData}
      editingIndex={editingIndex}
      setEditingIndex={setEditingIndex}
      setFormData={setFormData}
      handleEdit={handleEdit}
      handleChange={handleChange}
      handleNestedChange={handleNestedChange}
      handleSave={handleSave}
    />
  </div>
  );
}

export default App;
