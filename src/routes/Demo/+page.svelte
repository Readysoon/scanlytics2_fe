
<script>
  import ImageUploader from './ImageUploader.svelte';
  import TextList from './TextList.svelte';
  import TextEditor from './TextEditor.svelte';
  import Guide from './Guide.svelte';
  import Footer from './Footer.svelte';
  import { onMount } from 'svelte';

  let texts = [];
  let selectedText = '';
  let isMobile = false;

  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth <= 600;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 600;
    });
  }

 

  onMount(async () => {
    try {
      const response = await fetch('https://scanlytics2-ml.fly.dev/', {
        method: 'GET'
      });
      console.log('Pinging ml server... ');
      if (response.ok) {
        console.log('Ml server started successfully');
      } else {
        console.error('Failed to start server', response.status);
      }
    } catch (error) {
      console.error('Error starting server', error);
    }
  });

 

  onMount(async () => {
    try {
      console.log('Pinging whisper server... ');
      const response = await fetch('https://scanlytics2-whisper.fly.dev/', {
        method: 'GET'
      });
      if (response.ok) {
        console.log('Whisper server started successfully');
      } else {
        console.error('Failed to start server', response.status);
      }
    } catch (error) {
      console.error('Error starting server', error);
    }
  });

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

<div class="page-container">
  <div class="header">
    <div class="logo-container">
      <img src="/logo.png" alt="Logo" class="logo">
      <div class="title">Scanlytics</div>
    </div>
    <div class="menu-icon">
      &#9776; <!-- Unicode for the hamburger menu icon -->
    </div>
  </div>

  <div class="content">
    <div class="welcome-section">
      <h2 class="welcome-title">Welcome to Scanlytics</h2>
      <p class="welcome-description">Scanlytics assigns your X-ray image to one of our existing 8 categories and suggests<br> curated diagnosis texts that you can then customize and use further. Unlike most other <br>X-ray interpretation solutions, Scanlytics does not rely on third-party AI or even foreign servers. <br>If you want to learn more about Scanlytics and the people behind it, click here. <br>Do you have questions or suggestions? Send me an email:<br><a href="mailto:p.gallaschik@gmail.com">philipp.gallaschik@code.berlin</a></p>
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
  </div>

  <Guide {isMobile} />

  <Footer {isMobile} />
</div>

<style>

  /* Apply box-sizing to all elements */
  * {
    box-sizing: border-box;
  }
    

  .page-container {
    display: flex;
    flex-direction: column;
    background-color: rgb(186, 200, 213);
    
    min-height: 100vh; /* Full height of the viewport */
  }

  .content {
    flex: 1; /* Allow content to grow and fill space */
    display: flex;
    flex-direction: column;
  }

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
    border-bottom: 1px solid #000000; /* Adds a bottom border */
    padding-bottom: 10px; /* Optional: Adds some space below the content in the header */
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

  .welcome-section {
    text-align: center;
    margin: 40px 0; /* Adds space above and below the welcome section */
  }

  .welcome-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .welcome-description {
    font-size: 1rem;
    color: #666; /* A lighter color for the description */
  }

  .container.mobile {
    display: flex;
    flex-direction: column; /* Stack components vertically on mobile */
    flex-grow: 1; /* Ensure it grows to fill available space */
  }

  .container.desktop {
    display: flex;
    justify-content: center; /* Centers the boxes within the container */
    gap: 20px; /* Adds space between the boxes */
  }

  .container.desktop .box {
    flex: none; /* Disable flex-grow to allow fixed width */
    width: 30%; /* Set each box to take up 30% of the container width */
    max-width: 300px; /* Set a maximum width for each box */
  }

  .container.mobile .box {
    width: 100%; /* Full width for mobile view */
    max-width: none; /* Remove any max-width restrictions for mobile */
  }

  .box {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }
</style>
