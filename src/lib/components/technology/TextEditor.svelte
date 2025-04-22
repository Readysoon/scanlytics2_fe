<script lang="ts" module>
  import Loadingbar from './loadingbar.svelte';
  import { Circle2 } from 'svelte-loading-spinners';
  

  let text = $state('');
  let currentStep= 3; 
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
    text = textevent
	}

</script>

<div class="text-editor">
  <textarea bind:value={text} on:focus={goToStepFour}></textarea>
  <div class="button-group">

    {#if circleLoadingBarState}
        <Circle2 size="40" colorOuter="blue" unit="px" durationInner="1s" />

      {:else}
      <!-- <div class="placeholderObjecttext">Text Editor</div> -->
    {/if}

  </div>
</div>

<style>
  .text-editor {
    padding: 10px;
    height: 100%;
  }

  textarea {
    width: 100%;
    height: 92.2%;
    min-height: 400px;
  }
  
  .button-group {
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



</style>
