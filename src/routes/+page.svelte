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


<div class="header">
  <div class="logo-container">
    <img src="/logo.png" alt="Logo" class="logo">
    <div class="title">Scanlytics</div>
  </div>
  <div class="menu-icon">
    &#9776; <!-- Unicode for the hamburger menu icon -->
  </div>
</div>

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
  .menu-icon {
    font-size: 2rem;
    cursor: pointer;
    margin-left: auto; /* Pushes the menu icon to the right */
    margin-right: 1%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%; /* Ensures the header spans the full width */
  }

  .logo-container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 50px; /* Adjust as needed */
    height: auto;
    margin-right: 10px; /* Space between logo and text */
    margin-left: 3%;
  }

  .title {
    font-size: 2.5rem; /* Equivalent to text-4xl */
    font-weight: 800; /* Equivalent to font-extrabold */
    letter-spacing: -0.025em; /* Equivalent to tracking-tight */
  }


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
