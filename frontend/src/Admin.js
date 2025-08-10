import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/urls')
      .then(res => setUrls(res.data));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Panel</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Long URL</th>
            <th>Short URL</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url._id}>
              <td>{url.longUrl}</td>
              <td>
                <a href={`http://localhost:5000/${url.shortCode}`} target="_blank" rel="noreferrer">
                  {`http://localhost:5000/${url.shortCode}`}
                </a>
              </td>
              <td>{url.visitCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
