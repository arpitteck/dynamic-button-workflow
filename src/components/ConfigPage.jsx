import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const availableActions = [
  "Alert",
  "Show Text",
  "Show Image",
  "Refresh",
  "Set LocalStorage",
  "Get LocalStorage",
  "Increase Size",
  "Change Color",
  "Disable Button",
  "Prompt",
  "Close Window",
];

function ConfigPage() {
  const [buttonLabel, setButtonLabel] = useState("Click Me!");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    if (savedConfig) {
      setButtonLabel(savedConfig.label || "Click Me!");
      setActions(savedConfig.actions || []);
    }
  }, []);

  const addAction = (type) => {
    setActions([...actions, { type, value: "" }]);
  };

  const updateAction = (index, key, value) => {
    const newActions = [...actions];
    newActions[index][key] = value;
    setActions(newActions);
  };

  const removeAction = (index) => {
    const newActions = actions.filter((_, i) => i !== index);
    setActions(newActions);
  };

  const discardActions = () => {
    setActions([]);
  };

  const saveConfig = () => {
    const config = {
      label: buttonLabel,
      actions,
    };
    localStorage.setItem("buttonConfig", JSON.stringify(config));
    alert("Configuration Saved!");
  };

  return (
    <div className="container">
      <h1>Config Page</h1>
      <label>
        Button Label:
        <input value={buttonLabel} onChange={(e) => setButtonLabel(e.target.value)} />
      </label>
      <br />

      <h3>Actions:</h3>
      {actions.map((action, index) => (
        <div key={index}>
          <strong>{action.type}</strong>
          <input
            placeholder="Enter value (if needed)"
            value={action.value}
            onChange={(e) => updateAction(index, "value", e.target.value)}
          />
          <button onClick={() => removeAction(index)}>Remove</button>
        </div>
      ))}
      <br />
      <h3>Add Action:</h3>
      <select onChange={(e) => addAction(e.target.value)}>
        <option value="">Select an action</option>
        {availableActions.map((action) => (
          <option key={action} value={action}>{action}</option>
        ))}
      </select>
      <br />
      <button onClick={discardActions}>Discard All Actions</button>
      <button onClick={saveConfig}>Save Configuration</button>
      <br />
      <Link to="/output">Go to Output Page</Link>
    </div>
  );
}

export default ConfigPage;
