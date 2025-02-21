<script>
    export let isMobile = false;
  </script>
  
  <div class={`guide-steps ${isMobile ? 'mobile' : 'desktop'}`}>
    <div class="step active" id="step-1">
      <span class="circle">1</span>
      <div class="text">
        <span class="headline">Select Image</span>
        <p>Select an image to upload. JPG, JPEG, GIF, PNG are possible.</p>
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
        <p>Complete and review your report in the middle window. You can use our Audio transcription to do so (not supported by every browser/mobile version).</p>
      </div>
    </div>
  </div>
  
  <style>
    .guide-steps {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin-top: 20px;
      padding: 20px 0;
    }
  
    .guide-steps.mobile {
      flex-direction: column;
      align-items: center;
    }
  
    .step {
      display: flex;
      align-items: flex-start;
      padding: 10px;
      transition: background-color 0.3s ease;
      width: 200px;
      margin: 0 10px;
    }
  
    .guide-steps.mobile .step {
      margin: 10px 0;
      width: 90%; /* Full width for mobile view */
    }
  
    .circle {
      width: 30px;
      height: 30px;
      min-width: 30px;
      min-height: 30px;
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
      color: white;
      font-family: system-ui;

      font-size: 13px;
    }
  
    .headline {
      font-weight: bold;
      margin-bottom: 5px;
    }
  
    .step.active .circle {
      background-color: #2196F3;
    }
  </style>
  