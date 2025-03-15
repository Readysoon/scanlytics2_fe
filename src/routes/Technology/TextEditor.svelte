<script lang="ts" module>
  import AudioRecorder from './AudioRecorder.svelte';
  import Loadingbar from './loadingbar.svelte';
  import { Circle2 } from 'svelte-loading-spinners';
	import TextList from './TextList.svelte';
  

  let text = $state('');
  let currentStep= 3; // Assuming the current step is managed globally
  let imgState = $state(false)
  let circleLoadingBarState = $state(false)

  function goToStepFour() {
    if (currentStep === 3) {
      document.getElementById('step-3').classList.remove('active');
      currentStep = 4;
      document.getElementById('step-4').classList.add('active');
    }
  }

  function appendTranscription(transcription: any) {
    console.log('transcription', transcription);
    if(transcription){
      text += (text ? '\n' : '') + transcription;

    }else{
        console.log('Hola im in appendTranscription function');
    }
  }


  export function handleCirleBarCall(state: boolean)  {
    circleLoadingBarState = state
  }

  export function bindingTtext(textevent: string){
		// alert("bing")
		console.log('here is the text', text);
    text = textevent
	}

</script>

<div class="text-editor">
  <textarea bind:value={text} on:focus={goToStepFour}></textarea>
  <div class="button-group">
    <AudioRecorder onTranscription={appendTranscription} />

    {#if circleLoadingBarState}
        <!-- <Loadingbar/> -->
        <Circle2 size="40" colorOuter="blue" unit="px" durationInner="1s" />

      {:else}
      <div class="placeholderObjecttext">Text Editor</div>

    {/if}

    <button >
      <img src="downloads.png" alt="Download" />
    </button>
  </div>
</div>

<style>
  .text-editor {
    padding: 10px;
    /* background-color: red; */
    height: 100%;
  }

  textarea {
    width: 100%;
    min-height: 400px;
  }
  
  .button-group {
    /* background-color: orange; */
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .placeholderObjecttext {
		font-size: 25px;
		font-weight: bold;
		font-family: sans-serif;
		color: rgba(0, 0, 0, 0.403);
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
