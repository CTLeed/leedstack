<script lang="ts">
  import { getToken } from '$lib/auth';

  let name = '';
  let email = '';
  let message = '';
  let submitted = false;

  async function handleSubmit() {
    const API_BASE = import.meta.env.PUBLIC_API_BASE || 'http://localhost:8080';
    const token = await getToken();

    const response = await fetch(`${API_BASE}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      submitted = true;
      name = '';
      email = '';
      message = '';
    }
  }
</script>

<h1>Contact Us</h1>

{#if submitted}
  <p style="color: green;">Thank you! Your message has been sent.</p>
{/if}

<form on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" bind:value={name} required />
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" bind:value={email} required />
  </div>

  <div>
    <label for="message">Message:</label>
    <textarea id="message" bind:value={message} rows="5" required></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>

<style>
  form {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input, textarea {
    width: 100%;
    padding: 0.5rem;
  }

  button {
    padding: 0.75rem;
    background: #333;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background: #555;
  }
</style>
