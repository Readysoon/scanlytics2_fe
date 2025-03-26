<script lang="ts" module>
  import TextEditor, {bindingTtext} from "./TextEditor.svelte";
  let texts = $state([]);
  export let onSelect: any;
  let currentStep = $state(2); // Assuming the current step is managed globally
  

  function handleClick(text: any) {
    // onSelect(text);
    // if (currentStep === 2) {
    //     console.log('inside handleClick onselect');
    //     console.log('inside handleClick onselect - currentStep', currentStep);

    //   goToStepThree();
    // }
    console.log('in handler click ');
    bindingTtext(text)
  }

  function goToStepThree() {
    document.getElementById('step-2').classList.remove('active');
    currentStep = 3;
    document.getElementById('step-3').classList.add('active');
  }

  // Left this here, for when a solution is found how to handle 
  // the dropdown menus in the TextEditor.svelte
  function parseText(text: any) {
    console.log('text on Textlist: ', text);
    return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
      return options.split(',')[0];
    });
  }

  export  function handleTextData(event: any){
    // console.log('in handleTextData', event);

    texts = event
  }

  </script>
  
  <div class="text-list">
    {#if texts.length > 0}
      {#each texts as text (text)}
        <div class="text-item" on:click={() => handleClick(text)}>
          {parseText(text)}
        </div>
      {/each}
    
    {:else}
      <div class="defaultText">
          <div class="placeholderObjecttext">Scanlytics AI Assistant</div>
      </div>
    {/if}
  </div>
  
  <style>
    .text-list {
      overflow: hidden;
      min-height: 400px;
      /*background-color: pink;*/
      height: 100%;
    }
    .text-item {
      padding: 10px;
      margin: 5px 0;
      /* background: #f0f0f0; */
      cursor: pointer;
      /* background-color: blue; */
    }

    .defaultText {
      /* Fixed the class name from defaulText to defaultText */
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  
    .placeholderObjecttext {
      font-size: 29px;
      font-weight: bold;
      font-family: sans-serif;
      color: rgba(0, 0, 0, 0.403);
      text-align: center;
      /* Removed width: 0% which was preventing horizontal centering */
      /* Removed height: 15% to allow the text to be naturally sized */
      /* Removed margin-bottom: 10% as it was shifting the text down */
      /* Removed display: flex and justify-content: center as they're redundant with the parent's centering */
    }
  </style>
  