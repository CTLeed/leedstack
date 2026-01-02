<template>
  <div style="margin-top: 2rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
    <h3>API Connection Test</h3>
    <p v-if="loading">Testing backend connection...</p>
    <p v-if="error" style="color: red;">❌ Error: {{ error }}</p>
    <p v-if="apiMessage" style="color: green;">✅ {{ apiMessage }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { apiFetch } from '@/lib/api';

export default {
  name: 'ApiTest',
  setup() {
    const apiMessage = ref('');
    const loading = ref(true);
    const error = ref('');

    onMounted(async () => {
      try {
        const data = await apiFetch('/api/example');
        apiMessage.value = data.message;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      apiMessage,
      loading,
      error
    };
  }
};
</script>
