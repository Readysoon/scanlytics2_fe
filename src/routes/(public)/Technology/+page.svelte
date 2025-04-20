<script module>
	let loadBotToggle = $state(false)

export function loadtoggleCall(){
	console.log('hit on load page');
	console.log('loadBotToggle', loadBotToggle);
	loadBotToggle = !loadBotToggle
}
</script>

<script lang="ts">
	import Header from '../../Header.svelte';
	import ImageUploader from '../../../lib/components/technology/ImageUploader.svelte';
	import Selectpage from '../../../lib/components/technology/selectpage.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../../static/knee.json';
	// import AudioRecorder from '../../components/technology/audioRecorder.svelte'
	import AudioRecorder from '../../../lib/components/technology/audioRecorder.svelte';
	import Wavesurfer from '$lib/components/technology/wavesurfer.svelte';
	// import { updateAILogo_bot } from '$lib/components/technology/wavesurfer.svelte';
	
	let firstLoad = $state(true);
	let menuToggle: boolean = $state(true);
	let ItemToggle: any = $state(null);
	let isChecked: any = $state({});
	let isCheckInputData: any = $state({});
	let scansToggle = $state(false);
	let navAssistantToggle_Structured = $state(true);
	let navAssistantToggle_History = $state(false);
	let enterPageToggle = $state(true);
	let inputValue = $state('');
	let resultAreaToggle = $state(false);
	let isMobile = false;
	// import { uploadbot } from '$lib/components/technology/wavesurfer.svelte';
	// let data = $props();
	// let {uploadbot} = $props();

	// console.log('uploadbot', uploadbot);
	// Handle patient info default binding toggle


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
		setTimeout(() => {
			firstLoad = false;
		}, 3000);
	});
	// ------------------------------------------------------------------------------

	// Handle navigation toggle header
	const handleNavCall = (nav: string) => {
		navAssistantToggle_Structured = nav == 'structured' ? true : false;
		navAssistantToggle_History = nav == 'history' ? true : false;
	};
	// ------------------------------------------------------------------------------

	// Handle menu toggle
	const handleMenuAIClick = () => {
		menuToggle = !menuToggle;
	};

	const handleMenuScansClick = () => {
		scansToggle = !scansToggle;
	};

	const handleMenuDownloadClick = () => {
		// Create a link element
		const link = document.createElement('a');

		// Set the download attribute and file path
		link.download = 'structured_report.pdf';

		// Set the href to the PDF file path
		// If your PDF is in the static or public folder:
		link.href = 'hidden_structured_report.pdf';

		// Append to the document
		document.body.appendChild(link);

		// Trigger the click event
		link.click();

		// Clean up - remove the link from the document
		document.body.removeChild(link);

		// Optional: Add analytics or tracking
		console.log('Report downloaded');
	};
	// ------------------------------------------------------------------------------

	// Handle AI content toggle
	const handleSelectedEvent = (event: any) => {
		ItemToggle = ItemToggle == ItemToggle ? event : null;
	};

	const handleClosetogglebtn = () => {
		ItemToggle = null;
	};
	// ------------------------------------------------------------------------------

	// Handle Responsiveness toggle
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 1024;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth <= 1024;
		});
	}
</script>

<head>
	<title>Scanlytics</title>
</head>

