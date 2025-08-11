import React, { useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCopied(false);
    try {
      const res = await axios.post("http://localhost:5000/shorten", { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "400px",
        textAlign: "center"
      }}>
        <h1 style={{ marginBottom: "20px", color: "#333" }}>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter long URL..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "15px"
            }}
            required
          />
          <button type="submit" style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px"
          }}>
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div style={{ marginTop: "20px" }}>
            <p style={{ color: "#555" }}>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{
              color: "#4CAF50",
              fontWeight: "bold",
              textDecoration: "none"
            }}>
              {shortUrl}
            </a>
            <br />
            <button
              onClick={copyToClipboard}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
