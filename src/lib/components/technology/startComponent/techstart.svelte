<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { searchNav } from '../navigation/navigation.svelte';
	const dispath = createEventDispatcher();
	import { Application } from '@splinetool/runtime';
	import { Pulse } from 'svelte-loading-spinners';
	
	import { getWaveaudiAuto } from '../guideWavesurfer.svelte';
	import GuideWavesurfer from '../guideWavesurfer.svelte';

	let canvas: any;
	let loading : boolean = $state(true);
	let openeningText: string = "Willkommen beim Scanlytics Conversational AI Assistant. Mein Name ist Bruno und ich bin Ihr KI-Assistent. Bitte drücken Sie auf „Start“, um mit dem Befundungsprozess zu beginnen."
	let index =  $state(0) 
	let indexTonOn =  $state(0) 
	let avatarScriptText: string = $state("")
	let textState = $state(false)
	let brunoTextLoadingState = $state(false)
	let audioUrl = $state('');
	let enableViewTone = $state(true)
	let ToneBtnState = $state(true)
	let defaultTextState = $state(true)
	let avatarScriptTonText =  $state("")
	let showTonOnTextState = $state(true)
	
	// Handles the updated text after user clicks on the btn btn
	const handleTonOnUpdateText = (tonOnTextData: string) => { 

	
		const IntervalId = setInterval(() => { 
			
			if(indexTonOn < tonOnTextData.length){
				avatarScriptTonText += tonOnTextData.charAt(indexTonOn);
				console.log('avatarScriptTonText', avatarScriptTonText);
			
				indexTonOn++;
			
		
			}else{
				clearInterval(IntervalId)
				enableViewTone = true

				// console.log('avatarScriptText', avatarScriptText);
			
			}
		}, 100)
	
	}

	// Handles the default text show
	const handleUpdateText = (openeningTextData: string) => {


		const IntervalId = setInterval(() => { 
			
			if(index < openeningText.length){
			avatarScriptText += openeningTextData.charAt(index);
			
			index++;
			
		
			}else{
				clearInterval(IntervalId)
				enableViewTone = true

				// console.log('avatarScriptText', avatarScriptText);
			
			}
		}, 20)
	


}

	const handleTTSReq = async (speechText: string) => {
		try {
			const response = await fetch('/api/technology/speechbot', {
				method: 'POST',
				body: JSON.stringify({ data: speechText }),
				headers: {
					'content-type': 'application/json'
				}
			});

		

			const result = await response.json();
			console.log('result', result);

			if (result.success) {
				audioUrl = await result.audioUrl;
				if (audioUrl) {
					console.log('result', result);
					getWaveaudiAuto(audioUrl);
				}
			}
		} catch (error) {
			console.error('Error in handleTTSReq:', error);
		}

	}



	
		


	$effect(() => {
	
		const handleLoadAiAssistant = () => {
			let app = new Application(canvas);

		loading  = true;
		
		const splineobj = app.load('https://prod.spline.design/3uYTYJgFlEMs1RGK/scene.splinecode').finally(() => {
			const obj = app.findObjectByName("brunov1")
			console.log('obj', obj);
			
			loading  = false;
			textState = true 
			brunoTextLoadingState = true 
			handleUpdateText(openeningText)

			
		
	
			
			
		});
			
		}

		handleLoadAiAssistant()

		if(!defaultTextState){
			
		const updatedText = `Super, danke! dass Sie den Ton eingeschaltet haben! Willkommen bei der Scanlytics Conversational AI Assistant Demo-Applikation. Mein Name ist Bruno und Ich bin Ihr AI-Assistent und begleite Sie durch die Anwendung.
						Bitte klicken Sie als Erstes auf den Start-Button, um zu beginnen.`

		console.log('triggert in showTonOnTextState if condition');	
		handleTonOnUpdateText(updatedText)
		handleTTSReq(updatedText)
	}

			
		


		
	

	
	
		



	});

	const handleToneOn = () => { 
		console.log('tone is on ');

		ToneBtnState = !ToneBtnState
		const updatedText = `Ah, super – danke, dass Sie den Ton eingeschaltet haben!
							Willkommen bei der Canlytics Conversational AI Assistant Demo-Applikation.
							Mein Name ist Bruno, und ich freue mich sehr, Sie kennenzulernen.

							Ich bin Ihr KI-Assistent und begleite Sie durch die Anwendung.
							Bitte klicken Sie als Erstes auf den Start-Button, um zu beginnen.`
 

		defaultTextState = false
		showTonOnTextState = false
		// handleTonOnUpdateText(updatedText)
		
	}


	const handleEnterPage = () => {
		dispath('enterPage');
		defaultTextState = true
		searchNav(true);
		openeningText = ""
	};

</script>


