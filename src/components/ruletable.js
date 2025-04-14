import React from 'react';
import './ruletable.css';

export default function RuleTable({
  rules,
  editingIndex,
  setEditingIndex, // Receive this prop from App.js
  formData,
  handleEdit,
  handleChange,
  handleNestedChange,
  handleSave
}) {
  return (
    <div className="rule-table-container">
      <table className="rule-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Rule ID</th>
            <th>Checkpoint Parameter</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={rule.ruleId}>
              <td>{index + 1}</td> {/* Row numbering */}
              <td>{rule.ruleId}</td>
              <td>{rule.ruleCheckpointParameter}</td>
              <td>{rule.ruleTemplateGroupCategory}</td>
              <td>{rule.ruleMetadata?.ruleDescription || 'N/A'}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingIndex !== null && (
        <div className="modal">
          <h3>Edit Rule</h3>

          {/* Core Fields */}
          <div className="form-group">
            <label>Checkpoint Parameter:</label>
            <input
              name="ruleCheckpointParameter"
              value={formData.ruleCheckpointParameter || ''}
              onChange={handleChange}
            />
          </div>

          {/* Metadata Fields */}
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="ruleDescription"
              value={formData.ruleMetadata?.ruleDescription || ''}
              onChange={(e) => handleNestedChange(e, 'ruleMetadata')}
            />
          </div>

          {/* Modal Actions */}
          <div className="modal-actions">
            {/* Use setEditingIndex to close the modal */}
            <button className="cancel-btn" onClick={() => setEditingIndex(null)}>
              Cancel
            </button>
            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
