import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';

function Home() {
  const [apiMessage, setApiMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Test API connection
    apiFetch('/api/example')
      .then(data => {
        if (isMounted) {
          setApiMessage(data.message);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1>Welcome to <%= AppName %></h1>
      <p>This is a full-stack application built with:</p>
      <ul>
        <li>Frontend: <%= frontend %></li>
        <li>Backend: <%= backend %></li>
        <li>Database: <%= db %></li>
<% if (modules.auth) { -%>
        <li>Auth: <%= auth %></li>
<% } -%>
<% if (modules.payments) { -%>
        <li>Payments: <%= payments %></li>
<% } -%>
      </ul>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3>API Connection Test</h3>
        {loading && <p>Testing backend connection...</p>}
        {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}
        {apiMessage && <p style={{ color: 'green' }}>✅ {apiMessage}</p>}
      </div>
    </div>
  );
}

export default Home;
