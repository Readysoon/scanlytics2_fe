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

	let avatarScriptText: string = $state('');
	let openeningText: string = `In der oberen Leiste finden Sie alle Reiter, die Sie benötigen, 
								um den Befund herunterzuladen, zu drucken oder die Befundart zu ändern. 
								Die verfügbaren Befundarten sind:`;
	import { Application } from '@splinetool/runtime';
	let viewerElement: any;
	let ReportData = $state(scanQuestion);
	let pdfUrl = $state('');
	let ReportToggle = $state(false);
	let StructuredReportCall  = $state(false);
	let index =  $state(0);
	let canvas: any;
	let loading: boolean = true;
	let showdefaultTextBruno =  $state(false);




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

	
	const handleAutoTextFillOut = () => {
		const IntervalId = setInterval(() => {
			if (index < openeningText.length) {
				avatarScriptText += openeningText.charAt(index);

				index++;
			} else {
				clearInterval(IntervalId);
			}
		}, 20);
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

		const handleSHowBruno = () => {

			let app = new Application(canvas);

			loading = true;

			const splineobj = app
			.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode')
			.then(() => {
				const obj = app.findObjectByName('brunov1');
				

				loading = false
				showdefaultTextBruno = true
				handleAutoTextFillOut();
			});
		}
	
		if(StructuredReportCall){
			
			handleUpdateUploadToStrucutred()
			handleSHowBruno()
		}else{
			
			handleUploadData()
			handleSHowBruno()
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

		<!-- {#if !ReportToggle}
			<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />
			
		{/if} -->
		
		<div class="avatarcanvas">
			{#if  callFetch && ReportToggle}
			<div class="avatarTextSection">
				<div class="textContent" >
					{avatarScriptText}
					 
				</div>

					
				<div class="showExample">
					<!-- Structured Report Example -->
					<div class="showExampleTabelle">
						<div class="showExampleTabelleIcon">
							<img src="diam.png" alt="tabellepdf" class="tabelleIconInShow">
						</div>
						<div class="showExampleTabelleDescription">
							Strukturierter Befund
						</div>
					</div>

					<!-- FließTextExample -->
					<div class="showExampleFließ"> 
						<div class="showExampleFließIcon">	
							<img src="flText.png" alt="fließTextpdf" class="fließTextIconInShow">
						</div>
						
						<div class="showExampleTabelleDescription">
							Freitextbefund
						</div>
					</div>
					
				</div>
			</div>
			
			{/if}

	
		<div class="aibotAvatar">

			<canvas bind:this={canvas} class="avater" />
		</div>
		

		


	    </div>
	

		{#if !ReportToggle}
		<div class="defaultInformationPopUp">
			
		<Circle2 size="150" colorOuter="blue" unit="px" durationInner="1s" />

		<p>Bitte füllen Sie den Befund zusammen mit Bruno aus, um einen Einblick in Ihr Dokument zu erhalten.</p>
		

	
		</div>

	

		{/if}

	{:else}

		
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

	.defaultInformationPopUp{
		/* background-color: pink; */
		width: 70%;
		height: 40%;  
		
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 15%;
		color: white;
		font-family: system-ui;
	}

	/* Avatar Section */

	.avatarcanvas {
		/* background-color: pink; */
		position: absolute;
		height: 30%;
		width: 19%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 75%;
		left: 85%;
		z-index: 5;
	}
	
	@keyframes upDown {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.avatarTextSection {
		width: 100%;
		height: 99%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		color: white;
		font-size: 15px;
		position: absolute;
		top: -73%;
		left: -25%;
		z-index: 5;
		/* padding: 1%; */
		animation: upDown 2s ease-in-out infinite;
	}

	.textContent{
		/* background-color: #fff; */
		width: 100%;
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5%;

	}
	.showExample{

		/* background-color: #fcb1b1; */
		width: 100%;
		height: 30%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}


	.showExampleTabelle{
		width: 50%;
		height: 100%;
		/* background-color: green; */

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;


	}

	.showExampleTabelleIcon{
		/* background-color: blue; */
		display: flex;
		width: 100%;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.showExampleFließIcon{
		display: flex;
		width: 100%;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	
	.showExampleTabelleDescription{
		/* background-color: rgb(245, 245, 245); */
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10.5px;
		padding: 1%;

	}

	.showExampleTabelleDescription{
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10.5px;
		padding: 1%;
	}
	.tabelleIconInShow{
		width: 30%;
		height: 60%;
	}

	.fließTextIconInShow{
		width: 30%;
		height: 60%;
	}	

	.showExampleFließ{
		width: 50%;
		height: 100%;
		/* background-color: orange; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
	}

	.avatarTextMinute{
		width: 100%;
		height: 65%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		color: white;
		font-size: 15px;
		position: absolute;
		top: -33%;
		left: -25%;
		z-index: 5;
		padding: 1%;
		animation: upDown 2s ease-in-out infinite;
	}

	.aibotAvatar {
		/* background-color: rgba(226, 17, 52, 0.619); */
		width: 100%;
		height: 90%;
		margin-top: 5%;
		/* position: absolute; */
		top: 0%;
		/* left: 70%; */
		z-index: 5;
		
	}

/* Small */
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
	
	.textContent{
		/* background-color: #fff; */
		width: 100%;
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5%;
		font-size: 11px;

	}
	
	
	.showExampleTabelleDescription{
		/* background-color: rgb(245, 245, 245); */
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 8px;
		padding: 1%;

	}

	.showExampleTabelleDescription{
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 8px;
		padding: 1%;
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
	.textContent{
		/* background-color: #fff; */
		width: 100%;
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5%;
		font-size: 11px;

	}
	
	
	.showExampleTabelleDescription{
		/* background-color: rgb(245, 245, 245); */
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10px;
		padding: 1%;

	}

	.showExampleTabelleDescription{
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 10px;
		padding: 1%;
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

	.textContent{
		/* background-color: #fff; */
		width: 100%;
		height: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5%;
		font-size: 13px;

	}
	
	
	.showExampleTabelleDescription{
		/* background-color: rgb(245, 245, 245); */
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11px;
		padding: 1%;

	}

	.showExampleTabelleDescription{
		display: flex;
		width: 100%;
		height: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 11px;
		padding: 1%;
	}

	}


	/* Ultra-wide screens (e.g. 2560px) - still need to be adjusted*/ 
	@media (min-width: 2560px){
				
	
	}

</style>
