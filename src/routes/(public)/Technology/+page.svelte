


<script lang="ts">
	import Header from '../../Header.svelte';
	import ImageUploader from '../../../lib/components/technology/ImageUploader.svelte';
	import Selectpage from '../../../lib/components/technology/selectpage.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../../static/knee.json';
	import AudioRecorder from '../../../lib/components/technology/audioRecorder.svelte';
	import MedicalForm from '$lib/components/technology/medicalForm/medicalForm.svelte';
	import Techstart from '$lib/components/technology/startComponent/techstart.svelte';
	import Navigation from '$lib/components/technology/navigation/navigation.svelte';
	import TextEditor from '$lib/components/technology/TextEditor.svelte';
	import Scene from '$lib/components/technology/threlte/scene.svelte';	
	import { Canvas } from '@threlte/core';

	// Declarations
	let firstLoad = $state(false);  //back to true - default 
	let menuToggle: boolean = $state(true);
	let ItemToggle: any = $state(null);
	let isChecked: any = $state({});
	let isCheckInputData: any = $state({});
	let findingsCheckBoxState: any = $state([])
	let imageUploadToggle = $state(true);
	let textEditToggle =  $state(false);
	let scansToggle = $state(false);
	let navAssistantToggle_Structured = $state(true);
	let navAssistantToggle_History = $state(false);
	let enterPageToggle = $state(true); //back to false - default 
	let inputValue = $state('');
	let isMobile = false;
	let disableAiStartBtn = $state(true)
	let stateobj = $state([])
	let selectedQuestionToggle = $state(false)
	let selectedToggle: any = $state([])
	let selectedRowToggle  = $state(false)
	let selectedArrVal = $state([])


	
	// ------------------------------------------------------------------------------

	// Binds the json text to the input value
	$effect(() => {
		kneejsonData.sections.map((i) => {
			if (
				i.name == 'Patient Information' ||
				i.name == 'Study Information' ||
				i.name == 'Examination'
			) {
				isChecked[i.name] = true;
				i.questions?.map((labelItem: any) => {
					// console.log('labelItem', labelItem);

					const labelInfo = labelItem.label;

					const handlePatientInformation = (labelPatientInfo: any) => {
						if (labelPatientInfo == 'Patient Name') {
							// console.log('side');
							isCheckInputData[labelPatientInfo] = 'Tom Müller';
						} else if (labelPatientInfo == 'Patient ID') {
							isCheckInputData[labelPatientInfo] = 'DKU2324342';
						} else if (labelPatientInfo == 'Date of Birth') {
							const formatDate = (date: any) => date.toISOString().split('T')[0];
							isCheckInputData[labelPatientInfo] = formatDate(new Date('2024-12-31'));
						} else if (labelPatientInfo == 'Gender') {
							isCheckInputData[labelPatientInfo] = 'Male';
						}
					};

					const handleStudyInformation = (labelStudyInfo: any) => {
						if (labelStudyInfo == 'Study Date') {
							isCheckInputData[labelStudyInfo] = '25.06.2024';
						} else if (labelStudyInfo == 'Study Time') {
							isCheckInputData[labelStudyInfo] = 'Today';
						} else if (labelStudyInfo == 'Referring Physician') {
							isCheckInputData[labelStudyInfo] = 'Knee';
						} else if (labelStudyInfo == 'Clinical Indication') {
							isCheckInputData[labelStudyInfo] = 'Male in treatment';
						} else if (labelStudyInfo == 'Previous Procedures') {
							isCheckInputData[labelStudyInfo] = 'implants, or interventions';
						}
					};

					const handleExaminationInformation = (labelExamInfo: any) => {
						if (labelExamInfo == 'Examination Type') {
							isCheckInputData[labelExamInfo] = 'Röntgen Kniegelenk links';
						} else if (labelExamInfo == 'Patient Position') {
							isCheckInputData[labelExamInfo] = 'liegend';
						} else if (labelExamInfo == 'Projection') {
							isCheckInputData[labelExamInfo] = 'seitlich';
						} else if (labelExamInfo == 'Previous Comparison') {
							isCheckInputData[labelExamInfo] = 'Keine Voruntersuchung vorliegend';
						} else if (labelExamInfo == 'Previous Examination Date') {
							isCheckInputData[labelExamInfo] = '12.07.2024';
						}
					};
					handlePatientInformation(labelInfo);
					handleStudyInformation(labelInfo);
					handleExaminationInformation(labelInfo);
				});
			}
		});


		if(stateobj.length > 0){
			selectedArrVal = stateobj
			
		}


		// setTimeout(() => {
		// 	firstLoad = false;
		// }, 3000);
	});
	// ------------------------------------------------------------------------------

	// Handle AI Asisstant page toggle and loading componenet
	const handleEnterPage = () => {
		enterPageToggle = true;

		setTimeout(() => {
			firstLoad = false;
		}, 3000);
	};
	// ------------------------------------------------------------------------------

	// Handle navigation toggle header
	const handleStructureToggle = () => {
		navAssistantToggle_Structured =  true 
		navAssistantToggle_History = false;
	};
	const handleHistoryToggle = () => {
		navAssistantToggle_History = true;
		navAssistantToggle_Structured =  false 

	};
	// ------------------------------------------------------------------------------

	// Handle menu toggle
	const handleMenuAIClick = () => {
		menuToggle = !menuToggle;
		imageUploadToggle = true
	    textEditToggle =   false
	};

	const handleMenuScansClick = () => {
		scansToggle = !scansToggle;
	};

	const handleMenuDownloadClick = () => {

		firstLoad = true;

		const intervalId = setTimeout(() => {
			firstLoad = false;
			clearInterval(intervalId)
		}, 1500);
		// Create a link element
		const link = document.createElement('a');

		// Set the download attribute and file path
		link.download = 'scanlytics-report.pdf';

		// Set the href to the PDF file path
		// If your PDF is in the static or public folder:
		link.href = 'scanlytics-report.pdf';

		// Append to the document
		document.body.appendChild(link);

		// Trigger the click event
		link.click();

		// Clean up - remove the link from the document
		document.body.removeChild(link);

		// Optional: Add analytics or tracking
		console.log('Report downloaded');
	};

	const handleTextEditorToggle = () => { 
		textEditToggle = true
		menuToggle = true;
		imageUploadToggle = false
	}
	// ------------------------------------------------------------------------------

	// Handle AI content toggle
	const handleSelectedEvent = (event: any) => {
		ItemToggle = ItemToggle == ItemToggle ? event : null;

		if( selectedToggle.length > 0){
			selectedRowToggle  = true


		}

	};

	const handleClosetogglebtn = () => {
		ItemToggle = null;
		disableAiStartBtn = true

		if( selectedToggle.length > 0){
			selectedRowToggle = !selectedRowToggle


		}

	};
	// ------------------------------------------------------------------------------

	// Handle Responsiveness toggle
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 1024;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth <= 1024;
		});
	}
	// ------------------------------------------------------------------------------


	const addCheckbtnToArr= (id: any) => {
		if(!findingsCheckBoxState.includes(id)){
			findingsCheckBoxState.push(id)
		}else{
			const newArr = findingsCheckBoxState.filter((prevId: any) => prevId != id)
			findingsCheckBoxState = newArr
		}

		if(findingsCheckBoxState.length >= 3){
			disableAiStartBtn = false
		}else {
			disableAiStartBtn = true

		}

	}
	

	const handleStartAI = (selectedReportObj:any) => {

		stateobj = selectedReportObj

		const updateArr = ItemToggle.questions
		const arr = []

		for(const x of stateobj){
			arr.push(updateArr[x])
		}
		selectedToggle = arr
		ItemToggle = null;
		selectedQuestionToggle = true 

	}


	const handleResetQuestion = () => {
		stateobj = []
		findingsCheckBoxState = []
		selectedToggle = []
		selectedRowToggle  = false
		selectedQuestionToggle = false
		disableAiStartBtn = true
	}


	
