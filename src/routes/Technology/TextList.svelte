<script lang="ts" module>
	import TextEditor, { bindingTtext } from './TextEditor.svelte';
	let texts = $state([]);
	export let onSelect: any;
	let currentStep = $state(2); // Assuming the current step is managed globally
	let layerToggle = $state(false);

	function handleClick(text: any) {
		// onSelect(text);
		// if (currentStep === 2) {
		//     console.log('inside handleClick onselect');
		//     console.log('inside handleClick onselect - currentStep', currentStep);

		//   goToStepThree();
		// }
		console.log('in handler click ');
		bindingTtext(text);
	}

	const handleAIReportingStartLayer = () => {
		layerToggle = !layerToggle;
	};
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

	export function handleTextData(event: any) {
		// console.log('in handleTextData', event);

		texts = event;
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
		<!-- <div class="defaultText">
          <div class="placeholderObjecttext">Scanlytics AI Assistant</div>
      </div> -->

		<div
			class="ImageRecognitionArea">
			<!-- <div class="placeholderObjecttext">Scanlytics AI Assistant</div> -->
			{#if layerToggle}
				<div class="StartOverlay">
					<div class="conversationArea">
             	<div class="ImageArea">
              <div class="imgScanSection">
                 <div class="conversationHeader">head</div>

              </div>
              <div class="imgSectionListTab">

              </div>

            </div>
						<div class="questionArea">
              <div class="questionAreaHeader">head</div>
              <div class="AudioListBody">2</div>
              <div class="AudioOption">3</div>

            </div>
					
					</div>
				</div>
			{/if}
			<div class="headerSection" style="height: 10%; width:100%; background: orange ">0</div>
			<div class="listArea" style="background-color: aqua; width: 100%; height:75%">1</div>
			<div class="pdfArea">
				<div class="pdfContentSectionBtn">
					<button class="startBtn"  on:click={handleAIReportingStartLayer}
						>Start Reporting</button
					>
				</div>

				<!-- <div class="pdfContentSectionArr">
            <div class="mockPfd">0</div>
            <div class="mockPfd">2</div>
            <div class="mockPfd">1</div>
            <div class="mockPfd">0</div>
           

          </div> -->
			</div>
		</div>
	{/if}
</div>

<style>
	.text-list {
		overflow: hidden;
		min-height: 400px;
		/* background-color: pink; */
		height: 100%;
	}

	.ImageRecognitionArea {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
    /* background-color: blueviolet; */
	}

	.text-item {
		padding: 10px;
		margin: 5px 0;
		/* background: #f0f0f0; */
		cursor: pointer;
		/* background-color: blue; */
	}

	.pdfArea {
		height: 15%;
		/* background-color: orchid; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;    
    
    border-top: 2px solid rgba(111, 110, 110, 0.662);

	}

	.pdfContentSectionBtn {
		height: 90%;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: blue; */
	}

	.StartOverlay {
		height: 90vh;
		width: 100%;
		position: absolute;
		top: 0%;
		left: 0%;
		background-color: rgba(18, 17, 17, 0.686);
		z-index: 6;
	}
	.conversationArea {
		height: 99%;
		background-color: rgba(42, 176, 42, 0.126);
		width: 100%;
		display: flex;
		flex-direction: row;
	}
  .conversationHeader{
    background-color: rgba(137, 43, 226, 0.468);
    height: 7%;
    width: 100%; 
    border-bottom: 1px solid white;
    position: absolute;
    top: 0%;
    
  }



  .conversationMain{
    /* background-color: rgb(15, 160, 112); */
    height: 95%;
    width: 100%; 
    display: flex;
    flex-direction: row;
  }
	.ImageArea {
		height: 100%;
		width: 65%;
		/* background-color: blueviolet; */
	}
  .imgScanSection{
    background-color: antiquewhite;
    height: 85%;
    width: 100%;
    position: relative;

  }
  .imgSectionListTab{
    background-color: orange;
    height: 15%;
    width: 100%;
  }
	.questionArea {
		height: 100%;
		width: 35%;
		background-color: grey;
    flex-direction: column;
    /* position: relative; */
	}

  .questionAreaHeader{

    background-color: rgba(137, 43, 226, 0.168);
    height: 5.9%;
    width: 100%; 
    border-bottom: 1px solid white;
  }

  .AudioListBody{
    background-color: rgba(205, 226, 43, 0.995);
    height: 86.1%;
    width: 100%; 
  }

  .AudioOption{
    background-color: rgba(226, 43, 177, 0.995);
    height: 8%;
    width: 100%; 
  }

	.pdfContentSectionArr {
		height: 100%;
		width: 97%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* background-color: green; */
	}

	.mockPfd {
		height: 70%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: yellow;
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
