<script>
  import { onMount } from 'svelte';
  import { login } from '$lib/auth';

  onMount(() => {
    login();
  });
</script>

<div>
  <p>Redirecting to login...</p>
</div>
