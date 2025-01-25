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

<head>
  <title>Scanlytics</title>
</head>


<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl">
  Scanlytics
</h1>

<div class={`container ${isMobile ? 'mobile' : 'desktop'}`}>
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
  .container.desktop {
    display: flex;
    justify-content: space-between;
  }

  .container.mobile {
    display: flex;
    flex-direction: column; /* Stack components vertically on mobile */
  }
  .box {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
