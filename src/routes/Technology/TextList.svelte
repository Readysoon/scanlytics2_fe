<script lang="ts" module>
	import TextEditor, { bindingTtext } from './TextEditor.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../static/knee.json';

	let texts = $state([]);
	export let onSelect: any;
	let currentStep = $state(2); // Assuming the current step is managed globally
	let layerToggle = $state(false);
	let firstLoad = $state(true);
	let menuToggle = $state(true);
	let ItemToggle: any = $state(null);

	$: if (firstLoad) {
	}

	// onDestroy(() => {
	// 	console.log('hello');
	// });

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

	const handleMenuClick = () => {
		menuToggle = !menuToggle;
	};

	const handleAIReportingStartLayer = () => {
		layerToggle = !layerToggle;
		setTimeout(() => {
			firstLoad = false;
		}, 3000);
		// firstLoad = !firstLoad;
	};

	const handleSelectedEvent = (event: any) => {
		console.log('e', event);
		// alert("selected ")

		ItemToggle = ItemToggle == ItemToggle ? event : null
		console.log('ItemToggle', ItemToggle);
	}

	const handleClosetogglebtn = () => {
		ItemToggle = null
	}

	const handlecloselayer = () => {
		layerToggle = !layerToggle;
		firstLoad = !firstLoad;
	};

	// function goToStepThree() {
	// 	document.getElementById('step-2').classList.remove('active');
	// 	currentStep = 3;
	// 	document.getElementById('step-3').classList.add('active');
	// }

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

		<div class="ImageRecognitionArea">
			<!-- <div class="placeholderObjecttext">Scanlytics AI Assistant</div> -->
			{#if layerToggle}
				<div class="StartOverlay">
					<div class="conversationArea">
						<div class="ImageArea">
							<div class="imgScanSection">
								<!-- <div class="conversationHeader">head</div> -->
								{#if firstLoad}
									<!-- hello -->
									<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
								{:else}
									<div class="aiContentArea">
										<div class="ImageviewSection" style="width: {menuToggle ? ' 70% ' : '100%'};">
											<img src="knee3.jpeg" alt="widget" class="selectedItemlogo" />
										</div>
										{#if menuToggle}
											<div class="ImageReportSection">
												<div class="imageReportSectionHeader">
													<p class="assitantTitle"> AI Reporting Assistant</p>
												</div>
												<div class="assistantContentSection">
													<div class="metadataSection">
														<div class="metadataContent">
															<div class="metadataBox">
																Title: {kneejsonData.title}
															</div>
															<div class="metadataBox">
																Description: {kneejsonData.description}
															</div>
															<div class="metadataBox">
																Date: {kneejsonData.metadata.date}
															</div>
															<div class="metadataBox">
																Publisher: {kneejsonData.metadata.publisher}
															</div>
														</div>
													</div>
													<div class="aicontentSection">

														<div class="aicontentSectionHeader">
															<p class="questiontTitle">
																Questionnaire</p>

														</div>
														<div class="aicontentSectionContent">
															{#if kneejsonData.sections.length > 0}
														{#each kneejsonData.sections as items (items)}
															
																
																	

																	{#if ItemToggle != null&& ItemToggle.name == items.name }
																	<div class="selected-item-area">
																		<div class="selected-Item-header">
																			<div class="selected-Item-title">{ItemToggle.name}</div>
																			<div class="selected-Item-closeBtn" on:click={handleClosetogglebtn}>
																				x
																			</div>
																		</div>
																		<div class="select-Item-Content">
																		{#each ItemToggle.questions as itemObj (itemObj)}
																					
																		 			<div class="selected-item-obj">
																						{itemObj.label}

																						<input type="text" class="textoption">
																					</div>
																				
																		{/each}
																		
																	</div>

																	</div>
																	
																	{:else}
																	<div class="text-item-name-area">
																		<div class="text-item-name"  on:click={() => handleSelectedEvent(items)}>{items.name}

																			
																		</div>
																		<div class="text-item-checkBox">
																			<input type="checkbox" class="aicheckBox">
																		</div>

																	</div>
														

																	{/if}


																
														{/each}
													{/if}

														</div>

														

													</div>
												
												</div>
												<div></div>
											</div>
										{/if}
									</div>
								{/if}
							</div>
							<!-- <div class="imgSectionListTab">2</div> -->
						</div>
						<div class="aiNavBar">
							<div class="upperBar">
								<div class="optionBox">
									<img
										src="widget.png"
										alt="widget"
										class="widgetlogo"
										on:click={handleMenuClick}
									/>
								</div>
								<div class="optionBox">
									<img src="play.png" alt="widget" class="widgetlogo" />
								</div>

								<div class="optionBox">
									<img src="her1.png" alt="widget" class="widgetlogo" />
								</div>

								<div class="optionBox" on:click={handlecloselayer}>
									<img src="text.png" alt="widget" class="widgetlogo" />
								</div>
							</div>
							<div class="middleBar">
								<div class="freq1"></div>
							</div>
						</div>
						<!-- <div class="questionArea">
              <div class="AudioListBody">2</div>
              <div class="AudioOption">3</div>

            </div> -->
					</div>
				</div>
			{/if}
			<div class="headerSection" style="height: 10%; width:100%; background: orange ">0</div>
			<div class="listArea" style="background-color: aqua; width: 100%; height:75%">1</div>
			<div class="pdfArea">
				<div class="pdfContentSectionBtn">
					<button class="startBtn" on:click={handleAIReportingStartLayer}>Start Reporting</button>
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
		height: 100%;
		/* background-color: rgba(42, 176, 42, 0.126); */
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.conversationHeader {
		background-color: rgba(137, 43, 226, 0.468);
		height: 7%;
		width: 100%;
		border-bottom: 1px solid white;
		position: absolute;
		top: 0%;
	}

	.conversationMain {
		/* background-color: rgb(15, 160, 112); */
		height: 95%;
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.ImageArea {
		height: 100%;
		width: 97%;
		/* background-color: blueviolet; */
	}
	.imgScanSection {
		background-color: #0d1117;
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		/* border-radius: 7px; */
	}

	.aiContentArea {
		background-color: orange;
		height: 93%;
		width: 100%;
		display: flex;
		flex-direction: row;
	}
	.ImageviewSection {
		background-color: #0d1117;
		height: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.ImageReportSection {
		background-color: #0d1117;
		height: 100%;
		width: 30%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.imageReportSectionHeader {
		/* background-color: rgba(137, 43, 226, 0.168); */
		height: 5.9%;
		width: 100%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.assistantContentSection {
		height: 94%;
		width: 100%;
		/* background-color: rgb(77, 77, 14); */
		font-family: sans-serif;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

	}


	.metadataSection{
		height: 20%;
		width: 100%;
		/* background-color: rgb(255, 7, 106); */
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* padding: 1rem; */

	}

	.metadataContent{
		height: 95%;
		width: 96%;
		/* background-color: rgb(151, 20, 160); */
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/* gap: 5px; */
		font-family: sans-serif;
		/* align-items: center; */

		/* padding: 1rem; */
	}

	.metadataBox{
		/* background-color: aqua; */
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
	}

	.aicontentSection{
		height: 80%;
		width: 100%;
		/* background-color: rgb(255, 152, 7); */
		/* padding: 1rem; */
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);


		
	}

	.aicontentSectionHeader{
		height: 6%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-right: 3%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);

		
	}

	.questiontTitle{
		color: rgba(255, 255, 255, 0.727);
		font-size: 20px;
		font-weight: 600;
		font-family: sans-serif;
		

	}

	.aicontentSectionContent{
		height: 94%;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32px;
		/* border-top: 1px solid rgba(255, 255, 255, 0.175); */
		/* background-color: rgb(7, 98, 255); */
		padding: 1rem;
		margin-top: 3%;
	}

	.text-item-name-area{
		/* background-color: rgb(18, 147, 6); */
		border: 1px solid white;
		height: 6%;
		width: 100%;
		border-radius: 50px;
		display: flex;
		flex-direction: row;
		/* align-items: center; */
		/* justify-content: space-between; */
		padding-left: 2%;
		cursor: pointer;
	}

	.text-item-name{
		/* background-color: pink; */
	
		width: 95%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: sans-serif;
	}

	.text-item-checkBox{
		/* background-color: rgb(234, 13, 50); */
		height: 6%;
		width: 20%;
	}

	.selected-item-area{
		background-color: rgba(45, 45, 46, 0.386);
		border: 1px solid white;
		height: 56%;
		width: 100%;
		border-radius: 7px;
		/* display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 5%;
		cursor: pointer; */

	}

	.selected-Item-header{
		height: 15%;
		width: 100%;
		padding-left: 2%;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* background-color: #255bad; */
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.selected-Item-title{
		/* background-color: orange; */
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 19px;
		font-family: sans-serif;

	}


	.selected-Item-closeBtn{
		color: red; 
		font-size: 22px;
		/* background-color: pink; */
		height: 100%;
		width: 10%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	
	.select-Item-Content{
		height: 85%;
		width: 100%;
		/* padding-left: 2%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* background-color: #2f7cf0; */
		overflow:auto;
		gap: 20px;
		
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.selected-item-obj{
		height: 15%;
		width: 100%;
		display: flex;
		padding-left: 5%; 
		flex-direction: row;
		justify-content: space-between;
		background-color: #51515952;
		border-top: 1px solid rgba(255, 255, 255, 0.175);

		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		align-items: center;
		padding-right: 5%;


	}




	.text-item-checkBox{
		/* background-color: rgb(7, 102, 255); */
		width: 10%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}


	.aicheckBox{
		height: 15px;
		width: 50px;
		border-radius: 50%;

	}
	.imgSectionListTab {
		background-color: #0d1117;
		height: 15%;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}
	/* .questionArea {
		height: 100%;
		width: 35%;
		background-color: grey;
    flex-direction: column;
	} */

	.aiNavBar {
		height: 100%;
		width: 3%;
		background-color: #0d1117;
		border: 1px solid rgba(255, 255, 255, 0.175);
		flex-direction: column;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.upperBar {
		height: 50%;
		width: 100%;
		/* background-color: green; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.optionBox {
		width: 80%;
		height: 15%;
		/* background-color: #7d2a2a; */
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.selectedItemlogo {
		height: 95%;
		width: 76%;
		/* background-size: cover; */
	}

	.widgetlogo {
		height: 25px;
	}
	.middleBar {
		height: 50%;
		width: 100%;
		/* background-color: rgb(223, 155, 18); */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.freq1 {
		height: 98%;
		width: 100%;
		/* background-color: rgb(18, 223, 49); */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.questionAreaHeader {
		background-color: rgba(137, 43, 226, 0.168);
		height: 5.9%;
		width: 100%;
		border-bottom: 1px solid white;
	}

	.AudioListBody {
		background-color: rgba(205, 226, 43, 0.995);
		height: 86.1%;
		width: 100%;
	}

	.AudioOption {
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

	.assitantTitle {
		font-size: 20px;
		font-weight: bold;
		font-family: sans-serif;
		color: #ffffff;
		text-align: center;
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
