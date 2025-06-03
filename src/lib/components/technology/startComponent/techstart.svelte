<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { searchNav } from '../navigation/navigation.svelte';
	const dispath = createEventDispatcher();
	import { Application } from '@splinetool/runtime';
	import { Pulse } from 'svelte-loading-spinners';

	let canvas: any;
	let loading: boolean = true;
	let openeningText: string = "Welcome to the Scanlytics Conversational AI Assistant. My name is Bruno, and I’m your AI guide. Please press “Start” to begin the reporting process."
	let index =  $state(0) 
	let avatarScriptText: string = $state("")
	let textState = $state(false)
	

	const handleUpdateText = () => {


		const IntervalId = setInterval(() => { 
			
			if(index < openeningText.length){
			avatarScriptText += openeningText.charAt(index);
			
			index++;
			textState = true 
		
			}else{
				clearInterval(IntervalId)
			}
		}, 100)
	
}


	$effect(() => {
		console.log('trigget in effect');
		let app = new Application(canvas);

		console.log('');
		loading = true;
		const splineobj = app.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode').then(() => {
			const obj = app.findObjectByName("brunov1")
			console.log('obj', obj);
			
			loading = false;
		});

	
		if(textState == false){
			handleUpdateText()
		}
		



	});


	const handleEnterPage = () => {
		dispath('enterPage');
		searchNav(true);
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
				
				<div class="avatarText"> 
					{avatarScriptText}
					
				</div>
				<canvas bind:this={canvas} class="avater"/>
				
				
			</div>
		</div>
		<div class="loadingArea">
			<!-- <Pulse size="90"  unit="px" /> -->
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

	.loadingArea{
		position: absolute;
		width: 10%;
		height: 10%;
		/* background-color: #fff; */
		top: 90%;
		/* left: 45%; */
		display: flex;
		justify-content: center;
		align-items: center;
		

	}

	.aibotAvatar{
		/* background-color: rgba(226, 17, 52, 0.619); */
		width:  10%;
		height: 30%;
		/* margin-top: 39%; */
		position: absolute;
		top: 70%;
		left: 80%;
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
	.avatarText{
		width: 120%;
		height: 40%;
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

	}



	.avater{
		width: 20%;
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
