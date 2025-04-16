import React from 'react';
import './ruletable.css';

// Recursively render fields for editing
function renderFields(obj, path, handleDeepChange) {
  if (typeof obj !== 'object' || obj === null) return null;

  return Object.entries(obj).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    // For arrays (like operandDefinition)
    if (Array.isArray(value)) {
      return (
        <div className="form-group" key={currentPath}>
          <label>{key}:</label>
          {value.map((item, idx) => (
            <div className="array-item" key={currentPath + '[' + idx + ']'}>
              <span className="array-index">[{idx + 1}]</span>
              {typeof item === 'object'
                ? renderFields(item, `${currentPath}[${idx}]`, handleDeepChange)
                : (
                  <input
                    value={item}
                    onChange={e => handleDeepChange(`${currentPath}[${idx}]`, e.target.value)}
                  />
                )
              }
            </div>
          ))}
        </div>
      );
    }

    // For nested objects
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="form-group nested" key={currentPath}>
          <label>{key}:</label>
          {renderFields(value, currentPath, handleDeepChange)}
        </div>
      );
    }

    // For primitive values
    return (
      <div className="form-group" key={currentPath}>
        <label>{key}:</label>
        <input
          type={typeof value === 'number' ? 'number' : 'text'}
          value={value}
          onChange={e => handleDeepChange(currentPath, e.target.value)}
        />
      </div>
    );
  });
}

export default function RuleTable({
  rules,
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
  // Deep change handler
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

  return (
    <div className="rule-table-container">
      <table className="rule-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Rule ID</th>
            <th>Checkpoint</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule.ruleId}>
              <td>{index + 1}</td>
              <td>{rule.ruleId}</td>
              <td>{rule.ruleCheckpointParameter}</td>
              <td>{rule.ruleTemplateGroupCategory}</td>
              <td>{rule.ruleMetadata?.ruleDescription || 'N/A'}</td>
              <td className="actions-cell">
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div className="modal-overlay">
          <div className="modal improved-modal">
            <div className="modal-header">
              <h2>Edit Rule</h2>
              <button className="close-btn" onClick={() => setEditingIndex(null)}>&times;</button>
            </div>
            <div className="modal-body">
              {renderFields(formData, '', handleDeepChange)}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setEditingIndex(null)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => handleSave(formData)}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Rule Modal */}
      {adding && (
        <div className="modal-overlay">
          <div className="modal improved-modal">
            <div className="modal-header">
              <h2>Add Rule</h2>
              <button className="close-btn" onClick={() => setAdding(false)}>&times;</button>
            </div>
            <div className="modal-body">
              {renderFields(formData, '', handleDeepChange)}
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setAdding(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={() => handleSaveNewRule(formData)}>
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
