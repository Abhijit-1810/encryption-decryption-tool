import { useState } from "react";

const EncryptDecrypt = () => {
  const [mode, setMode] = useState("encrypt");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [shift, setShift] = useState(3);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  /* ---------- Base64 ---------- */
  const handleBase64 = () => {
    if (!input) return;
    try {
      setOutput(mode === "encrypt" ? btoa(input) : atob(input));
      setMessage("Operation successful");
    } catch {
      setOutput("");
      setMessage("Invalid input for decryption");
    }
  };

  /* ---------- Caesar Cipher ---------- */
  const handleCaesar = () => {
    if (!input) return;

    let result = "";
    for (let char of input) {
      const code =
        mode === "encrypt"
          ? char.charCodeAt(0) + shift
          : char.charCodeAt(0) - shift;
      result += String.fromCharCode(code);
    }

    setOutput(result);
    setMessage("Operation successful");
  };

  /* ---------- Copy ---------- */
  const copyText = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setMessage("Copied to clipboard");
  };

  /* ---------- Paste ---------- */
  const pasteText = async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
    setMessage("Text pasted");
  };

  /* ---------- Clear ---------- */
  const clearAll = () => {
    setInput("");
    setOutput("");
    setMessage("");
  };

  return (
    <div className={`container ${mode} ${darkMode ? "dark" : ""}`}>
      {/* ===== Header ===== */}
      <div className="header">
        <h1>🔐 Encryption & Decryption Tool</h1>
        <p>
          Securely encrypt or decrypt text using Base64 and Caesar Cipher.
          This tool works entirely on the client side.
        </p>

        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <span className={`mode-badge ${mode}`}>
          {mode === "encrypt" ? "Encryption Mode" : "Decryption Mode"}
        </span>
      </div>

      {/* ===== Tabs ===== */}
      <div className="tabs">
        <button
          className={mode === "encrypt" ? "active encrypt" : ""}
          onClick={() => {
            setMode("encrypt");
            clearAll();
          }}
        >
          Encryption
        </button>
        <button
          className={mode === "decrypt" ? "active decrypt" : ""}
          onClick={() => {
            setMode("decrypt");
            clearAll();
          }}
        >
          Decryption
        </button>
      </div>

      {/* ===== Panels ===== */}
      <div className="panels">
        {/* Input Panel */}
        <div className="panel">
          <h3>
            {mode === "encrypt"
              ? "Enter Plain Text"
              : "Enter Encrypted Text"}
          </h3>

          <textarea
            placeholder="Type or paste text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="info-row">
            <span>Characters: {input.length}</span>
          </div>

         

          <div className="action-row">
            <button onClick={handleBase64} disabled={!input}>
              {mode === "encrypt" ? "Encrypt" : "Decrypt"} (Base64)
            </button>
            <button onClick={handleCaesar} disabled={!input}>
              {mode === "encrypt" ? "Encrypt" : "Decrypt"} (Caesar)
            </button>
            <button onClick={pasteText}>Paste</button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="panel">
          <h3>Result</h3>

          <textarea
            value={output}
            readOnly
            placeholder="Result will appear here..."
          />

          <div className="action-row">
            <button
              className="copy-btn"
              onClick={copyText}
              disabled={!output}
            >
              Copy
            </button>
            <button onClick={clearAll}>Clear</button>
          </div>
        </div>
      </div>

      {/* ===== Status ===== */}
      {message && <div className="status">{message}</div>}
    </div>
  );
};

export default EncryptDecrypt;
