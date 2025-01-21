<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let message = '';
    let selectedFile = null;
    let mlMessage = '';
    let mlSelectedFile = null;
  
    const handleFileChange = (event) => {
      selectedFile = event.target.files[0];
    };
  
    const handleMLFileChange = (event) => {
      mlSelectedFile = event.target.files[0];
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
  
        console.log('Response data:', response.data);
  
        if (response.data && response.data.length > 0) {
          message = response.data[0].text || 'No text found';
        } else {
          message = 'No data found';
        }
  
      } catch (error) {
        console.error('Error uploading file:', error);
        message = 'Error uploading file';
      }
    };
  
    const uploadToML = async () => {
      if (!mlSelectedFile) {
        mlMessage = 'Please select a file first.';
        return;
      }
  
      const formData = new FormData();
      formData.append('file', mlSelectedFile);
  
      try {
        const response = await axios.post('https://scanlytics2-be.fly.dev/ml', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        console.log('ML Response data:', response.data);
  
        if (response.data) {
          mlMessage = JSON.stringify(response.data);
        } else {
          mlMessage = 'No data found';
        }
  
      } catch (error) {
        console.error('Error uploading file to ML:', error);
        mlMessage = 'Error uploading file to ML';
      }
    };
  </script>
  
  <h1>Welcome to SvelteKit!!</h1>
  
  <!-- Original Upload -->
  <h2>Upload to SurrealDB</h2>
  <input type="file" accept="image/*" on:change={handleFileChange} />
  <button on:click={uploadImage}>Upload Image</button>
  <p>{message ? message : 'Waiting for upload...'}</p>
  
  <!-- New Upload for ML Route -->
  <h2>Upload to ML</h2>
  <input type="file" accept="image/*" on:change={handleMLFileChange} />
  <button on:click={uploadToML}>Upload to ML</button>
  <p>{mlMessage ? mlMessage : 'Waiting for ML upload...'}</p>