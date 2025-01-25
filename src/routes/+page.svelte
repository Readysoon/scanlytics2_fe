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
      <p class="welcome-description">Automatic Xray interpretation</p>
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

  <footer>
    <div class="footer-content">
      <div class="footer-left">
        <p>© 2025 Scanlytics | Version 0.1</p>
        <nav>
          <a href="/">Privacy Policy</a> | 
          <a href="/">Terms of Use</a> | 
          <a href="/">Contact</a> | 
          <a href="/">Products</a>
        </nav>
      </div>
      <div class="footer-center">
        <p>For clinical usage, appropriate clinical qualification is required, <br> and users must ensure they have the necessary credentials and permissions <br>to access and interpret medical images.</p>
      </div>
      <div class="footer-right">
        <select>
          <option>English</option>
          <option>German</option>
          <option>French</option>
        </select>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Apply box-sizing to all elements */
  * {
    box-sizing: border-box;
  }

  /* Remove default margin and padding from HTML and body */
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden; /* Prevent horizontal scrolling */
  }

  .page-container {
    display: flex;
    flex-direction: column;
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

  .container.desktop {
    display: flex;
    justify-content: space-between;
    flex-grow: 1; /* Ensure it grows to fill available space */
  }

  .container.mobile {
    display: flex;
    flex-direction: column; /* Stack components vertically on mobile */
    flex-grow: 1; /* Ensure it grows to fill available space */
  }

  .box {
    flex: 1;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
  }

  footer {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-top: 1px solid #ccc;
    background-color: #f9f9f9;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Ensures vertical centering */
    width: 100%;
  }

  .footer-left, .footer-center, .footer-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-left,
  .footer-right {
    flex: 1; /* Allows these sections to take up equal space */
  }

  .footer-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start; /* Aligns content to the top */
  }

  .footer-center {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centers content vertically */
    align-items: center; /* Centers content horizontally */
    text-align: center;
  }

  .footer-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center; /* Centers content vertically */
  }


  nav a {
    margin: 0 5px;
    text-decoration: none;
    color: #333;
  }

  nav a:hover {
    text-decoration: underline;
  }

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
