<script lang="ts" module>
	let text = $state('');
	let answerArrData = $state([]);
	let stateArrData = $state([]);
	let answeredObjectData = $state({});
	let callFetch =  $state(false);
	import * as scanQuestionObj from '../../../../static/scanQuestion.json';



	

	export function bindingText(textevent: string) {
		try {
			text = textevent;
		} catch (error) {
			console.error('Error in bindingText', error);
		}
	}

		// Handles The fill out processs
		export async function handleFillDataInReport(AnswerArr: any, StateArr: any) {
			// pdfobjUrlVal = pdfobj;
			console.log('AnswerArr in handleFillDataInReport', AnswerArr);
			console.log('StateArr in handleFillDataInReport', StateArr);
			// AnswerArr = ["hallo", "wie gehts", "warum"]
			answerArrData = AnswerArr 
			stateArrData = StateArr 
			const questions= scanQuestionObj.sections[0].questions
			if(StateArr.length > 0){
							questions.forEach((question) => {
			// Find index of question.id in stateArr
			const index = StateArr.indexOf(question.id);
			if (index !== -1) {
				question.answer = AnswerArr[index];
			}
			});

			scanQuestionObj.sections[0].questions = questions
			// console.log("question", questions);
			// console.log('scanQuestionObj', scanQuestionObj);
			answeredObjectData = scanQuestionObj
			callFetch = true
					
			}


		}
</script>

<script>
	import { GemBoxPdfViewer } from '@gembox/pdfviewer';
	import '@gembox/pdfviewer/dist/es/pdfviewer.css';
	import * as scanQuestion from '../../../../static/scanQuestion.json';
	import { Circle2 } from 'svelte-loading-spinners';
	

	let viewerElement: any;
	let ReportData = $state(scanQuestion);
	let pdfUrl = $state('');
	let ReportToggle = $state(false);
	let StructuredReportCall  = $state(false);




	// const handleDataFillOut = () => {

	// }

	// const updateReportDataStructured = () => {
		
		
	// 	const updatedScanQuestionObj = { ...scanQuestionObj, return_as: "Tabelle" };
	// 	console.log('scanQuestionObj', updatedScanQuestionObj.return_as);
		
	// 	answeredObjectData = updatedScanQuestionObj
	// 	if(answeredObjectData){
			
	// 		console.log('answeredObjectData', updatedScanQuestionObj.return_as);
	// 	}

	// }
	
	const handleUpdateToFließText = ( ) => {
		StructuredReportCall = false 
		callFetch = true
		
	}

	const handleUpdateToStructuredReport = () => {
		StructuredReportCall = true 
		callFetch = false
		
		
		
		// updateReportDataStructured()

	}
	
	const gedPdfFile = async (filledreportObject: any) => {
		try{
			if (filledreportObject) {
			// console.log('Rpeort Data exist', scanQuestion);
		
			try {
				// Send the JSON data as a POST request
				const response = await fetch('https://scanlytics2-be.fly.dev/pdf/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(filledreportObject)
				});

				// const data =  await response.json()
				console.log(response.headers.get('Content-Type'));
				console.log('reponse Data', response);
				// Check if the response is successful
				if (response.ok) {
					// Get the PDF blob from the response
					const blob = await response.blob();
					pdfUrl = window.URL.createObjectURL(blob);
					
					return pdfUrl;
					// handlePdfRequest(pdfUrl)
				}
			} catch (error) {
				console.error('Error on Call funciton: getReportDataCall', error);
			}
		}
		}catch(error){
			console.error('Error on getReportDatacall function ', error);
		}
	
	};


	const handlePDFContainerUpdate = async (pdfobjUrl: any) => {
		
		try {
			// console.log('handlePDFContainerUpdate on ', pdfobjUrl);
			if (pdfobjUrl) {
				GemBoxPdfViewer.setLicense('FREE-LIMITED-KEY');
				GemBoxPdfViewer.create({
					container: viewerElement,
					initialDocument: pdfobjUrl
				});
				
				
			}
			
		} catch (error) {
			console.error('Error on handlePDFContainerUpdate', error);
		}
	};

	$effect(() => {
		const callPdfDok = async () => {


			if (callFetch) {
				

				// handleDataFillOut()
				const updatedScanQuestionObj = { ...answeredObjectData, return_as: "Fliesstext" };
				console.log('callFetch on FließText', updatedScanQuestionObj.return_as);
				const pfdUrlValue = await gedPdfFile(updatedScanQuestionObj);

				if (pfdUrlValue) {
					handlePDFContainerUpdate(pfdUrlValue);
					ReportToggle = true
					
				}

			}else if(StructuredReportCall){
					
					const updatedScanQuestionObjTablle = { ...answeredObjectData, return_as: "Tabelle" };
					console.log('StructuredReportCall Object on  Table', updatedScanQuestionObjTablle.return_as);
					const pfdUrlValue = await gedPdfFile(updatedScanQuestionObjTablle);

				if (pfdUrlValue) {
					handlePDFContainerUpdate(pfdUrlValue);
					ReportToggle = true
					
				}
			}
			
		};
		
		// Calls the FLießText PDF
		const handleUploadData = () => {
		
		 const IntervalId = setInterval(() => {
			console.log('inside Upload Data');
			callFetch = true
			callPdfDok();
			clearInterval(IntervalId)
		 }, 50)
		}
	
		
		// Calls the Tabelle PDF
		const handleUpdateUploadToStrucutred = () => {
			const IntervalId = setInterval(() => {
			console.log('inside Upload Data');
			callFetch = false
			callPdfDok();
			clearInterval(IntervalId)
		 }, 50)
		}

		if(StructuredReportCall){
			handleUpdateUploadToStrucutred()
		}else{
			handleUploadData()
		}
		
	});
