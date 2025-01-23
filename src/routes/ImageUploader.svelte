<script>
  import axios from 'axios';
  export let onUploadSuccess;

  let imageUrl = '';
  let mlMessage = '';
  let mlSelectedFile = null;

  function handleFileChange(event) {
    mlSelectedFile = event.target.files[0];
    if (mlSelectedFile) {
      imageUrl = URL.createObjectURL(mlSelectedFile);
    }
  }

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
        const parsedTexts = response.data.map(item => parseText(item.text));
        onUploadSuccess(parsedTexts);
        mlMessage = 'File uploaded successfully!';
      } else {
        mlMessage = 'No data found.';
      }

    } catch (error) {
      console.error('Error uploading file to ML:', error);
      mlMessage = 'Error uploading file to ML';
    }
  };

  function parseText(text) {
    return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
      return options.split(',')[0];
    });
  }
</script>

<div class="image-uploader">
  <input type="file" accept="image/*" on:change={handleFileChange} />
  {#if imageUrl}
    <img src={imageUrl} alt="Uploaded image" />
  {/if}
  <button on:click={uploadToML}>Upload to ML</button>
  {#if mlMessage}
    <p>{mlMessage}</p>
  {/if}
</div>

<style>
  .image-uploader {
    text-align: center;
  }
  img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
  button {
    margin-top: 10px;
  }
  p {
    margin-top: 10px;
    color: red;
  }
</style>
