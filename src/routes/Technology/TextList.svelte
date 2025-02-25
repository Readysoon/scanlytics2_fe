

<script lang="ts" module>




  let texts = $state([]);
  export let onSelect;
  let currentStep = 2; // Assuming the current step is managed globally

  function handleClick(text: any) {
    onSelect(text);
    if (currentStep === 2) {
      goToStepThree();
    }
  }

  function goToStepThree() {
    document.getElementById('step-2').classList.remove('active');
    currentStep = 3;
    document.getElementById('step-3').classList.add('active');
  }

  // Left this here, for when a solution is found how to handle 
  // the dropdown menus in the TextEditor.svelte
  function parseText(text: any) {
    console.log('text on Textlist');
    return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
      return options.split(',')[0];
    });
  }

  export  function handleTextData(event: any){
    console.log('in handleTextData', event);
    texts = event
  }

  console.log('text length on TextList', texts);
  </script>
  
  <div class="text-list">
    {#if texts.length > 0}
      {#each texts as text (text)}
        <div class="text-item" on:click={() => handleClick(text)}>
          {parseText(text)}
        </div>
      {/each}
    
    {:else}
       <div class="defaulText">
        <div class="placeholderObjecttext">Scanlytics AI Assistant</div>
       </div>
    {/if}
  </div>
  
  <style>
    .text-list {
      overflow: hidden;
      /* max-height: 300px; */
      /* background-color: pink; */
      height: 100%;
    }
    .text-item {
      padding: 10px;
      margin: 5px 0;
      /* background: #f0f0f0; */
      cursor: pointer;
      /* background-color: blue; */
    }
    .defaulText{
      /* background-color: bisque; */
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
    display: flex;
    justify-content: center;
    /* background-color: pink; */
    height: 15%;
    width: 0%;
    text-align: center;
    margin-bottom: 10%;
	}
  </style>
  