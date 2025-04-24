import React, { useState } from 'react';
import './ruletable.css';

// Editable fields logic
function isEditable(path) {
  const normalized = path.replace(/\[(\d+)\]/g, '.$1');
  return (
    // Everything in ruleConfig
    normalized.startsWith('ruleConfig') ||
    // Everything in any orderOfOccurence array (at any depth)
    /\.orderOfOccurence\.\d+\./.test(normalized) ||
    // Any field named 'value' or 'operatorValue' at any depth
    /\.?value$/.test(normalized) ||
    /\.?operatorValue$/.test(normalized) ||
    // Specific fields
    normalized === 'ruleString' ||
    normalized === 'ruleMetadata.ruleDescription' ||
    normalized === 'ruleMetadata.failureDescription' ||
    normalized === 'ruleActionString' ||
    normalized === 'importList' ||
    /^importList\.\d+$/.test(normalized)
  );
}

// Collapsible field group for nested objects/arrays
function Collapsible({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="collapsible">
      <div className="collapsible-header" onClick={() => setOpen(o => !o)}>
        <span className="collapsible-arrow">{open ? '▼' : '▶'}</span>
        <span className="collapsible-label">{label}</span>
      </div>
      {open && <div className="collapsible-content">{children}</div>}
    </div>
  );
}

function renderEditableFields(obj, path, handleDeepChange, level = 0) {
  if (typeof obj !== 'object' || obj === null) return null;

  return Object.entries(obj).map(([key, value]) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (Array.isArray(value)) {
      // For importList, make each string item editable
      const isImportList = currentPath.endsWith('importList');
      return (
        <Collapsible key={currentPath} label={key} defaultOpen={level < 1}>
          {value.map((item, idx) => (
            <div className="array-item" key={`${currentPath}[${idx}]`}>
              {isImportList && typeof item !== 'object' ? (
                <input
                  type="text"
                  value={item ?? ''}
                  onChange={e => handleDeepChange(`${currentPath}[${idx}]`, e.target.value)}
                  className={isEditable(`${currentPath}[${idx}]`) ? '' : 'read-only-field'}
                  disabled={!isEditable(`${currentPath}[${idx}]`)}
                />
              ) : (
                <Collapsible label={`[${idx}]`} defaultOpen={level < 1}>
                  {renderEditableFields(item, `${currentPath}[${idx}]`, handleDeepChange, level + 2)}
                </Collapsible>
              )}
            </div>
          ))}
        </Collapsible>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <Collapsible key={currentPath} label={key} defaultOpen={level < 1}>
          {renderEditableFields(value, currentPath, handleDeepChange, level + 1)}
        </Collapsible>
      );
    }

    const editable = isEditable(currentPath);
    return (
      <div className="form-group" key={currentPath} style={{ marginLeft: `${level * 16}px` }}>
        <label>{key}:</label>
        <input
          type="text"
          value={value ?? ''}
          onChange={e => handleDeepChange(currentPath, e.target.value)}
          disabled={!editable}
          className={editable ? '' : 'read-only-field'}
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
              {renderEditableFields(formData, '', handleDeepChange)}
            </div>
            <div className="modal-actions fixed-actions">
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
              {renderEditableFields(formData, '', handleDeepChange)}
            </div>
            <div className="modal-actions fixed-actions">
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
