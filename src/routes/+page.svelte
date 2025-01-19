<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let message = '';
  
    onMount(async () => {
      try {
        const response = await axios.get('https://scanlytics2-be.fly.dev/');
        message = response.data.Hello;
      } catch (error) {
        console.error('Error fetching data:', error);
        message = 'Error fetching data';
      }
    });
  </script>
  
  <h1>Welcome to SvelteKit</h1>
  <p>{message ? message : 'Loading...'}</p>