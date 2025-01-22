<script>
    import axios from 'axios';

    let mlMessage = '';
    let mlSelectedFile = null;
  
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
          // Access the first element and its 'text' property
          mlMessage = response.data[0].text;
        } else {
          mlMessage = 'No data found';
        }
  
      } catch (error) {
        console.error('Error uploading file to ML:', error);
        mlMessage = 'Error uploading file to ML';
      }
    };

  </script>
  
  <h1>Welcome to Scanlytics!</h1>
  
  <!-- New Upload for ML Route -->
  <h2>Upload to ML</h2>
  <input type="file" accept="image/*" on:change={handleMLFileChange} />
  <button on:click={uploadToML}>Upload to ML</button>
  <p>{mlMessage ? mlMessage : 'Waiting for ML upload...'}</p>