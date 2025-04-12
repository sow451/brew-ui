import React from 'react';
export default function RuleTable({
rules, 
setRules,
editingIndex, 
setEditingIndex,
formData, 
setFormData,
handleEdit,
handleChange,
handleNestedChange,
handleSave

}) {

return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rule</th>
            <th>Category</th>
            <th>Value</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule.ruleId}>
              <td>{rule.ruleId}</td>
              <td>{rule.ruleCheckpointParameter}</td>
              <td>{rule.ruleTemplateGroupCategory}</td>
              <td>{rule.ruleConfig.value}</td>
              <td>{rule.ruleMetadata.ruleDescription}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIndex !== null && (
        <div className="modal">
          <h2>Edit Rule</h2>
          <input
            name="ruleCheckpointParameter"
            value={formData.ruleCheckpointParameter}
            onChange={handleChange}
            placeholder="Rule Name"
          />
          <input
            name="ruleTemplateGroupCategory"
            value={formData.ruleTemplateGroupCategory}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            name="value"
            value={formData.ruleConfig.value}
            onChange={(e) => handleNestedChange(e, 'ruleConfig')}
            placeholder="Value"
          />
          <input
            name="ruleDescription"
            value={formData.ruleMetadata.ruleDescription}
            onChange={(e) => handleNestedChange(e, 'ruleMetadata')}
            placeholder="Description"
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
}
