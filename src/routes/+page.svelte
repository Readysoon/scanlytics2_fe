<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let message = '';
  
    onMount(async () => {
      try {
        const response = await axios.get('https://scanlytics2-be.fly.dev/surrealdb');
        console.log('Response data:', response.data); // Log the response data

        // Extract the text from the nested JSON structure
        message = response.data[0].text || 'No message found';

      } catch (error) {
        console.error('Error fetching data:', error);
        message = 'Error fetching data';
      }
    });
  </script>
  
  <h1>Welcome to SvelteKit!!</h1>
  <p>{message ? message : 'Loading...'}</p>