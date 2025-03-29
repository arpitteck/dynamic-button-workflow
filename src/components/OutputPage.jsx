import { useState, useEffect } from "react";

function OutputPage() {
  const [config, setConfig] = useState(null);
  const [buttonSize, setButtonSize] = useState(16);
  const [buttonColor, setButtonColor] = useState("#000");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const savedConfig = JSON.parse(localStorage.getItem("buttonConfig"));
    const savedSize = localStorage.getItem("buttonSize");
    const savedImage = localStorage.getItem("imageUrl");
    const savedDisabled = localStorage.getItem("buttonDisabled");

    if (savedConfig) setConfig(savedConfig);
    if (savedSize) setButtonSize(Number(savedSize));
    if (savedImage) setImageUrl(savedImage);
    if (savedDisabled === "true") setButtonDisabled(true);
  }, []);

  const executeActions = async () => {
    if (!config || !config.actions) return;
    let name = "";

    for (const action of config.actions) {
      switch (action.type) {
        case "Alert":
          alert(action.value || "");
          break;
        case "Show Text":
          setDisplayText(action.value || "");
          break;
        case "Show Image":
          setImageUrl(action.value || "");
          localStorage.setItem("imageUrl", action.value || "");
          break;
        case "Refresh":
          window.location.reload();
          return;
        case "Set LocalStorage":
          const [key, value] = action.value.split(":");
          if (key && value) localStorage.setItem(key, value);
          break;
        case "Get LocalStorage":
          const storedValue = localStorage.getItem(action.value || "");
          setDisplayText(storedValue || "Key not found");
          break;
        case "Increase Size":
          setButtonSize((prevSize) => {
            const newSize = prevSize + 10;
            localStorage.setItem("buttonSize", newSize);
            return newSize;
          });
          break;
        case "Change Color":
          setButtonColor(action.value || "#" + Math.floor(Math.random() * 16777215).toString(16));
          break;
        case "Disable Button":
          setButtonDisabled(true);
          localStorage.setItem("buttonDisabled", "true");
          break;
        case "Prompt":
          name = prompt(action.value || "Enter something:") || "";
          break;
        case "Close Window":
          window.close();
          break;
        default:
          break;
      }
    }

    if (name) {
      setDisplayText(`Hello, ${name}`);
      localStorage.setItem("user", name);
    }
  };

  const enableButton = () => {
    setButtonDisabled(false);
    localStorage.setItem("buttonDisabled", "false");
  };

  return (
    <div className="container">
      <h1>Output Page</h1>
      <button
        onClick={executeActions}
        style={{ fontSize: `${buttonSize}px`, backgroundColor: buttonColor }}
        disabled={buttonDisabled}
      >
        {config?.label || "Click Me!"}
      </button>

      {buttonDisabled && (
        <button onClick={enableButton} style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Enable Button
        </button>
      )}

      <div>{displayText && <p>{displayText}</p>}</div>
      <div>{imageUrl && <img src={imageUrl} alt="User provided" width={200} />}</div>
    </div>
  );
}

export default OutputPage;
