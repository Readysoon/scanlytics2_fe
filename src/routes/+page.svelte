<script>
  import ImageUploader from './ImageUploader.svelte';
  import TextList from './TextList.svelte';
  import TextEditor from './TextEditor.svelte';
  import axios from 'axios';

  let texts = [];
  let selectedText = '';
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
        // Extract the text and replace dropdowns with first options
        texts = response.data.map(item => parseText(item.text));
        mlMessage = '';
      } else {
        mlMessage = 'No data found.';
        texts = [];
      }

    } catch (error) {
      console.error('Error uploading file to ML:', error);
      mlMessage = 'Error uploading file to ML';
      texts = [];
    }
  };

  // Function to parse text and replace dropdowns with first options
  function parseText(text) {
    return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
      return options.split(',')[0];
    });
  }

  function handleSelect(text) {
    selectedText += (selectedText ? '\n' : '') + text;
    texts = texts.filter(t => t !== text);
  }
</script>


<h2>Upload to ML</h2>

<!-- Conditional rendering: show message or text list -->
{#if mlMessage}
  <p>{mlMessage}</p>
{:else}
  <div class="container">
    <div class="box">
      <ImageUploader />
    </div>
    <div class="box">
      <TextEditor bind:text={selectedText} />
    </div>
    <div class="box">
      <TextList {texts} onSelect={handleSelect} />
    </div>
  </div>
{/if}

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
  .box {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
