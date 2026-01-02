import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
<% if (modules.contact) { -%>
import Contact from './components/Contact';
<% } -%>
<% if (modules.admin) { -%>
import Dashboard from './components/Dashboard';
<% } -%>

function App() {
  return (
    <div className="app">
      <nav>
        <Link to="/">Home</Link>
<% if (modules.contact) { -%>
        <Link to="/contact">Contact</Link>
<% } -%>
<% if (modules.auth) { -%>
        <Link to="/login">Login</Link>
<% } -%>
<% if (modules.admin) { -%>
        <Link to="/dashboard">Dashboard</Link>
<% } -%>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
<% if (modules.contact) { -%>
          <Route path="/contact" element={<Contact />} />
<% } -%>
<% if (modules.admin) { -%>
          <Route path="/dashboard" element={<Dashboard />} />
<% } -%>
        </Routes>
      </main>
    </div>
  );
}

export default App;
