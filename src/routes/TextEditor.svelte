<script>
  import AudioRecorder from './AudioRecorder.svelte';

  export let text = '';
  let currentStep = 3; // Assuming the current step is managed globally

  function goToStepFour() {
    if (currentStep === 3) {
      document.getElementById('step-3').classList.remove('active');
      currentStep = 4;
      document.getElementById('step-4').classList.add('active');
    }
  }
  </script>
  
  <div class="text-editor">
    <textarea bind:value={text} on:focus={goToStepFour}></textarea>
    <AudioRecorder />
  </div>
  
  <style>
    .text-editor {
      padding: 10px;
    }
    textarea {
      width: 100%;
      height: 300px;
    }
  </style>
  