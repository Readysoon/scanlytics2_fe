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
      <p class="welcome-description">Scanlytics ordnet dein Röntgenbild einer unser bisherigen 8 Kategorien zu und schlägt dir<br> die dafür kuratierten Befundtexte vor, welche du dann anpassen und weiterverwenden kannst.<br>Im Gegensatz zu den meisten anderen Xray-Interpretationslösungen setzt Scanlytics<br> nicht auf fremde KI oder gar ausländische Server. <br>Wenn du mehr über Scanlytics und die Menschen dahinter erfahren willst, klicke hier.<br>Du hast Fragen oder Anregungen? Sende mir eine Mail:<br><a href="mailto:p.gallaschik@gmail.com">philipp.gallaschik@code.berlin</a></p>
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

  <div class="guide-steps">
    <div class="step active" id="step-1">
      <span class="circle">1</span>
      <div class="text">
        <span class="headline">Select Image</span>
        <p>Select an image to upload. JPG, JPEG, GIF, PNG (DICOM soon) are possible.</p>
      </div>
    </div>
    <div class="step" id="step-2">
      <span class="circle">2</span>
      <div class="text">
        <span class="headline">Validation and Upload</span>
        <p>Upon clicking "Upload" Scanlytics anonymizes it and sends it to one of our servers. Learn more about our GDPR compliance.</p>
      </div>
    </div>
    <div class="step" id="step-3">
      <span class="circle">3</span>
      <div class="text">
        <span class="headline">Selection of Report Text</span>
        <p>Select appearing report texts from the right window.</p>
      </div>
    </div>
    <div class="step" id="step-4">
      <span class="circle">4</span>
      <div class="text">
        <span class="headline">Complete Report</span>
        <p>Complete and review your report in the middle window.</p>
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

  .guide-steps {
    display: flex;
    justify-content: center; /* Center the steps */
    align-items: flex-start;
    margin-top: 20px;
    padding: 20px 0;
  }

  .step {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    transition: background-color 0.3s ease;
    width: 200px; /* Fixed width for each step */
    margin: 0 10px; /* Space between steps */
  }

  .circle {
    width: 30px;
    height: 30px;
    min-width: 30px; /* Prevent compression */
    min-height: 30px; /* Prevent compression */
    border-radius: 50%;
    background-color: #4CAF50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .text {
    display: flex;
    flex-direction: column;
  }

  .headline {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .step.active .circle {
    background-color: #2196F3;
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
