export default function Home() {
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
    </div>
  );
}
