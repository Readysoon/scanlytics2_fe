<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let message = '';
  
    onMount(async () => {
      try {
        const response = await axios.get('https://scanlytics2-be.fly.dev/surrealdb');
        // Extract the text from the nested JSON structure
        const result = response.data[0]?.result[0]?.text;
        
        // Assign the extracted text to the message variable
        message = result || 'No message found';

      } catch (error) {
        console.error('Error fetching data:', error);
        message = 'Error fetching data';
      }
    });
  </script>
  
  <h1>Welcome to SvelteKit!!</h1>
  <p>{message ? message : 'Loading...'}</p>