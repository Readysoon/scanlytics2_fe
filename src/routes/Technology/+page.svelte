<script lang="ts">
	import Header from '../Header.svelte';
	import ImageUploader from './ImageUploader.svelte';
	import TextList from './TextList.svelte';
	// import Guide from './Guide.svelte';
	import Footer from '../Footer.svelte';
	import { onMount } from 'svelte';
	// import TextEditor from './TextEditor.svelte';
	import Selectpage from './selectpage.svelte';
	// import TextEditor, { bindingTtext } from './TextEditor.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../static/knee.json';
	import AudioRecorder from '../Tests/audioRecorder.svelte';

	let texts = $state([]);
	// export let onSelect: any;
	let currentStep = $state(2); // Assuming the current step is managed globally
	let layerToggle = $state(true);
	let firstLoad = $state(true);
	let menuToggle: boolean = $state(false);
	let ItemToggle: any = $state(null);
	let updateSelectedPdf = $state(1);
	let isChecked: any = $state({});
	let isCheckInputData: any = $state({});
	let scansToggle = $state(false);

	const requiredNames = ['Patient Information', 'Study Information', 'Examination'];

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
		// bindingTtext(text);
	}

	const handleMenuClick = () => {
		menuToggle = !menuToggle;
	};

	const handleScansClick = () => {
		scansToggle = !scansToggle;
	};

	const handleAIReportingStartLayer = () => {
		layerToggle = !layerToggle;
		setTimeout(() => {
			firstLoad = false;
		}, 3000);
	};

	const handlePdfClick = (e: any) => {
		updateSelectedPdf = e;
	};
	const handleSelectedEvent = (event: any) => {
		console.log('e', event);
		// alert("selected ")

		ItemToggle = ItemToggle == ItemToggle ? event : null;
		console.log('ItemToggle', ItemToggle);
	};

	const handleClosetogglebtn = () => {
		ItemToggle = null;
	};

	const handlecloselayer = () => {
		// layerToggle = !layerToggle;
		// firstLoad = !firstLoad;
	};

	function redirectUser() {
		window.location.href = 'https://calendly.com/tobias-wedel-code/30min';
	}

	// Independent state management
	let extractedTexts: string[] = []; // Texts extracted from uploads
	let editorContent = ''; // Content in the text editor
	let isMobile = false;
	let data = $props();

	console.log('data', data.product);
	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 1024;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth <= 1024;
		});
	}

	// Function to handle text selection from TextList
	function handleTextSelect(text: string) {
		// Instead of directly modifying the editor content, dispatch an event or use a callback
		// This allows the TextList to operate independently
		const index = extractedTexts.indexOf(text);
		if (index !== -1) {
			// Remove the selected text from the list
			extractedTexts = extractedTexts.filter((t) => t !== text);

			// Add it to the editor (now decoupled)
			appendToEditor(text);
		}
	}

	// Function to append text to the editor
	function appendToEditor(text: string) {
		editorContent += (editorContent ? '\n' : '') + text;
	}

	// Function to handle editor content changes
	function handleEditorChange(event: CustomEvent) {
		editorContent = event.detail.text;
	}

	// Function to handle successful uploads
	function handleUploadSuccess(parsedTexts: string[]) {
		extractedTexts = parsedTexts;
	}

	function downloadreport() {
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
	}

	function appendTranscription(transcription: any) {
		console.log('transcription', transcription);
		if (transcription) {
			text += (text ? '\n' : '') + transcription;
		} else {
			console.log('Hola im in appendTranscription function');
		}
	}
</script>

<head>
	<title>Scanlytics</title>
</head>

