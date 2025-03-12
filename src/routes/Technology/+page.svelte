<script lang="ts">
	import Header from '../Header.svelte';
	import ImageUploader from './ImageUploader.svelte';
	import TextList from './TextList.svelte';
	import Guide from './Guide.svelte';
	import Footer from '../Footer.svelte';
	import { onMount } from 'svelte';
	import TextEditor from './TextEditor.svelte';
	import Selectpage from './selectpage.svelte';
	
	function redirectUser(){ 
		window.location.href = 'https://calendly.com/tobias-wedel-code/30min';
	}

	// Independent state management
	let extractedTexts: string[] = []; // Texts extracted from uploads
	let editorContent = ''; // Content in the text editor
	let isMobile = false;

	if (typeof window !== 'undefined') {
		isMobile = window.innerWidth <= 600;
		window.addEventListener('resize', () => {
			isMobile = window.innerWidth <= 600;
		});
	}

	// Server initialization
	onMount(async () => {
		try {
			const response = await fetch('https://scanlytics2-ml.fly.dev/', {
				method: 'GET'
			});
			console.log('Pinging ml server... ');
			if (response.ok) {
				console.log('Ml server started successfully');
			} else {
				console.error('Failed to start server', response.status);
			}
		} catch (error) {
			console.error('Error starting server', error);
		}
	});

	onMount(async () => {
		try {
			console.log('Pinging whisper server... ');
			const response = await fetch('https://scanlytics2-whisper.fly.dev/', {
				method: 'GET'
			});
			if (response.ok) {
				console.log('Whisper server started successfully');
			} else {
				console.error('Failed to start server', response.status);
			}
		} catch (error) {
			console.error('Error starting server', error);
		}
	});

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
</script>

<head>
	<title>Scanlytics</title>
</head>

<main>
	<Header />

	<div class="mainSection">
		<div class="mainLeftContentSection">
			
			<div class="boxArea">
				<!-- Left side  -->
				<div class="boxSelectArea">
					<div class="boxSelectAreaLayer">
						<Selectpage/>
						<!-- Box Drop Down Section -->
						<div class="box1">
							<ImageUploader onUploadSuccess={handleUploadSuccess} />
						</div>
					</div>
				</div>

				<!-- right side -->
				<div class="boxAreaMl">
					<div class="box">
						<!-- Using on:change event instead of bind:text -->
						<TextEditor 
							text={editorContent} 
							on:change={handleEditorChange} 
						/>
					</div>

					<div class="box">
						<!-- Using onSelect callback instead of direct binding -->
						<TextList 
							texts={extractedTexts} 
							onSelect={handleTextSelect} 
						/>
					</div>
				</div>
			</div>

			<div class="explainArea">
				<Guide {isMobile} />
			</div>
		</div>
	</div>

	<Footer />
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* display: flex;
		flex-direction: column; */
		overflow: hidden;
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


		/* flex: 1; */
		/* margin: 80px; */
		width: 35%;
		height: 100%;
		display: flex;
		flex-direction: flex;
		justify-content: center;
		align-items: center;
		gap: 5%;
		/* padding: 10px; */
		/* background-color: rgb(211, 210, 209); */

	}
	.boxSelectAreaLayer{
		background-color: rgb(211, 210, 209);


		height: 100%;
		display: flex;
		/* margin: 30px; */
		width: 100%;
		height: 89%;


	}
	.boxSelectContentLayer{
		/* background-color: rgba(60, 60, 60, 0.753); */
		/* background-color: rgb(157, 157, 157); */

		height: 100%;
		width: 30%;
		display: flex;
		/* gap: 10%; */
		flex-direction: column;
		align-items: center;
		border-right: 1px solid rgb(175, 166, 166);

		/* padding-top: 5%; */
		/* justify-content: space-around; */
		/* overflow: auto; */
		/* border: 1px solid white; */
	}


	.imgPreviewArea{
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
	.imgPreviewAddArea{
		background-color: rgba(211, 210, 209, 0.64);
		height: 10%;
		width: 100%;
		border-top: 1px solid rgb(175, 166, 166);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.boxSelectContent{
		/* flex: 1; */
		/* margin: 30px; */
		width: 80%;
		height: 25%;
		/* padding: 10px; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		background-color: rgba(211, 210, 209, 0.64);
		border: 1px solid rgba(255, 255, 255, 0.066);
		position: relative;
	}
	
	.patientInfo{
		width: 97%;
		height: 10%;
		/* background-color: green; */
		/* padding: 0.2rem; */
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
	
	.patientInfoData{
		width: 97%;
		height: 30%;
		/* background-color: green; */
		/* padding: 0.2rem; */
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

	.patientB_Date{
		font-size: 7px;
	}
	.boxAreaMl {
		/* background-color: rgb(65, 167, 47); */
		width: 65%;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
		margin-left: 2%;

	}
	.box1{
		flex: 1;
		/* margin: 30px; */
		width: 100%;
		height: 100%;
		/* padding: 10px; */
		/* width: 5px; */
		background-color: rgb(211, 210, 209);
		/* background-color: red; */

		border: 1px solid #ccc;

	}

	.box {
		flex: 1;
		margin: 30px;
		width: 50%;
		height: 89%;
		/* padding: 10px; */
		/* width: 5px; */
		background-color: rgb(211, 210, 209);

		border: 1px solid #ccc;
	}

	.explainArea {
		/* background-color: rgba(87, 167, 47, 0.421); */
		height: 25%;
	}

	.mainSection {
		/* background-color: rgb(36, 34, 34); */
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		/* background-color: rgb(255, 23, 193); */
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
