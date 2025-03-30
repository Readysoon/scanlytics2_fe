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
	let updateSelectedPdf = $state(1)

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
	};

	const handlePdfClick = (e: any)  => {
		updateSelectedPdf = e
	}
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
		return text.replace(/\[dropdown:([^\]]+)\]/g, (match: any, options: any) => {
			return options.split(',')[0];
		});
	}

	export function handleTextData(event: any) {
		// console.log('in handleTextData', event);

		texts = event;
	}
</script>



<script>

	let isChecked: any = $state({});
	let isCheckInputData: any = $state({});


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
					console.log('labelItem', labelItem);

					const labelInfo = labelItem.label;

					const handlePatientInformation = (labelPatientInfo: any) => {
						if (labelPatientInfo == 'Patient Name') {
							console.log('side');
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
							isCheckInputData[labelStudyInfo] = "Knee"
						} else if (labelStudyInfo == 'Clinical Indication') {
							isCheckInputData[labelStudyInfo] = 'Male in treatment';
						}else if(labelStudyInfo == "Previous Procedures"){
							isCheckInputData[labelStudyInfo] = 'implants, or interventions';
						}
					};

					const handleExaminationInformation = (labelExamInfo: any) => {
						if (labelExamInfo == 'Examination Type') {
							isCheckInputData[labelExamInfo] = 'Röntgen Kniegelenk links';
						} else if (labelExamInfo == 'Patient Position') {
							isCheckInputData[labelExamInfo] = 'liegend';
						} else if (labelExamInfo == 'Projection') {
							isCheckInputData[labelExamInfo] = "seitlich"
						} else if (labelExamInfo == 'Previous Comparison') {
							isCheckInputData[labelExamInfo] = 'Keine Voruntersuchung vorliegend';
						}else if(labelExamInfo == "Previous Examination Date"){
							isCheckInputData[labelExamInfo] = "12.07.2024";
						}

					}
					handlePatientInformation(labelInfo);
					handleStudyInformation(labelInfo);

					handleExaminationInformation(labelInfo)
				});
			}
		});
	});
</script>

<div class="text-list">
	{#if texts.length > 0}
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
									<img src="knie.jpg" alt="widget" class="selectedItemlogo" />
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
		<div class="headerSection" style="height: 10%; width:100%; display: flex; justify-content: center; align-items: center; border-bottom: 1px solid rgb(175, 166, 166);">
				<div class="placeholderObjecttext">Select a Report</div>
		</div>
		<div class="listArea" style=" width: 100%; height:75%">
			<div class="pdfIconArea">
				<div class="pdfIconBox"  style="border: {  updateSelectedPdf == 1 ? "2px solid blue" : "0px solid blue"};" on:click={() => handlePdfClick(1)}>
						<img src="/pdfIcon.svg" alt="widget" class="pdfIcon1" />
						<p class="pdfTitle">knee</p>
				</div>
				<div class="pdfIconBox"  style="border: {  updateSelectedPdf == 2 ? "2px solid blue" : "0px solid blue"};" on:click={() => handlePdfClick(2)}>
						<img src="/pdfIcon.svg" alt="widget" class="pdfIcon1" />
						<p class="pdfTitle">knee.pt2</p>

				</div>
			</div>
		

		</div>
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
  