</script>


<script lang="ts" module>
	let recordState = $state(false)
	let aiBotText = $state("")
	let stateAnswer = $state([])
	let textState = $state([])
	let answerdInputData: any = $state({});



 export function handleRecordBtnUpdate(){
	recordState = !recordState
 }

//  Binding the input and updating the question background state 
 export function handleUpdateQuestionState(AnswerArr: any, StateArr: any){
	
		stateAnswer = StateArr
		textState = AnswerArr
		let trackArr:any = []
		let trackArrString: any = []
		if(stateAnswer.length > 0){
			for(const i in textState){
				stateAnswer.map((item: any) => { 
				

						if(!trackArr.includes(item) && !trackArrString.includes(textState[i])){
							answerdInputData[item] = textState[i]
							trackArr.push(item)
							trackArrString.push(textState[i])
						}
					
			})
		}
		}
}

 export function handleAITextData(aiText: any){
	console.log('triggert in handleAITextData',aiText);
	if (typeof aiText === 'string') {
		aiBotText = aiText.replace(/^"(.*)"$/, '$1');
  }
	// aiBotText = aiText
 }

</script>
<head>
	<title>Scanlytics</title>
</head>

<main>
	<Header />

	<div class="mainSection">
		<div class="StartOverlay">
			<!-- Navigation Area -->
			<Navigation
			on:structured={handleStructureToggle}
			on:history={handleHistoryToggle}
			/>


			<!-- Main Component -->
			{#if enterPageToggle}
				{#if navAssistantToggle_Structured}
					<div class="conversationArea">
						<!-- Select Image Area  -->
						{#if scansToggle}
							<Selectpage />
						{/if}
						<!-- Image Area  -->
						<div class="imgScanSection">
							{#if firstLoad}
								<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
							{:else}
								<div class="aiContentArea">
								
									{#if imageUploadToggle}
									<div class="imgConectSection" style="width: {menuToggle ? '70%' : '100%'};">
										<ImageUploader />
									</div>
									{/if}
									{#if textEditToggle}
									<div class="imgConectSection" style="
									width: {menuToggle ? '70%' : '100%'};
									display: {menuToggle ? 'flex' : 'flex'};
									align-items: {menuToggle ? 'center' : 'center'};
									justify-content:  {menuToggle ? 'center' : 'center'};
									">
										{#if menuToggle}
										<div class="TexteditorObj"
										style="width: {menuToggle ? '50%' : '50%'};"
										>
											<TextEditor/>
										</div>
										{:else}
											<TextEditor/>
										{/if}
									</div>
									{/if}

									{#if menuToggle}
										<div class="ImageReportSection">
											<div class="imageReportSectionHeader">
												<p class="assitantTitle">AI Reporting Assistant</p>
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
														<div class="aicontentSectionHeader-State" >
															<!-- <div class="aicontentSectionHeader-Lable">
																State: 

															</div> -->
															<div class="aicontentSectionHeader-Tracker">
																<!-- stateobj -->
													
															</div>
														</div>
														
														<div>
															<p class="questiontTitle">Questionnaire</p>
														</div>
													</div>
													<div class="aicontentSectionContent">
														{#if kneejsonData.sections.length > 0}
															{#each kneejsonData.sections as items (items)}
																{#if ItemToggle != null && ItemToggle.name == items.name}
																	<div class="selected-item-area">
																		<div class="selected-Item-header">
																			<div class="selected-Item-title">
																				<div>
																					<p>
																						{ItemToggle.name}
																					</p>
																				</div>


																				{#if selectedToggle.length > 0}
																				 <div class="stateObjItem-contentLayer">
																			   {#each stateobj as stateObjItem (stateObjItem)}

																			   {#if stateObjItem}
																	
																				<div class="stateObjItem-contentItem"
																				style="background-color: {stateAnswer.includes(stateObjItem)
																				? 'rgba(52, 255, 1, 0.837)'
																				: 'black'};"
																				></div>
																						   
																		
																						
																					

																				{/if}
																			   {/each}
																			    </div>

																				<div class="select-Text-Lable"
																				
																				>
																							<!-- selectedToggle = arr -->

																						<img
																						src="undo.png"
																						alt="widget"
																						class="resetbtn"
																					 	on:click={handleResetQuestion}
																					/>


																				</div>

																				{:else}
																																								
																				{#if items.name== 'Findings'}
																					<div class="select-Text-Lable">
																							<!-- selectedToggle = arr -->

																					 <p > {findingsCheckBoxState.length} | 10 </p>
																						</div>
																				{/if}
																				 {/if}
																	

																				
																				

																			</div>
																			<div
																				class="selected-Item-closeBtn"
																				on:click={handleClosetogglebtn}
																			>
																				x
																			</div>
																		</div>
																		<div class="select-Item-Content">
																			<!-- Selected Questions -->
																		{#if items.name == 'Findings' && selectedToggle.length > 0 }
																				{#each selectedToggle as selectObj (selectObj)}
																				<div class="selected-item-obj">
																					
																					{selectObj.label}

																					<input
																						type="text"
																						class="textoption"
																						value={answerdInputData[selectObj.id]}
																					/>
																				</div>

																				{/each}
																			{:else}
																		
																			<!-- default Questions -->
																			{#each ItemToggle.questions as itemObj (itemObj)}
																					
																					

								
																				<div class="selected-item-obj">
																					{#if items.name == 'Findings' }
																					<input
																					type="checkbox"
																					class="findingsCheckBox"
																					on:change={() => addCheckbtnToArr(itemObj.id)}


																				/>


																					{/if}
																					{itemObj.label}
																					<input
																						type="text"
																						class="textoption"
																						value={isCheckInputData[itemObj.label]}
																					/>
																				</div>
																			
																			{/each}

																			{/if}


																			
																		</div>
																	</div>
																{:else}
																	<div
																		class="text-item-name-area"
																		style="border-color: {items.name == 'Findings'
																			? 'rgb(43, 121, 194)'
																			: 'white'};"
																	>
																		<div
																			class="text-item-name"
																			on:click={() => handleSelectedEvent(items)}
																		>
																			{items.name}

																			{#if items.name == 'Findings'}

																			{#if stateobj}
																			<div class="stateObjItem-contentLayer">
																			   {#each stateobj as stateObjItem (stateObjItem)}

																			   {#if stateObjItem}
																	
																				<div class="stateObjItem-contentItem"
																				style="background-color: {stateAnswer.includes(stateObjItem)
																				? 'rgba(52, 255, 1, 0.837)'
																				: 'black'};"
																				></div>
																						   
																		
																						
																					

																				{/if}
																			   {/each}
																			</div>
		   
																			{/if}
																				<div>
																					<img
																						src="robo2.png"
																						alt="widget"
																						class="robologo"
																					/>
																				</div>
																			{/if}
																		</div>
																		<div class="text-item-checkBox">
																			<input
																				type="checkbox"
																				class="aicheckBox"
																				bind:checked={isChecked[items.name]}
																			/>
																		</div>
																	</div>
																{/if}
															{/each}
														{/if}
													</div>
												</div>
												<div class="aiContentStartSection" 
												
												>
													{#if selectedQuestionToggle}

															<div class="selectedQueston"
															style="display: { selectedRowToggle 
															? 'none'
															: 'flex'};" 
															
															>
																{#if aiBotText}
																<!-- <div class="canvasSection">
																	<Canvas>
																		<Scene/>
																	</Canvas>
																</div> -->
																
																			{aiBotText}
																{:else}
																<!-- <div class="canvasSection">
																	<Canvas>
																		<Scene/>
																	</Canvas>
																</div> -->
																<div class="selectedTextSection">
																	<p class="defaultStartTextAI">Press on the Assistant to start Reporting and say "Hallo Bruno"</p>
																</div>

																{/if}
															</div>
													{:else}
													<button class="startBtn"
													style="background-color: { disableAiStartBtn
													? 'rgba(38, 38, 38, 0.262)'
													: 'rgba(17, 100, 243, 0.912)'}; 

													"
													
													 on:click={ () => handleStartAI(findingsCheckBoxState)}
													 disabled={disableAiStartBtn}
													>
													{#if disableAiStartBtn}
													Please select your questions
													{:else}
													Start Reporting
													{/if}
													</button>
															

													{/if}
													
												</div>
											</div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
						<!-- Navbar Area -->
						<div class="aiNavBar">
							<div class="upperBar">
								<div class="optionBox" on:click={handleMenuAIClick}>

									{#if menuToggle}
									<img
										src="widget2.png"
										alt="widget"
										class="widgetlogo"
									/>
									<p class="selectedMenuText">Menu</p>

									{:else}
									<img
										src="widget.png"
										alt="widget"
										class="widgetlogo"
									/>
									<p class="defaultMenuText">Menu</p>

									{/if}
									
								</div>

								<div class="optionBox" on:click={handleMenuScansClick}>
									{#if scansToggle}

										<img src="/xr6.png" alt="widget" class="widgetlogo" />
										<p class="selectedMenuText">Scans</p>

									{:else}
									<img src="/xr5.png" alt="widget" class="widgetlogo" />
									<p class="defaultMenuText">Scans</p>

									{/if}

									
								</div>

								<div class="optionBox" on:click={handleMenuDownloadClick} >
									<img
										src="her1.png"
										alt="widget"
										class="widgetlogo"
									/>
									<p  class="defaultMenuText">Download</p>
								</div>

								<div class="optionBox" on:click={handleTextEditorToggle}>

									{#if textEditToggle}
									<img src="text1.png" alt="widget" class="widgetlogo" />
									<p class="selectedMenuText">Editor</p>
									{:else}
									 <img src="text.png" alt="widget" class="widgetlogo" />
									<p class="defaultMenuText">Editor</p>

									{/if}
									
								</div>
							</div>
							<div class="middleBar">
								<div class="freq1">
									<div class="audioPort">
										{#if recordState}
										 <img src="live.png" alt="widget" class="audioLogoON" /> 
										{:else}
										<img src="liveOff.png" alt="widget" class="audioLogoON" /> 
										{/if}												
									</div>
									<div class="uvMeter">1</div>
									<div class="assistantPlayArea">
										<AudioRecorder selectedArr={selectedArrVal} />
										<!-- <img src="robo2.png" alt="widget" class="robologo" on:click={handleMenuClick} /> -->
										<!-- <img src="play.png" alt="widget" class="widgetlogo" />
								  -->
										<p>Assistant</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Medical History Form Component -->
				{#if navAssistantToggle_History}
						<MedicalForm/>
				{/if}
			{:else}
			<!-- Default enter component  -->
					<Techstart on:enterPage={handleEnterPage}/>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow-y: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.mainSection {
		height: 88%;
		margin-top: 30px;
	}

	.StartOverlay {
		height: 100%;
		width: 100%;

		background-color: #0d1117;
		z-index: 6;
	}

	
	.conversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: row;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.TexteditorObj{
		/* width: 50%; */
		height: 100%;
		/* display: flex; */
		/* justify-content: center; */
		/* background-color: pink; */
	
	}




	
	




	.imgScanSection {
		background-color: #0d1117;
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	
	.aiContentArea {
		height: 93%;
		width: 100%;
		display: flex;
		flex-direction: row;
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
		font-family: sans-serif;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.metadataSection {
		height: 20%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.metadataContent {
		height: 95%;
		width: 96%;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-family: sans-serif;
	}

	.metadataBox {
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
	}

	.aicontentSection {
		height: 70%;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		/* background-color: #36070766; */
	}

	.aiContentStartSection{
		/* background: rgba(0, 128, 0, 0.075); */
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	
	}

	.selectedQueston{
		background: rgb(43, 121, 194);
		/* background: hsl(218, 15%, 14%); */

		width: 90%;
		height: 100%;
		border-radius: 7px;
		border: 1px solid rgb(43, 121, 194);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 21px;
		text-align: center;
		position: relative;
		flex-direction: column;
		margin-bottom: 5%;




		/* border: 1px solid grey; */



	}

	.canvasSection{
		width: 100%;
		height: 100%;
		/* display: flex;
		justify-content: center;
		align-items: center;
		background-color: #166ae8;
		border-radius: 7px;
		border: 1px solid rgba(255, 255, 255, 0.175); */
		position: absolute;
		top: -150%;
	}

	.selectedTextSection{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #0d1117;
		border-radius: 7px;
		border: 1px solid rgba(255, 255, 255, 0.175);
	}
	.defaultStartTextAI{
		font-size: 19px;

	}

	.startBtn{
		height: 40%;
		width: 50%;
		/* border: 1px solid rgb(43, 121, 194); */
		border: 1px solid grey;
		border-radius: 7px;
		/* background-color: rgba(58, 139, 210, 0.262); */
		background-color: rgba(17, 100, 243, 0.912);
	
		color: white;
		cursor: pointer;

	}

	.aicontentSectionHeader {
		height: 6%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-right: 2%;
		padding-left: 2%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		/* background-color: green; */
	}
	.aicontentSectionHeader-State{
		/* background-color: green; */
		width: 30%;
		display: flex;
		align-items: center;
	}
	.aicontentSectionHeader-Lable{
		color: rgba(255, 255, 255, 0.727);
		font-size: 17px;
		font-weight: 600;
		font-family: sans-serif;
	}

	.aicontentSectionHeader-Tracker{
		padding-left: 2%;
		width: 90%;
		height: 100%;
		align-items: center;


	}

	.stateObjItem-contentLayer{
		/* background-color: orange; */
		display: flex;
		width: 30%;
		height: 100%;
		justify-content: space-between;
		/* margin-bottom: 1%; */
		/* padding-left: 10%; */
		align-items: center;


	}
	.stateObjItem-contentItem{
		background-color: rgba(21, 4, 4, 0.204);
		width: 7%;
		height: 12px;
		/* font-size: 1px; */
		color: rgb(4, 4, 4);
		border: 2px solid rgba(248, 244, 238, 0.241);

		border-radius: 50%;
		/* display: none; */
		/* display: flex; */
		/* justify-content: space-between; */

		/* width: 100%; */

	}

	.stateObjItem-contentIn{
		background-color: rgba(129, 218, 106, 0.533);
		border-radius: 50%;

		width: 100%;
		height: 100%;
	}

	.answeredStateoBJ{
		background-color: rgba(52, 255, 1, 0.837);
		width: 7%;
		height: 12px;
		/* font-size: 1px; */
		color: rgb(4, 4, 4);
		border: 2px solid rgba(248, 244, 238, 0.241);

		border-radius: 50%;
		
	}
	.questiontTitle {
		color: rgba(255, 255, 255, 0.727);
		font-size: 17px;
		font-weight: 600;
		font-family: sans-serif;
	}

	.aicontentSectionContent {
		height: 94%;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 1rem;
		margin-top: 3%;
	}

	.text-item-name-area {
		border: 1px solid white;
		height: 6%;
		width: 100%;
		border-radius: 50px;
		display: flex;
		flex-direction: row;
		padding-left: 2%;
		cursor: pointer;
	}

	.text-item-name {
		width: 95%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: sans-serif;
	}

	.selected-item-area {
		background-color: rgba(45, 45, 46, 0.386);
		border: 1px solid white;
		height: 56%;
		width: 100%;
		border-radius: 7px;
	}

	.selected-Item-header {
		/* background-color: rgba(0, 128, 0, 0.405); */
		height: 15%;
		width: 100%;
		padding-left: 2%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.selected-Item-title {
		/* background-color: rgba(255, 166, 0, 0.367); */
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 19px;
		font-family: sans-serif;
		justify-content: space-between;
		padding-right: 2%;
		border-right: 1px solid white;
	}

	.select-Text-Lable{
		font-size: 16px;
		color: rgba(255, 255, 255, 0.715);
		margin-top: 0.5%;

	}

	.selected-Item-closeBtn {
		color: red;
		font-size: 22px;
		height: 100%;
		width: 10%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.select-Item-Content {
		height: 85%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		overflow: auto;
		overflow-y: auto;
		gap: 14%;
		/* background-color: green; */
		padding-top: 1%;
	}

	.selected-item-obj {
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

	.text-item-checkBox {
		width: 10%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.findingsCheckBox{
		background-color: #4CAF50; /* green background */
		background-size: cover;
		background-position: center;
		border-color: #4CAF50;

	}

	.aicheckBox {
		height: 15px;
		width: 50px;
		border-radius: 50%;
	}

	.aiNavBar {
		height: 100%;
		width: 3%;
		background-color: #0d1117;
		border: 1px solid rgba(255, 255, 255, 0.175);
		flex-direction: column;
	}

	.upperBar {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.optionBox {
		width: 80%;
		height: 14%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		font-family: sans-serif;
		gap: 8%;
		font-size: 11px;
		cursor: pointer;
	}

	.widgetlogo {
		height: 25px;
	}



	.defaultMenuText{
			color: white;
	}

	.selectedMenuText{
		color: rgba(254, 127, 0, 0.767);

	}
	.middleBar {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.freq1 {
		height: 98%;
		width: 80%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.audioPort{
		/* background-color: green; */
		height: 15%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;


	}

	.audioLogoON{
		height: 40%;
		width: 55%;
	}
	.uvMeter {
		height: 65%;
		width: 100%;
		border: 1px solid rgba(255, 255, 255, 0.175);
	}

	.assistantPlayArea {
		height: 20%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		align-items: center;
		color: white;
		font-family: sans-serif;

		gap: 8%;
		font-size: 10px;
	}

	.assitantTitle {
		font-size: 20px;
		font-weight: bold;
		font-family: sans-serif;
		color: #ffffff;
		text-align: center;
	}

	.robologo {
		width: 27px;
		height: 27px;
	}

	.resetbtn{
		width: 22px;
		height: 22px;
		cursor: pointer;
	}

	@media (max-width: 420px) {
		/* Force content to be scrollable */
		:global(body) {
			overflow-y: auto !important;
		}

		main {
			overflow: hidden;
		}

		.mainSection {
			height: auto !important;
			overflow: visible !important;
			margin-top: 15px;
		}

		.StartOverlay {
			flex-direction: column;
			min-height: 100svh;
			overflow: hidden;
		}
	

		.imgConectSection {
			width: 100%;
			min-height: 100svh;
		}

		.ImageReportSection {
			display: none;
			min-height: 100svh;
		}
		.conversationArea {
			flex-direction: column;
			height: 90dvh;
			width: auto;
		}

		.conversationArea {
			flex-direction: column !important;
			width: 100% !important;
		}

		.aiNavBar {
			width: 100% !important;
			height: auto !important;
			flex-direction: row !important;
			justify-content: space-between !important;
			border: none !important;
		}


		.upperBar {
			height: 70px !important;
			width: auto !important;
			flex-direction: row !important;
			justify-content: space-between !important;
		}
	}
</style>
