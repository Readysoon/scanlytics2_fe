<script>
  export let texts = [];
  export let onSelect;
  let currentStep = 2; // Assuming the current step is managed globally

  function handleClick(text) {
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
  function parseText(text) {
    return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
      return options.split(',')[0];
    });
  }
  </script>
  
  <div class="text-list">
    {#each texts as text (text)}
      <div class="text-item" on:click={() => handleClick(text)}>
        {parseText(text)}
      </div>
    {/each}
  </div>
  
  <style>
    .text-list {
      overflow: hidden;
      max-height: 300px;
    }
    .text-item {
      padding: 10px;
      margin: 5px 0;
      background: #f0f0f0;
      cursor: pointer;
    }
  </style>
  