<div class="emailSectionArea">
<div class="imgScanSection">
	<div class="emailRequestSection">
		<div class="ScanlyticsText">
			<img src="logow1.png" alt="Scanlytics" class="scanlyticsLogo">
			<p>Scanlytics</p>
		</div>
		<div class="placeholderObjecttext">
			<p>Conversational AI Assistant</p>
		</div>
		<div class="subTextEmailRequestArea">
			<div class="subtTextContent">
				<p>Bruno v.0.3</p>
			</div>
		</div>
		
		<div class="avatarcanvas">
		
			<div class="aibotAvatar">
				
				{#if brunoTextLoadingState }
				<div class="avatarTextArea"
				style="width: {!defaultTextState
				? '140%'
				: '120%'};
				height: {!defaultTextState
				? '80%'
				: '30%'};
				top: {!defaultTextState
				? '1%'
				: '30%'};"
				
				> 
					{#if defaultTextState}
					<div class="avatarTextContent">
						{avatarScriptText}
					</div>
					{:else}
					<div class="avatarTextContent"
					style="height: {!defaultTextState
						? '86%'
						: '80%'};"
					>
						
						{avatarScriptTonText}
					</div>
					{/if}
				

					{#if enableViewTone}
					<!-- <div class="audioSet"
					style="height: {!defaultTextState
					? '14%'
					: '20%'};"
					>

						<button class="tonOffBtn" on:click={handleToneOn}>

							{#if ToneBtnState}
								
							<img src="tonoff.png" alt="Scanlytics" class="tonOffIcon">

							{:else}
							<img src="tonon.png" alt="Scanlytics" class="tonOffIcon">

							{/if}
						</button>
						
					</div> -->
					{/if}
					
				</div>
				{/if}


				<div class="avatarArea "
				
				style="top: {!defaultTextState
				? '-30%'
				: '0%'}"
				>
					<canvas bind:this={canvas} class="avater"/>
				</div>
				

				
				
			</div>
		</div>
		<div class="loadingArea" hidden>
			<!-- <Pulse size="90"  unit="px" /> -->
			 
			<GuideWavesurfer/>
		</div>
		
		


		
		<div>
			<button class="StartBtn" on:click={handleEnterPage}>S T A R T</button>
		</div>

		
	</div>
	
</div>

</div>

<style>
    .emailSectionArea {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* padding-bottom: 6%; */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.imgScanSection {
		background-color: #0d1117;
		/* background-color: #63646238; */
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatarcanvas{
		/* background-color: pink; */
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.avatarArea{
		width: 100%;
		height: 100%;
		position: relative;
		top: 0%;
		left: -10%;
	}

	.loadingArea{
		position: absolute;
		width: 10%;
		height: 10%;
		/* background-color: #fff; */
		top: 90%;
		/* left: 45%; */
		display: none;
		justify-content: center;
		align-items: center;
		

	}
	.audioSet{
	 /* background-color: #ffffff08; */
	 /* position: absolute; */
	 width: 100%;
	 height: 20%;
	 display: flex;
	 justify-content: flex-end;
	 align-items: center;
	 padding-right: 2%;
	 padding-bottom: 1%;
	 /* top: 86%; */
	 /* left: 85%; */
	}

	.tonOffBtn{
		width: 15%;
		height: 100%;
	
		background-color: rgba(250, 235, 215, 0);
		
		cursor: pointer;
		background: none;
		/* border: none; */
		/* padding: 1; */
		margin: 0;
		font: inherit;
		color: inherit;
		
	}

	.tonOffIcon{
		width: 100%;
		height: 100%;
	}

	.aibotAvatar{
		/* background-color: rgba(226, 17, 52, 0.619); */
		width: 15%;
		height: 60%;
		/* margin-top: 39%; */
		position: absolute;
		top: 40%;
		left: 20%;
		z-index: -0;
	}

	@keyframes upDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
	.avatarTextArea{
		width: 100%;
		height: 28%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		color: white;
		padding: 2%;
		/* font-size: 20px; */
		position: relative;
		top: 30%;
		left: -25%;
		z-index: 5;
		animation: upDown 2s ease-in-out infinite;
		flex-direction: column;

	}

	.avatarTextContent{
		/* background-color: green; */
		width: 100%;
		height: 80%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}



	.avater{
		width: 50%;
		height: 10%;
	}
	.emailRequestSection {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 7%;
		position: relative;
		/* background-color: green; */

		padding-bottom: 5%;
	}


	.ScanlyticsText{
		width: 100%;
		height: 10%;
		font-size: 105px;
		font-weight: bold;
		font-family: sans-serif;
		text-align: center;
		color: rgba(220, 215, 215, 0.403);
		align-items: center;
		position: relative;
		z-index: 5;
		display: flex;
		/* background-color: #fff; */
		justify-content: center;
	}

	.scanlyticsLogo{
		width: 6%;
		height: 100%;
		/* background-color: #fff; */
	}
	.placeholderObjecttext {
		font-size: 105px;
		font-weight: bold;
		font-family: sans-serif;
		text-align: center;
		/* background-color: blue; */

		color: rgba(220, 215, 215, 0.403);
		position: relative;
		z-index: 5;
	}

	.subTextEmailRequestArea {
		font-size: 35px;
		font-weight: bold;
		font-family: sans-serif;
		color: rgba(220, 215, 215, 0.403);
	}

	.subtTextContent{
		position: relative;
		z-index: 5;
	}
	.StartBtn {
		height: 50px;
		width: 300px;
		background-color: rgba(202, 202, 202, 0.045);
		border: 1px solid rgb(49, 48, 48);
		border-radius: 7px;
		color: rgb(210, 206, 206);
		font-family: sans-serif;
		font-weight: bold;
		font-size: 19px;
		cursor: pointer;
		position: relative;
		z-index: 5;
	}

	.StartBtn:hover {
		background-color: rgba(254, 127, 0, 0.767);
		border: 1px solid black;
		color: black;
	}

	/* .emailInputContent {
		width: 500px;
		height: 40px;
		border-radius: 50px;
		background-color: #72717121;
		border: 1px solid white;
		color: white;
		text-align: center;
	} */

	@media (max-width: 420px) {
		.emailRequestSection {
			min-height: 99svh;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			/* position: relative; */
		}
		.placeholderObjecttext {
			min-height: 50svh;
			font-size: 65px;
			font-weight: bold;
			font-family: sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;

			color: rgba(247, 244, 244, 0.522);
		}

		.subTextEmailRequestArea {
			min-height: 32svh;
			width: 80%;
			font-size: 31px;
			font-weight: bold;
			font-family: sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			position: relative;
			z-index: 4;
			/* background-color: #fff; */
			color: rgba(220, 215, 215, 0.403);
		}
	}
</style>
