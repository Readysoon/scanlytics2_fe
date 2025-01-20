<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let message = '';
    let selectedFile = null;
  
    const handleFileChange = (event) => {
      selectedFile = event.target.files[0];
    };
  
    const uploadImage = async () => {
      if (!selectedFile) {
        message = 'Please select a file first.';
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await axios.post('https://scanlytics2-be.fly.dev/surrealdb', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Response data:', response.data); // Log the response data
        message = response.data.message || 'Upload successful';
      } catch (error) {
        console.error('Error uploading file:', error);
        message = 'Error uploading file';
      }
    };
  </script>
  
  <h1>Welcome to SvelteKit!!</h1>
  <input type="file" accept="image/*" on:change={handleFileChange} />
  <button on:click={uploadImage}>Upload Image</button>
  <p>{message ? message : 'Waiting for upload...'}</p>