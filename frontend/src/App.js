import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const res = await axios.post("https://url-shortener-wdfp.onrender.com", { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter a long URL..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button onClick={handleShorten}>Shorten URL</button>
        {shortUrl && (
          <div className="result">
            <p>Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
            <button onClick={() => navigator.clipboard.writeText(shortUrl)}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}
