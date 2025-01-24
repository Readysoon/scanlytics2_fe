<script>
  import ImageUploader from './ImageUploader.svelte';
  import TextList from './TextList.svelte';
  import TextEditor from './TextEditor.svelte';

  let texts = [];
  let selectedText = '';
  let isMobile = false;

  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth <= 600;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 600;
    });
  }
  

  function handleSelect(text) {
    selectedText += (selectedText ? '\n' : '') + text;
    texts = texts.filter(t => t !== text);
  }

  function handleUploadSuccess(parsedTexts) {
    texts = parsedTexts;
  }
</script>

{#if isMobile}
  <p>Scanlytics Mobile</p>
{:else}
  <p>Scanlytics Desktop</p>
{/if}

<div class="container">
  <div class="box">
    <ImageUploader onUploadSuccess={handleUploadSuccess} />
  </div>
  <div class="box">
    <TextEditor bind:text={selectedText} />
  </div>
  <div class="box">
    <TextList {texts} onSelect={handleSelect} />
  </div>
</div>

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