<main>
	<Header />

	<div class="mainSection">
		<div class="StartOverlay">
			<div class="conversationNav">
				<div class="conversationNavContent">
					<div
						class="StucturedReport"
						style="background-color: {navAssistantToggle_Structured ? '#ea7900b1' : '#0d1117'}"
						on:click={() => handleNavCall('structured')}
					>
						Structured Report
					</div>
					<div
						class="MedicalReport"
						style="background-color: {navAssistantToggle_History ? '#ea7900b1' : '#0d1117'}"
						on:click={() => handleNavCall('history')}
					>
						Medical History Report
					</div>
				</div>

				<div class="conversationBotLayer">
					<div class="botNav">
						{#if loadBotToggle}
							<Circle2 size="25" colorOuter="orange" unit="px" durationInner="3s" />

						 {:else}
						 	<img src="/robo.png" alt="Microphone" class="roboIcon" />
							



						{/if}
					 
						<!-- <img src="/robo.png" alt="Microphone" class="roboIcon" /> -->

					</div>
					<div class="blockContentSection">
						<div class="botContent">
							<Wavesurfer/>
						</div>
					</div>


				</div>
			</div>

			{#if enterPageToggle}
				{#if navAssistantToggle_Structured}
					<div class="conversationArea">
						<!-- Select Image Area  -->
						{#if scansToggle}
							<div class="scansToggleArea">
								<Selectpage />
							</div>
						{/if}
						<!-- Image Area  -->
						<div class="imgScanSection">
							<!-- <div class="conversationHeader">head</div> -->
							{#if firstLoad}
								<!-- hello -->
								<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
							{:else}
								<div class="aiContentArea">
									<!-- <div class="ImageviewSection" style="width: {menuToggle ? ' 70% ' : '100%'};">
									<img src="knie.jpg" alt="widget" class="selectedItemlogo" />
								</div> -->
									<div class="imgConectSection" style="width: {menuToggle ? '70%' : '100%'};">
										<ImageUploader />
									</div>
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
																			<div class="selected-Item-title">{ItemToggle.name}</div>
																			<div
																				class="selected-Item-closeBtn"
																				on:click={handleClosetogglebtn}
																			>
																				x
																			</div>
																		</div>
																		<div class="select-Item-Content">
																			{#each ItemToggle.questions as itemObj (itemObj)}
																				<div class="selected-item-obj">
																					{itemObj.label}

																					<input
																						type="text"
																						class="textoption"
																						value={isCheckInputData[itemObj.label]}
																					/>
																				</div>
																			{/each}
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
																				<div>
																					<img
																						src="robo2.png"
																						alt="widget"
																						class="robologo"
																						on:click={handleMenuAIClick}
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
											</div>
											<div></div>
										</div>
									{/if}
								</div>
							{/if}
						</div>
						<!-- <div class="imgSectionListTab">2</div> -->
						<!-- Navbar Area -->
						<div class="aiNavBar">
							<div class="upperBar">
								<div class="optionBox">
									<img
										src="widget.png"
										alt="widget"
										class="widgetlogo"
										on:click={isMobile ? () => {} : handleMenuAIClick}
									/>
									<p>Menu</p>
								</div>
								<div class="optionBox" on:click={handleMenuScansClick}>
									<!-- <AudioRecorder onTranscription={appendTranscription} /> -->

									<img src="/xr5.png" alt="widget" class="widgetlogo" />
									<p>Scans</p>
								</div>

								<div class="optionBox">
									<img
										src="her1.png"
										alt="widget"
										class="widgetlogo"
										on:click={handleMenuDownloadClick}
									/>
									<p>Download</p>
								</div>

								<div class="optionBox">
									<img src="text.png" alt="widget" class="widgetlogo" />
									<p>Editor</p>
								</div>
							</div>
							<div class="middleBar">
								<div class="freq1">
									<div class="uvMeter">1</div>
									<div class="assistantPlayArea">
										<AudioRecorder />
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

				{#if navAssistantToggle_History}
					<div class="medicalConversationArea">
						<div class="imgScanSection">
							<div class="medicalAIImageContent">
								<div class="medicalAIImageArea" style="width: {resultAreaToggle ? '50%' : '100%'};">
									<div class="medicalImageSection">
										<img
											src="amnese.jpg"
											alt="widget"
											class="amnesebogen"
											style="width: {resultAreaToggle ? '60%' : '30%'};"
											on:click={handleMenuAIClick}
										/>
									</div>
									<div class="medicalImagebtnAreaSection"><button>Start Conversation</button></div>
								</div>

								{#if resultAreaToggle}
									<div class="medicalResultArea">result</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			{:else}
				<div class="emailSectionArea">
					<div class="imgScanSection">
						<div class="emailRequestSection">
							<div class="placeholderObjecttext">
								<p>Scanlytics AI Assistant</p>
							</div>
							<div class="subTextEmailRequestArea">
								<p>Please enter the code: 777</p>
							</div>

							<div>
								<input type="text" bind:value={inputValue} class="emailInputContent" />
							</div>
							<div>
								<button>Submit</button>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow-y: auto;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.mainSection {
		/* background-color: #0d1117; */
		height: 88%;
		margin-top: 30px;
	}

	.StartOverlay {
		height: 100%;
		width: 100%;

		background-color: #0d1117;
		z-index: 6;
	}

	.conversationNav {
		/* background-color: #126df4; */
		height: 4%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		justify-content: space-between;
	}

	.conversationNavContent {
		/* background-color: green; */
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 3%;
	}

	.conversationBotLayer {
		/* background-color: green; */
		width: 18%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* gap: 3%; */
		/* border-left: 1px solid rgba(255, 255, 255, 0.175); */
		/* border-right: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.botNav{
		/* background-color: orange; */
		height: 100%;
		width: 15%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.blockContentSection {
		/* background-color: pink; */
		height: 100%;
		width: 85%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		/* border-right: 1px solid rgba(255, 255, 255, 0.175); */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-right: 3%;
	}

	.roboIcon{
		height: 70%;
		width:  50%;
		opacity: 0.9;
		cursor: pointer;
	}
	.botContent {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); 
		background: linear-gradient(to top left, rgba(0, 0, 0, 0.7),rgba(37, 37, 37, 0.4), rgba(0, 0, 0, 0.4)),
			linear-gradient(rgba(255, 255, 255, 0.175) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.175) 1px, transparent 1px);
		background-size:
			cover,
			30px 10px,
			10px 10px;
			/* background-color: pink; */
			
		/* background-blend-mode: overlay; */
		/* box-shadow: 0 0 20px rgba(255, 255, 255, 0.1), 0 0 40px rgba(255, 255, 255, 0.05); */
		width: 97%;
		height: 70%;
		border-radius: 50px;
		display: flex;
		/* margin-right: 5%; */
		/* flex-direction: row; */
		/* align-items: center; */
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.175);
	}
	
	

	.StucturedReport {
		width: 40%;
		height: 100%;
		/* background-color: blue; */
		/* background-color: #ea7900b1; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		color: white;
		font-family: system-ui;
		cursor: pointer;
	}
	.MedicalReport {
		width: 40%;
		height: 100%;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		color: white;
		font-family: system-ui;
		cursor: pointer;
	}

	.conversationArea {
		height: 96%;
		/* background-color: rgba(37, 241, 37, 0.126); */
		width: 100%;
		display: flex;
		flex-direction: row;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalConversationArea {
		height: 96%;
		/* background-color: rgba(37, 241, 37, 0.126); */
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.emailSectionArea {
		height: 96%;
		/* background-color: rgba(37, 241, 37, 0.126); */
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 6%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.emailRequestSection {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
	}
	.placeholderObjecttext {
		font-size: 105px;
		font-weight: bold;
		font-family: sans-serif;

		color: rgba(220, 215, 215, 0.403);
	}

	.subTextEmailRequestArea {
		font-size: 35px;
		font-weight: bold;
		font-family: sans-serif;

		color: rgba(249, 249, 249, 0.845);
	}

	.emailInputContent {
		width: 500px;
		height: 40px;
		border-radius: 50px;
		background-color: #72717121;
		border: 1px solid white;
		color: white;
		/* padding-left: 4%; */
		text-align: center;
	}
	.medicalAIImageContent {
		height: 100%;
		width: 100%;
		/* background-color: orange; */
		display: flex;
	}

	.medicalAIImageArea {
		height: 100%;
		/* width: 50%; */
		/* background-color: rgb(20, 211, 224); */
		border-right: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalImageSection {
		height: 94%;
		width: 100%;
		/* background-color: rgb(93, 90, 93); */
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.amnesebogen {
		width: 60%;
		height: 90%;
	}
	.medicalImagebtnAreaSection {
		height: 6%;
		width: 100%;
		/* background-color: rgb(136, 224, 20); */
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalResultArea {
		height: 100%;
		width: 50%;
		/* background-color: rgb(224, 20, 149); */
	}

	.imgScanSection {
		background-color: #0d1117;

		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		/* border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
		/* border-radius: 7px; */
	}

	.aiContentArea {
		/* background-color: orange; */
		height: 93%;
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.ImageReportSection {
		background-color: #0d1117;
		/* background-color: orange; */
		height: 100%;
		width: 30%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.scansToggleArea {
		background-color: #0d1117;
		/* background-color: orange; */
		height: 100%;
		width: 12%;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
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

	.metadataSection {
		height: 20%;
		width: 100%;
		/* background-color: rgb(255, 7, 106); */
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* padding: 1rem; */
	}

	.metadataContent {
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

	.metadataBox {
		/* background-color: aqua; */
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
	}

	.aicontentSection {
		height: 80%;
		width: 100%;
		/* background-color: rgb(255, 152, 7); */
		/* padding: 1rem; */
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.aicontentSectionHeader {
		height: 6%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-right: 3%;

		/* background-color: pink; */
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.questiontTitle {
		color: rgba(255, 255, 255, 0.727);
		font-size: 20px;
		font-weight: 600;
		font-family: sans-serif;
	}

	.aicontentSectionContent {
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

	.text-item-name-area {
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

	.text-item-name {
		/* background-color: pink; */

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
		/* display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 5%;
		cursor: pointer; */
	}

	.selected-Item-header {
		height: 15%;
		width: 100%;
		padding-left: 2%;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* background-color: #b8babe; */
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.selected-Item-title {
		/* background-color: orange; */
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 19px;
		font-family: sans-serif;
	}

	.selected-Item-closeBtn {
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

	.select-Item-Content {
		height: 85%;
		width: 100%;
		/* padding-left: 2%; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* background-color: #2f7cf0; */
		overflow: auto;
		gap: 20px;

		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
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
		/* background-color: rgb(7, 102, 255); */
		width: 10%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
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
		height: 14%;
		/* background-color: #7d2a2a; */
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
		/* background-color: #f7f1f1; */
		/* cursor: pointer; */
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
		width: 80%;
		/* background-color: rgb(18, 223, 49); */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}
	.uvMeter {
		/* background-color: rgb(69, 71, 69); */
		height: 80%;
		width: 100%;
		border: 1px solid rgba(255, 255, 255, 0.175);
	}

	.assistantPlayArea {
		/* background-color: rgb(69, 48, 223); */
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

	@media (max-width: 1024px) {
		/* Force content to be scrollable */
		:global(body) {
			overflow-y: auto !important;
		}

		main {
			height: auto !important;
			overflow-y: auto !important;
		}

		.mainSection {
			height: auto !important;
			overflow: visible !important;
			margin-top: 15px;
		}

		.StartOverlay {
			/* background-color: pink; */
			flex-direction: column;
			height: auto;
			/* padding: 15px; */
			/* margin-left: 0; */
		}
		.conversationNav {
			display: none;
		}

		.imgConectSection {
			/* background-color: pink; */
			width: 100%;
		}

		.ImageReportSection {
			display: none;
		}
		.conversationArea {
			flex-direction: column;
			height: 90dvh;
			width: auto;
			/* padding: 15px; */
			/* margin-left: 0; */
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
