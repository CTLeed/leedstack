<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { handleCallback } from '$lib/auth';

  onMount(async () => {
    const success = await handleCallback();
    if (success) {
      goto('/');
    } else {
      goto('/login');
    }
  });
</script>

<div>
  <p>Processing login...</p>
</div>
