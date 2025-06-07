


<script lang="ts">
	import Header from '../../Header.svelte';
	import ImageUploader from '../../../lib/components/technology/ImageUploader.svelte';
	import Selectpage from '../../../lib/components/technology/selectpage.svelte';
	import { Circle2 } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../../static/knee.json';
	import * as scanQuestion from '../../../../static/scanQuestion.json';
	import AudioRecorder from '../../../lib/components/technology/audioRecorder.svelte';
	import MedicalForm from '$lib/components/technology/medicalForm/medicalForm.svelte';
	import Techstart from '$lib/components/technology/startComponent/techstart.svelte';
	import Navigation from '$lib/components/technology/navigation/navigation.svelte';
	import TextEditor from '$lib/components/technology/TextEditor.svelte';
	import Scene from '$lib/components/technology/threlte/scene.svelte';	
	import Patients from '$lib/components/technology/patients/patients.svelte';
	import { Canvas } from '@threlte/core';
	import { ScaleOut } from 'svelte-loading-spinners';
	import SelectedQuestions from '$lib/components/technology/selectedQuestions/selectedQuestions.svelte';
	import { searchNav } from '$lib/components/technology/navigation/navigation.svelte';
	import { closeNav } from '$lib/components/technology/navigation/navigation.svelte';
	import AiSidebar from '$lib/components/technology/mainBoard/aiSidebar.svelte';	

	import { handleSelectUpdateBackground } from '$lib/components/technology/selectedQuestions/selectedQuestions.svelte';
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
	let navAssistantToggle_Structured = $state(false);
	let navAssistantToggle_History = $state(false); //back to false - default 
	let navAssistantToggle_Patient = $state(true); //back to true - default 
	let enterPageToggle = $state(false); //back to false - default 
	let inputValue = $state('');
	let isMobile = false;
	let disableAiStartBtn = $state(true)
	let stateobj: number[] = $state([])
	let selectedQuestionToggle = $state(false)
	let selectedToggle: any = $state([])
	let selectedRowToggle  = $state(false)
	let selectedArrVal = $state([])
	let showNav = $state(false) //back to false - default 
	let resetState = $state(false)
	let MenuOptionToggle = $state(false)
	let OptionStateDes =  $state(true)
	let OptionStateVal = $state("Patient Information")
	let studyPatientStateVal =  $state("Study Information")
	let ExamStateVal =  $state("Examination")

	let optionExamToggle =  $state(false) 
	let optionStudyInfoToggle =  $state(false) 
	let OptPatientStateToggle =  $state(false)



	
	// ------------------------------------------------------------------------------

	
	const handleUpdateselectedObj = (selectedQuestionNum: any) => {
		
		// selectedToggle = selectedQuestionNum
		
		
		stateobj = selectedQuestionNum
		console.log('stateobj handleUpdateselectedObj' , stateobj);
		// stateobj = [0, 1, 2]

		// const updateArr = ItemToggle.questions
		// console.log('updateArr',updateArr);
		const updateArr = scanQuestion.sections[0]

		console.log('updateArr in scanquestion', updateArr);
		const arr = []

		for(const x of stateobj){
			arr.push(updateArr?.questions[x])
		}
		selectedToggle = arr

		console.log('selectedToggle on handleUpdateselectedObj');
		ItemToggle = scanQuestion.sections[0]
		

	}

	const handleResetMultipleStates = () => {
		ItemToggle = null
		selectedToggle = []
	}

	const handleUpdateOption = (eventoption: string) => { 

		console.log('eventoption', eventoption);
		 
		if(eventoption == "DescriptionHeader"){
			OptionStateDes = !OptionStateDes
		}else if(eventoption == "Examination"){
			console.log('e');
			ExamStateVal == "Examination" ? "" : "Examination"
			optionExamToggle = !optionExamToggle


		}else if(eventoption == "StudyInformation"){
			studyPatientStateVal == "Study Information" ? "" : "Study Information"
			optionStudyInfoToggle = !optionStudyInfoToggle
		}else if(eventoption == "patient"){

			OptionStateVal == "Patient Information" ? "" : "Patient Information"
			OptPatientStateToggle = !OptPatientStateToggle
		}

	}
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


		

		if( selectedQuestionNum && selectedQuestionNum.length > 0){
			console.log('selectedQuestionNum length is greater than 0', selectedQuestionNum);
			console.log('selectedQuestionNum ineffect statae ', selectedQuestionNum);
			handleUpdateselectedObj(selectedQuestionNum)
		}

		if(resetState != false){
			console.log('inside reset State');
			handleResetMultipleStates()

		}
		
	

		
		// setTimeout(() => {
		// 	firstLoad = false;
		// }, 3000);

		
	});
	// ------------------------------------------------------------------------------

	// Handle AI Asisstant page toggle and loading componenet
	const handleEnterPage = () => {
		enterPageToggle = true;
		showNav = true
		setTimeout(() => {
			firstLoad = false;
		}, 3000);
	};
	// ------------------------------------------------------------------------------

	// Handle navigation toggle header
	const handleStructureToggle = () => {
		navAssistantToggle_Structured =  true 
		navAssistantToggle_History = false;
		navAssistantToggle_Patient = false

	};
	const handleSelectionToggle = () => {
		navAssistantToggle_History = true;
		navAssistantToggle_Patient = false
		navAssistantToggle_Structured =  false 
		showNav = true
		searchNav(false)
		closeNav(true)
		selectedToggle = []

	};

	const hanldePatientToggle = () => { 

		navAssistantToggle_Patient = true
		navAssistantToggle_Structured =  false 
		navAssistantToggle_History = false;
		searchNav(true)
		selectedToggle = []
		selectedQuestionNum = []


	}

	const handleUserPage = () => { 
		navAssistantToggle_Patient = true 
		navAssistantToggle_Structured =  false 

	}

	const handleMenuOptionToggle = () => { 
		MenuOptionToggle = !MenuOptionToggle
	}
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

 const handleMenuDownloadClick = async () => {
    // JSON data to be sent
    const reportData = {
        title: "Knee Radiograph Report",
        description: "Comprehensive template for standardized knee X-ray reporting",
        metadata: {
            identifier: "knee-xray-report-template",
            language: "de",
            publisher: "Scanlytics",
            rights: "May be used freely, subject to license agreement",
            license: "http://www.scanlytics.de/license.pdf",
            date: "2025-03-16",
            creator: "Philipp Gallaschik"
        },
        patient_data: {
            name: "Hans Peter",
            birth_date: "*9.11.1989"
        },
        sections: [
            {
                name: "Findings",
                questions: [
                    {
                        id: 0,
                        label: "Wie ist die Qualität der Untersuchung?",
                        answer: "Gut",
                        sentence: "Die Qualität der Untersuchung war {}."
                    },
                    {
                        id: 1,
                        label: "Wie ist der Zustand der Darmreinigung?",
                        answer: "exzellent",
                        sentence: "Der Zustand der Darmreinigung war {}."
                    },
                    {
                        id: 2,
                        label: "Welche Feldstärke wurde verwendet?",
                        answer: "",
                        sentence: "Die Feldstärke war {}."
                    },
                    {
                        id: 3,
                        label: "Welches Kontrastmittel wurde verwendet?",
                        answer: "",
                        sentence: "Das verwendete Kontrastmittel war {}."
                    },
                    {
                        id: 4,
                        label: "Wie viel Kontrastmittel (in ml) wurde verwendet?",
                        answer: "",
                        sentence: "Die Menge des verwendeten Kontrastmittels war {} ml."
                    },
                    {
                        id: 5,
                        label: "Was ist der aktuelle PSA-Wert?",
                        answer: "",
                        sentence: "Der aktuelle PSA-Wert ist {}."
                    },
                    {
                        id: 6,
                        label: "Gibt es eine PSA-Vorgeschichte?",
                        answer: "sfd",
                        sentence: "Es gibt eine PSA-Vorgeschichte: {}."
                    },
                    {
                        id: 7,
                        label: "Was wurde bei vorherigen Biopsien festgestellt?",
                        answer: "die waren nicht gut",
                        sentence: "Vorherige Biopsien ergaben: {}."
                    },
                    {
                        id: 8,
                        label: "Was war das Ergebnis der digitalen rektalen Untersuchung?",
                        answer: "",
                        sentence: "Das Ergebnis der digitalen rektalen Untersuchung war: {}."
                    },
                    {
                        id: 9,
                        label: "Wie groß ist die Prostata (in mm)?",
                        answer: "",
                        sentence: "Die Größe der Prostata ist {} mm."
                    }
                ]
            }
        ],
        return_as: "Fliesstext"
    };

    try {
        // Send the JSON data as a POST request
        const response = await fetch('https://scanlytics2-be.fly.dev/pdf/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        });

        // Check if the response is successful
        if (response.ok) {
            // Get the PDF blob from the response
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = 'scanlytics-report.pdf';

            // Append to the document
            document.body.appendChild(link);

            // Trigger the click event
            link.click();

            // Clean up - remove the link from the document
            document.body.removeChild(link);

            // Optional: Add analytics or tracking
            console.log('Report downloaded');
        } else {
            console.error('Failed to generate the PDF:', response.statusText);
        }
    } catch (error) {
        console.error('Error while downloading the report:', error);
    }
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
	// ------------------------------------------------------------------------------

	// Handle Close toggle
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


	// Need to connect with child component 

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
	


	

// Need to update th function 
	const handleResetQuestion = () => {
		resetState = true
		handleSelectionToggle()
		// console.log('inside reset state true');
		// 	stateobj = []
		// 	findingsCheckBoxState = []
		// 	selectedToggle = []
		// 	selectedRowToggle  = false
		// 	// selectedQuestionToggle = false
		// 	disableAiStartBtn = true
		// 	ItemToggle = null
		// 	console.log('on handleResetQuestion Toggle', ItemToggle);
		

	}

	

	
</script>


<script lang="ts" module>
	let recordState = $state(false)
	let aiBotText = $state("")
	let stateAnswer = $state([])
	let textState = $state([])
	let answerdInputData: any = $state({});
	let audioTrackArrState: any= $state([]);
	let audioData = $state([]);
	let selectedQuestionNum: any = $state([])
	let aiToggleState = $state(false)
	let questionTracker = $state(0)


export function loadAiTextToggle (aiToggle: any){
	aiToggleState = aiToggle
	console.log('aiToggleState', aiToggleState);
}



export function SelectedQuestionAI(selectedQuestionNumValue: any){
	console.log('selectedQuestionNum in SelectedQuestionAI', selectedQuestionNumValue);
	selectedQuestionNum = selectedQuestionNumValue
}

 export function handleRecordBtnUpdate(){
	recordState = !recordState
 }


 export function AudioTracker(audioRecordData: any){ 
	console.log('audioRecordData', audioRecordData);
	audioData = audioRecordData
	if(audioRecordData){
		audioTrackArrState.push(audioData)
	}

if (audioTrackArrState.length !== 0) {
	let timeout = setTimeout(() => {
		audioTrackArrState.pop();
		clearTimeout(timeout); // Correct method for setTimeout
	}, 1000);
}
 }



//  Binding the input and updating the question background state 
 export function handleUpdateQuestionState(AnswerArr: any, StateArr: any){
	


		// Handles the updating the question background state
		stateAnswer = StateArr
	
		// Handles the binding on the input field
		textState = AnswerArr

		// console.log('stateAnswer', stateAnswer);
		// console.log('textState', textState);
		// console.log('questionTracker', questionTracker);



		let trackArr:any = []
		let trackArrString: any = []

		console.log('trackArr', trackArr);
		console.log('trackArrStringtrackArrString', trackArrString);
		if(stateAnswer.length > 0){
			handleSelectUpdateBackground(stateAnswer)
			questionTracker = questionTracker+=1

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

// Handle the AI text data
 export function handleAITextData(aiText: any){
	if (typeof aiText === 'string') {
		aiBotText = aiText.replace(/^"(.*)"$/, '$1');
  }

	
 }






</script>
<head>
	<title>Scanlytics</title>
</head>

<main>
	<!-- <Header /> -->

	<div class="mainSection">
		<div class="StartOverlay">

			{#if showNav}
			<!-- Navigation Area -->
			<Navigation
			on:structured={handleStructureToggle}
			on:selection={handleSelectionToggle}
			on:patient={hanldePatientToggle}
			/>
			{/if}


			<!-- Main Component -->
			{#if enterPageToggle}
				{#if navAssistantToggle_Structured}
					<div class="conversationArea">
						<!-- Select Image Area  -->
						{#if scansToggle}
							<Selectpage />
						{/if}
						<!-- selected Questions -->
						
						<!-- Image Area  -->
						<div class="imgScanSection">
							{#if firstLoad}
								<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
							{:else}
							<div class="selectedQuestionsArea">
								<SelectedQuestions />
							 </div>
								<div class="aiContentArea">
								
									{#if imageUploadToggle}
									
									<div class="imgConectSectionUpload" style="width: {menuToggle ? '70%' : '100%'};">
										<div class="imgConectSectionUpload-ImageUploader">
											<ImageUploader />
											
										</div>
										
										
										<div class="imgConectSectionUpload-AIRecordSection">
											<div class="imgConectSectionUpload-AIRecordContent">

												{#if aiToggleState}
												{aiBotText}
												{:else}
												<ScaleOut size="30" color="white" unit="px" duration="1s" />
												{/if}

											</div>
										</div>
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
									<!-- AI Report Section -->
									 {#if MenuOptionToggle}
 									<div class="MenuSelectOption">
										<div class="MenuSelectOptionHeader">
											
											<p class="OptionEditorText">Menu Editor</p>
										</div>
										<div class="MenuSelectOptionContent">
											<div class="MenuSelectionOptionItem">
												<div class="optionTitle">
													<p>Header</p> 
												</div>
												<div class="OptionToggleContent">

													
													{#if OptionStateDes}
													<img
																src="mminus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("DescriptionHeader")}
																

													/>
													{:else}
													<img
																src="pplus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("DescriptionHeader")}
																

													/>

													{/if}
												</div>
											</div>
											 <!--Patient  -->
											 <div class="MenuSelectionOptionItem">
												<div class="optionTitle">
													Patient 
												</div>
												<div class="OptionToggleContent">
													{#if OptPatientStateToggle}
													<img
													src="pplus.png"
													alt="widget"
													class="minusBtnIcon"
													on:click={() => handleUpdateOption("patient")}
														/>
													{:else}
													<img
																src="mminus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("patient")}
													/>
													{/if}
												</div>
											</div> 

											<!-- Study Information -->
											<div class="MenuSelectionOptionItem">
												<div class="optionTitle">
													Study Information 
												</div>
												<div class="OptionToggleContent">

													{#if optionStudyInfoToggle}

													<img
													src="pplus.png"
													alt="widget"
													class="minusBtnIcon"
													on:click={() => handleUpdateOption("StudyInformation")}
														/>
													{:else}
													<img
																src="mminus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("StudyInformation")}
													/>

													

													{/if}
												</div>
											</div> 

											<!-- Examination -->
											<div class="MenuSelectionOptionItem">
												<div class="optionTitle">
													Examination 
												</div>
												<div class="OptionToggleContent">

													{#if optionExamToggle}
													<img
																src="pplus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("Examination")}
													/>
													{:else}
													<img
																src="mminus.png"
																alt="widget"
																class="minusBtnIcon"
																on:click={() => handleUpdateOption("Examination")}
																

													/>
													{/if}
												</div>
											</div> 

										</div>
									</div>
									{/if}
										<div class="ImageReportSection">
											<div class="imageReportSectionHeader">
												<p class="assitantTitle">AI Reporting Assistant</p>
											</div>
											<!-- Ai Section menu field -->
											<div class="assistantContentSection">
												{#if OptionStateDes}
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
												{/if}
												<div class="aicontentSection"
												style="height: {OptionStateDes == true
												? '70%'
												: '100%'};"
												>
													<div class="aicontentSectionHeader">
														<div class="aicontentSectionHeader-State" >
														{#if MenuOptionToggle}
																<img
																src="cross.png"
																alt="widget"
																class="menuOptionBtn"
																on:click={handleMenuOptionToggle}
															/>
															{:else}
																<img
																src="menub.png"
																alt="widget"
																class="menuOptionBtn"
																on:click={handleMenuOptionToggle}
															/>
														{/if}
														
														</div>
														
														<div>
															<p class="questiontTitle">Questionnaire</p>
														</div>
													</div>
													<div class="aicontentSectionContent">
														{#if kneejsonData.sections.length > 0}
															{#each kneejsonData.sections as items (items)}
																{#if ItemToggle != null && ItemToggle.name == items.name}
																	<div class="selected-item-area"
																	style="height: {OptionStateDes == true ||  optionExamToggle == false || optionStudyInfoToggle == false || OptPatientStateToggle == false
																	? '56%'
																	: '42%'};"
																	>
																		<div class="selected-Item-header">
																			<div class="selected-Item-title">
																				<div>
																					<p>
																						{ItemToggle.name}
																					</p>
																				</div>


																			{#if selectedToggle.length > 0}
																				 
																						<!-- Jump Back feature -->
																				<!-- <div class="select-Text-Lable"
																			
																				> -->
																				
																							<!-- selectedToggle = arr -->

																						<!-- <img
																						src="undo.png"
																						alt="widget"
																						class="resetbtn"
																					 	on:click={handleResetQuestion}
																					/> -->


																				<!-- </div> -->

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
																			: 'white'};
																			height: {OptionStateDes == true
																			? '6%'
																			: '4%'};
																			display: {items.name == ExamStateVal && optionExamToggle || items.name == studyPatientStateVal && optionStudyInfoToggle || items.name == OptionStateVal && OptPatientStateToggle
																			? 'none'
																			: 'flex'};
																			

																			
																			"
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
													
												</div>
											</div>
										</div>
									{/if}
								</div>
								<!-- AI sidebar Area -->
								<AiSidebar
									menuToggle={menuToggle}
									selectedQuestionNum={selectedQuestionNum}
									scansToggle={scansToggle}
									textEditToggle={textEditToggle}
									recordState={recordState}
									audioData={audioData}
									audioTrackArrState={audioTrackArrState}
									on:menuAIClick={handleMenuAIClick}
									on:menuScansClick={handleMenuScansClick}
									on:menuDownloadClick={handleMenuDownloadClick}
									on:textEditorToggle={handleTextEditorToggle}
								

								/>

							{/if}
						</div>
						
					</div>
				{/if}

				<!-- Medical History Form Component -->
				{#if navAssistantToggle_History}
						<MedicalForm on:startReporting={handleStructureToggle}/>
				{/if}
				{#if navAssistantToggle_Patient}
						 <Patients on:robot={handleSelectionToggle}/>
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
		/* overflow-y: auto; */
		scrollbar-width: none;
		-ms-overflow-style: none;
		overflow: none;
		/* background-color: #fff; */
	}

	.mainSection {
		height: 95%;
		margin-top: 30px;
		/* background: palevioletred; */
	}

	.StartOverlay {
		height: 100%;
		width: 100%;

		/* background-color: #185fc9; */
		z-index: 6;
	}

	
	.conversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: row;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
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
		/* height: 93%; */
		height: 100%;
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
		flex-direction: row-reverse;
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
		justify-content: flex-end;
		cursor: pointer;
		padding-right: 2%;
	}


	.menuOptionBtn{
		height: 50%;
		width: 12%;
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

	.MenuSelectOption{
		
		background-color: #0d1117;
		height: 100%;
		width: 10%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}
	
	.MenuSelectOptionHeader{
		height: 5.9%;
		width: 100%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		
	}

	.MenuSelectOptionContent{
		height: 94%;
		width: 100%;
		font-family: sans-serif;
		color: white;
		display: flex;
		flex-direction: column;
		gap: 2%;
		padding-top: 3%;
		

	}

	
	.MenuSelectionOptionItem{
		width: 100%;
		height: 3%;
		/* background-color: grey; */
		display: flex;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
	}

	.optionTitle{
		width: 80%;
		height: 100%;
		/* background-color: #4CAF50; */
		font-family: system-ui;
		font-size: 14px;
		padding-left: 2% ;
		border-right:  1px solid rgba(255, 255, 255, 0.175);
		font-weight: 500;
		display: flex;
		align-items: center;
		
		
		
	}

	.OptionToggleContent{
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.OptionEditorText{
		font-size: 20px;
		font-weight: bold;
		font-family: sans-serif;
		color: #ffffff;
		text-align: center;
	}

	.minusBtnIcon{
		height: 100%;
		width: 35%;
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
		/* border: 1px solid rgba(255, 255, 255, 0.175); */
		border-left: 1px solid rgba(255, 255, 255, 0.175);
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
		height: 70%;
		width: 100%;
		border: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		/* background-color: #fff; */

	}

	
	.audioStateObjStyle{
		/* background-color: pink; */
		width: 100%;
		height: 10%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		/* justify-content: flex-end; */

	}

	.assistantPlayArea {
		height: 15%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* border: 1px solid rgba(255, 255, 255, 0.175); */
		align-items: center;
		color: white;
		font-family: sans-serif;

		gap: 8%;
		font-size: 10px;
	}


	.microIcon{
		width: 60%;
		height: 40%;	
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

	.imgConectSectionUpload{
		width: 100%;
		height: 100%;
		/* background-color: green; */
		/* min-height: 100svh; */
	}

	.imgConectSectionUpload-ImageUploader{
		width: 100%;
		height: 95%;
		/* background-color: red; */
	}

	.imgConectSectionUpload-AIRecordSection{
		width: 100%;
		height: 5%;
		/* background-color: blue; */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.imgConectSectionUpload-AIRecordContent{
		width: 50%;
		height: 80%;	
		background-color: rgb(5, 5, 5);
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.879);
		font-size: 16px;
		font-family: sans-serif;
		font-weight: 600;
		border: 1px solid rgba(255, 255, 255, 0.175);
		
	}
	.selectedQuestionsArea{
		height: 100%;
		width: 3%;
		display: flex;
		flex-direction: row;
		
		border-right: 1px solid rgba(255, 255, 255, 0.175);
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
		.imgConectSectionUpload{
			width: 100%;
			/* min-height: 100svh; */
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

	@media (min-width: 768px) {
		
		main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* overflow-y: auto; */
		scrollbar-width: none;
		-ms-overflow-style: none;
		overflow: none;
		/* background-color: #fff; */
		
	}

		.mainSection {
		height: 95%;
		margin-top: 1%;
		background: palevioletred;
	}

	.StartOverlay {
		height: 100%;
		width: 100%;

		/* background-color: #185fc9; */
		z-index: 6;
	}
	}

	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {

		main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* overflow-y: auto; */
		scrollbar-width: none;
		-ms-overflow-style: none;
		overflow: none;
		/* background-color: #fff; */
	}

	.mainSection {
		height: 95%;
		margin-top: 1%;
		/* background: palevioletred; */
	}
	


		
	}



</style>