<main>
	<Header />

	<div class="mainSection">
		<div class="StartOverlay">
			<div class="conversationArea">
				{#if scansToggle}
					<div class="scansToggleArea">
						<Selectpage />
					</div>
				{/if}
				<div class="ImageArea">
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
								<div class="imgConectSection" 
								style="width: {menuToggle ? '70%': '100%'};"
								>
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
																					on:click={handleMenuClick}
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
				</div>
				<div class="aiNavBar">
					<div class="upperBar">
						<div class="optionBox">
							<img
								src="widget.png"
								alt="widget"
								class="widgetlogo"
								on:click={isMobile ? () => {} : handleMenuClick}
							/>
							<p>Menu</p>
						</div>
						<div class="optionBox" on:click={handleScansClick}>
							<!-- <AudioRecorder onTranscription={appendTranscription} /> -->

							<img src="/xr5.png" alt="widget" class="widgetlogo" />
							<p>Scans</p>
						</div>

						<div class="optionBox">
							<img src="her1.png" alt="widget" class="widgetlogo" on:click={downloadreport} />
							<p>Download</p>
						</div>

						<div class="optionBox" on:click={handlecloselayer}>
							<img src="text.png" alt="widget" class="widgetlogo" />
							<p>Editor</p>
						</div>
					</div>
					<div class="middleBar">
						<div class="freq1">
							<div class="uvMeter">1</div>
							<div class="assistantPlayArea">
								<AudioRecorder onTranscription={appendTranscription} />
								<!-- <img src="robo2.png" alt="widget" class="robologo" on:click={handleMenuClick} /> -->
								<!-- <img src="play.png" alt="widget" class="widgetlogo" />
								  -->
								<p>Assistant</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <Footer /> -->
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow-y: auto;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.boxArea {
		/* background-color: rgb(167, 47, 91); */
		width: 100%;
		display: flex;
		height: 88%;
		padding: 30px;
		margin-left: 0.6%;
	}

	.boxSelectArea {
		/* background-color: rgb(65, 47, 167); */
		width: 35%;
		height: 100%;
		display: flex;
		flex-direction: flex;
		justify-content: center;
		align-items: center;
		gap: 5%;
		/* background-color: rgb(211, 210, 209); */
	}
	.boxSelectAreaLayer {
		background-color: rgb(211, 210, 209);
		height: 100%;
		display: flex;
		width: 100%;
		height: 89%;
	}
	.boxSelectContentLayer {
		/* background-color: rgba(60, 60, 60, 0.753); */
		/* background-color: rgb(157, 157, 157); */
		height: 100%;
		width: 30%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-right: 1px solid rgb(175, 166, 166);
	}

	.imgPreviewArea {
		/* background-color: rgb(214, 12, 12); */
		padding-top: 15%;
		height: 90%;
		width: 100%;
		overflow: auto;
		display: flex;
		gap: 10%;
		flex-direction: column;
		align-items: center;
	}
	.imgPreviewAddArea {
		background-color: rgba(211, 210, 209, 0.64);
		height: 10%;
		width: 100%;
		border-top: 1px solid rgb(175, 166, 166);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.boxSelectContent {
		width: 80%;
		height: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		background-color: rgba(211, 210, 209, 0.64);
		border: 1px solid rgba(255, 255, 255, 0.066);
		position: relative;
	}

	.patientInfo {
		width: 97%;
		height: 10%;
		/* background-color: green; */
		position: absolute;
		bottom: 1%;
		font-family: system-ui;
		color: white;
		font-size: 7px;
		font-weight: bold;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		opacity: 0.7;
	}

	.patientInfoData {
		width: 97%;
		height: 30%;
		/* background-color: green; */
		position: absolute;
		top: 1%;
		font-family: system-ui;
		color: white;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: start;
		opacity: 0.8;
		font-size: 7px;
	}

	.patientB_Date {
		font-size: 7px;
	}

	.boxAreaMl {
		/* background-color: rgb(65, 167, 47); */
		width: 65%;
		display: flex;
		align-items: center;
		margin-left: 2%;
	}
	.box1 {
		flex: 1;
		width: 100%;
		height: 100%;
		background-color: rgb(211, 210, 209);
		/* background-color: red; */
		border: 1px solid #ccc;
	}

	.box {
		flex: 1;
		margin: 30px;
		width: 50%;
		height: 89%;
		background-color: rgb(211, 210, 209);
		border: 1px solid #ccc;
	}

	.explainArea {
		/* background-color: rgba(87, 167, 47, 0.421); */
		height: 25%;
	}

	.mainSection {
		/* background-color: #0d1117; */
		height: 88%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		/* background-color: rgb(255, 23, 193); */
		width: 100%;
		height: 100%;
		position: relative;
	}

	.StartOverlay {
		height: 100%;
		width: 100%;
		/* position: absolute;
		top: 0%;
		left: 0%; */
		background-color: #0d1117;
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

	.listArea {
		/* background-color: orange; */
		width: 100%;
		/* display: flex; */
	}

	.pdfIconArea {
		/* background-color: aqua; */
		width: 100%;
		height: 100%;
		display: flex;

		/* justify-content: center; */
		/* align-content: center; */
		align-items: center;
		flex-direction: column;
		gap: 5%;
		margin-top: 2%;
	}
	.aiContentArea {
		/* background-color: orange; */
		height: 93%;
		width: 100%;
		display: flex;
		flex-direction: row;
	}



	.ImageviewSection {
		background-color: #0d1117;
		/* background-color: orange; */
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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

	.selectedItemlogo {
		height: 95%;
		width: auto;

		/* background-size: cover; */
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

	.pdfIconBox {
		/* background-color: green; */
		height: 15%;
		width: 98%;
		display: flex;
		/* justify-content: center; */
		align-items: center;

		/* gap: 5%; */
	}
	.pdfIcon1 {
		height: 50px;
		width: 57px;
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

	.robologo {
		width: 27px;
		height: 27px;
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

		.boxArea {
			flex-direction: column;
			height: auto;
			padding: 15px;
			margin-left: 0;
		}

		.boxSelectArea {
			width: 100%;
			height: auto;
			margin-bottom: 20px;
		}

		.boxSelectAreaLayer {
			height: auto;
			min-height: 200px;
		}

		.boxAreaMl {
			width: 100%;
			flex-direction: column;
			margin-left: 0;
		}

		.box {
			width: 100%;
			margin: 10px 0;
			height: auto;
		}

		.explainArea {
			height: auto;
			margin-top: 20px;
		}

		.mainLeftContentSection {
			height: auto;
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
