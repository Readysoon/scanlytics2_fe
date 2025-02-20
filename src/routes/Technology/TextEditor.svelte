<script>
  import AudioRecorder from './AudioRecorder.svelte';

  export let text = '';
  let currentStep= 3; // Assuming the current step is managed globally

  function goToStepFour() {
    if (currentStep === 3) {
      document.getElementById('step-3').classList.remove('active');
      currentStep = 4;
      document.getElementById('step-4').classList.add('active');
    }
  }

  function appendTranscription(transcription) {
    text += (text ? '\n' : '') + transcription;
  }
</script>

<div class="text-editor">
  <textarea bind:value={text} on:focus={goToStepFour}></textarea>
  <div class="button-group">
    <AudioRecorder onTranscription={appendTranscription} />
    <button >
      <img src="downloads.png" alt="Download" />
    </button>
  </div>
</div>

<style>
  .text-editor {
    padding: 10px;
  }
  textarea {
    width: 100%;
    height: 300px;
  }
  .button-group {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  button img {
    width: 24px;
    height: 24px;
  }

  button {
    margin: 10px 0;
    padding: 2px 2px;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
