<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';

	let innerHeight: any;
	let innerWidth: any;
	let isMobile = false;

	// Function to check if device is mobile
	function checkIfMobile() {
		isMobile = innerWidth <= 1024;
	}

	onMount(() => {
		checkIfMobile();
	});

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

	// Update isMobile when window resizes
	$: if (innerWidth) {
		checkIfMobile();
	}

	function redirectUser(){ 
		window.location.href = 'https://calendly.com/tobias-wedel-code/30min';
	}

	function redirectTechnologyPage (){
		window.location.href = '/Technology/';
	}
	
</script>

<svelte:window bind:innerHeight={innerHeight} bind:innerWidth={innerWidth} />

<head>
	<title>Scanlytics</title>
</head>

<main>
	<Header />
	<div class="mainSection">+
		<!-- Headers  -->

		<div class="mainSectionLeftHeader">
			<p class="Best">Worlds fastest structured reporting</p>

			<p class="AIaaS">AI as a Service</p>
		</div>


		<!-- Gif Image - Positioned differently on mobile vs desktop -->
		<div class="mainSectionRight" class:mobile-image={isMobile}>
			<img src="head-MRI-SCHWARZ.gif" alt="Brain GIF" class="brain-gif" />
		</div>

		<div class="mainSectionLeft" class:mobile-content={isMobile}>

			<!-- Middle Area -->
			<div class="mainSectionLeftText">
				
				<div class="mainSectionLeftTextTitle">Revolutionizing Medical Reporting with AI</div>

				<div class="mainSectionLeftTextSubtext">
					Building the future of structured reporting with our conversational AI. 
					<br>
					Visit our Technology Page to try yourself or book directly a Call with us. 
				</div>

			</div>


			<!-- Button Area of left main section -->
			<div class="mainSectionButtons" class:mobile-buttons={isMobile}>
				<div class="ButtonSection">
					<button class="Button call" on:click={redirectUser}>
						<a href="https://calendly.com/tobias-wedel-code/30min" class="buttoncalltext">Book a Call</a>
					</button>

					<button class="Button tech" on:click={redirectTechnologyPage}>
						<a href="/Technology/" class="buttontechtext">Technology</a>
					</button>
				</div>
			</div>

		</div>
	</div>

	<Footer />
</main>


<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* overflow: hidden  !important; */
	}

	a {
		text-decoration: none;
		color: rgb(77, 77, 77);
		font-weight: 500;
		font-family: system-ui;
	}

	.mainSection {
		height: 77%;
		margin-top: 30px;
		position: relative;
	}

	.mainSectionLeft {
		display: flex;
		flex-direction: column;
		width: 70%;
		min-height: 100%;
		position: relative;
		z-index: 2;
		justify-content: space-between;
	}

	.mainSectionRight {
		width: 50%;
		position: absolute;
		top: 11%;
		right: 0;
		opacity: 0.8;
		z-index: 1;
	}

	.brain-gif {
		width: 70%;
		height: auto;
	}

	.mainSectionLeftHeader {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: relative;
		z-index: 3;
	}

	.mainSectionLeftHeader .Best{
		background-color: rgb(255, 255, 255);
		width: 300px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		margin-left: 1%;
	}

	.mainSectionLeftHeader .AIaaS{
		background-color: rgb(70, 102, 135);
		width: auto;
		padding: 0 20px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: rgb(255, 255, 255);
		margin-right: 5%;
		margin-left: 1%;
	}

	.mainSectionLeftText{
		width: 100%;
		height: 86%;
	}
	
	.mainSectionLeftTextTitle {
		width: 70%;
		height: 100%;
		font-size: clamp(6vw, 6vw, 6vw);
		text-align: left;
		font-family: system-ui;
		color: white;
	}

	.mainSectionLeftTextSubtext {
		width: 70%;
		height: 20%;
		color: white;
		padding: 1%;
		font-family: system-ui;
	}

	.mainSectionButtons {
		width: 70%;
		height: 7%;
		color: rgb(48, 48, 48);
		padding: 1%;
	}

	.mainSectionButtons.mobile-buttons{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.ButtonSection {
		width: 70%;
		height: 100%;
		color: rgb(48, 48, 48);
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: flex-start;
		gap: 5%;
	}

	.Button {
		width: 200px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40px;
		color: black;
		cursor: pointer;
		text-align: center;
	}

	.Button.call {
		background-color: black;
		border: 1px solid white;
	}

	.Button.tech {
		background-color: rgb(255, 255, 255);
		border: 1px solid black;
	}

	.buttontechtext, .buttoncalltext {
		text-align: center;
		display: block;
		font-size: 18px;
		font-weight: bold;
		font-family: system-ui;  
	}

	.buttontechtext {
		color: rgb(0, 0, 0);
	}
	
	.buttoncalltext {
		color: rgb(255, 255, 255);
	}

	/* Mobile styles */
	.mobile-buttons {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-top: 30px;
		padding: 0 20px;
	}

	@media (max-width: 1024px) {
		/* Force content to be scrollable */
		:global(body) {
			overflow-y: auto !important;
		}
		
		main {
			height: auto !important;
			min-height: 100vh;
			overflow-y: auto !important;
		}

		.mainSection {
			height: auto !important;
			overflow: visible !important;
			min-height: 80vh;
			display: flex;
			flex-direction: column;
		}

		.mobile-content {
			width: 100%;
			padding: 10px;
			position: relative;
			z-index: 5;
		}

		.mainSectionLeftHeader {
			justify-content: flex-end;
			padding-right: 0px;
		}

		.mainSectionLeftHeader .Best {
			display: none;
		}

		.mobile-image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0.4;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.mobile-image .brain-gif {
			width: 100%;
			height: auto;
			object-fit: cover;
		}

		.mainSectionLeftTextSubtext {
			width: 100%;
			height: auto;
			padding: 0;
			margin-top: 20px;
			font-size: 20px;
			line-height: 1.5;
		}

		.mainSectionLeftTextTitle {
			width: 100%;
			height: auto;
			font-size: 50px;
			text-align: left;
			font-family: system-ui;
			color: white;
		}

		.mainSectionLeftText {
			height: auto;
		}

		.ButtonSection {
			flex-direction: column;
		}

		.Button.call {
			margin-bottom: 20px;
		}


		.Button {
			height: 40px;
			width: 300px;
			display: flex;
			flex-direction: column;
		}

		.buttoncalltext {
			text-align: center;
		}

		.buttontechtext {
			text-align: center;
		}
	}
</style>