</script>

<div class="text-editor">
	{#if callFetch || StructuredReportCall}
		<!-- triggerd -->
		 <div class="fileTexttablleArea">
			<div class="ReportSectionTabelle" 
			style="display: {ReportToggle ? "flex" : "none"};"
			
			on:click={handleUpdateToStructuredReport}>
			   <img src="diam.png" alt="tabellepdf" class="tabelleIcon">
			</div>
   
			<div class="ReportSectionFließ" 
			style="display: {ReportToggle ? "flex" : "none"};"
			
			on:click={handleUpdateToFließText}>
			   <img src="flText.png" alt="fließTextpdf" class="fließTextIcon">
			</div>
		 </div>
		
		 
		<div bind:this={viewerElement} style="width: 100%; height: 100%;"></div>
	{:else}

		<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
		<!-- {:else}
			<textarea bind:value={text}></textarea>
		{/if}
		<textarea bind:value={text}></textarea>
	 -->
	{/if}
</div>

<style>
	.text-editor {
		padding: 10px;
		width: 100%;
		height: 100%;
		/* background-color: #fff; */
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}



	textarea {
		width: 100%;
		height: 92.2%;
		min-height: 400px;
	}


	.fileTexttablleArea{
		position: absolute;
		top: 5%;
		left: 5%;
	}
	.button-group {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}

	@media (min-width: 1280px){
		.fileTexttablleArea{
		position: absolute;
		top: 2.7%;
		left: 19.5%;
		/* background-color: rgba(238, 57, 87, 0.338); */
		width:8%;
		height: 3%;
		z-index: 5;
		display: flex;
		flex-direction: row;
		gap: 5%;
		justify-content: center;

		/* align-items: center; */


	}
		.ReportSectionTabelle{
		/* position: absolute; */
		/* background-color: rgba(65, 255, 12, 0.34); */
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 14.5%;
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center; */

	}


	.ReportSectionFließ{
		/* position: absolute; */
		/* background-color: rgba(211, 192, 255, 0.34); */
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 18%;
		z-index: 5; */

	}
	.tabelleIcon{
		width: 60%;
		height: 70%;
	}

	.fließTextIcon{
		width: 55%;
		height: 85%;
	}
	
	
	}

	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px)  and (max-width: 1890px){

		.fileTexttablleArea{
		position: absolute;
		top: 2.2%;
		left: 15%;
		/* background-color: rgba(63, 57, 238, 0.338); */
		width:8%;
		height: 3%;
		z-index: 5;
		display: flex;
		flex-direction: row;
		gap: 2%;
		justify-content: center;

		/* align-items: center; */


	}
		.ReportSectionTabelle{
		/* position: absolute; */
		/* background-color: rgba(65, 255, 12, 0.34); */
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 14.5%;
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center; */

	}


	.ReportSectionFließ{
		/* position: absolute; */
		/* background-color: rgba(211, 192, 255, 0.34); */
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 18%;
		z-index: 5; */

	}
	.tabelleIcon{
		width: 50%;
		height: 60%;
	}

	.fließTextIcon{
		width: 50%;
		height: 70%;
	}
	}

	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1900px){
		.fileTexttablleArea{
		position: absolute;
		top: 1.75%;
		left: 13%;
		/* background-color: rgba(255, 20, 59, 0.338); */
		width:8%;
		height: 3%;
		z-index: 5;
		display: flex;
		flex-direction: row;
		gap: 1%;
		justify-content: center;

		/* align-items: center; */


	}
		.ReportSectionTabelle{
		/* position: absolute; */
		/* background-color: rgba(65, 255, 12, 0.34); */
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 14.5%;
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center; */

	}


	.ReportSectionFließ{
		/* position: absolute; */
		/* background-color: rgba(211, 192, 255, 0.34); */
		width: 40%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		/* top: 2.1%;
		left: 18%;
		z-index: 5; */

	}
	.tabelleIcon{
		width: 45%;
		height: 50%;
	}

	.fließTextIcon{
		width: 50%;
		height: 63%;
	}
	}


	/* Ultra-wide screens (e.g. 2560px) - still need to be adjusted*/ 
	@media (min-width: 2560px){
				
	
	}

</style>
