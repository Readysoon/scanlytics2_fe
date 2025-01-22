<script>
    import axios from 'axios';
  
    let mlMessage = '';
    let mlSelectedFile = null;
    let parsedText = []; // Array to store parsed text parts
  
    const handleMLFileChange = (event) => {
      mlSelectedFile = event.target.files[0];
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
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Extract the text from the first element of the response
          const text = response.data[0].text;
          // Parse the text to identify dropdowns
          parsedText = parseText(text);
          mlMessage = ''; // Clear the message as we're using parsedText
        } else {
          mlMessage = 'No data found.';
          parsedText = [];
        }
  
      } catch (error) {
        console.error('Error uploading file to ML:', error);
        mlMessage = 'Error uploading file to ML';
        parsedText = [];
      }
    };
  
    // Function to parse text and identify dropdowns
    function parseText(text) {
      const dropdownRegex = /\[dropdown:([^\]]+)\]/g; // Regex to find dropdown patterns
      const parts = [];
      let lastIndex = 0;
      let match;
  
      while ((match = dropdownRegex.exec(text)) !== null) {
        parts.push(text.slice(lastIndex, match.index)); // Add text before the dropdown
        parts.push({
          type: 'dropdown',
          options: match[1].split(',') // Split options into an array
        });
        lastIndex = match.index + match[0].length; // Update the last index
      }
      parts.push(text.slice(lastIndex)); // Add remaining text after the last dropdown
  
      return parts; // Return the parsed parts
    }
  </script>
  
  <h1>Welcome to Scanlytics!</h1>
  
  <h2>Upload to ML</h2>
  <input type="file" accept="image/*" on:change={handleMLFileChange} />
  <button on:click={uploadToML}>Upload to ML</button>
  
  <!-- Conditional rendering: show message or parsed text -->
  {#if mlMessage}
    <p>{mlMessage}</p>
  {:else}
    <div>
      {#each parsedText as part}
        {#if typeof part === 'string'}
          {part} <!-- Render plain text -->
        {:else}
          <select>
            {#each part.options as option}
              <option>{option}</option> <!-- Render dropdown options -->
            {/each}
          </select>
        {/if}
      {/each}
    </div>
  {/if}
  