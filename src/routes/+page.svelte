<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';

	let innerHeight: any;
	let innerWidth: any;
	let isMobile = false;

	// Function to check if device is mobile
	function checkIfMobile() {
		isMobile = innerWidth <= 768;
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

	<div class="mainSection">
		<!-- Gif Image - Positioned differently on mobile vs desktop -->
		<div class="rightContentSecitonInLeft" class:mobile-image={isMobile}>
			<img src="head-MRI-SCHWARZ.gif" alt="Brain GIF" class="brain-gif" />
		</div>

		<div class="mainLeftContentSection" class:mobile-content={isMobile}>
			<!-- Header  -->
			{#if !isMobile}
				<div class="headerMainContentSection">
					<div class="leftContentHeaderArea">
						<p>Worlds fastest Reporting Software</p>
					</div>
				</div>
			{/if}

			<!-- Middle Area -->
			<div class="middleMainContentSection">
				<div class="middleContentTitleArea">
					<div class="mainTitle">Revolutionizing Medical Reporting with AI</div>
				</div>

				<div class="middleContentSubTextArea">
					<div class="subtext">
						Mit Scanlytics revolutionieren wir die radiologische Befundung durch unsere innovative Konversations-KI. Als einziger Anbieter werden die daraus erstellten strukturierten Befunde direkt in dem üblichen PDF-Format gespeichert und können somit nahtlos in den radiologischen Workflow integriert werden. Der Fließtext geht dabei nicht verloren. Wir bieten 434 strukturierte Befunde für  CT,MRT, Röntgen und USG an und erstellen gerne an Ihre Befunde angepasste Vorlagen. Ob für radiologische Praxen, Krankenhäuser, Teleradiologie-Anbieter oder Forschungseinrichtungen – Scanlytics ist die Zukunft der effizienten Befundung.
					</div>
				</div>
			</div>

			<!-- Bottom Area of left main section -->
			{#if !isMobile}
				<div class="ButtomMainContentSection">
					<div class="leftBtnSection">
						<button class="leftBtn call" on:click={redirectUser}>
							<a href="https://calendly.com/tobias-wedel-code/30min" class="bookCalllable">Book a Call</a>
						</button>

						<button class="leftBtn tech" on:click={redirectTechnologyPage}>
							<a href="/Technology/" class="leftappointmentbtn">View Technology</a>
						</button>
					</div>
				</div>
			{/if}
			
			<!-- Desktop-only buttons -->
			{#if isMobile}
				<div class="mobile-buttons">
					<button class="mobile-btn" on:click={redirectUser}>
						<a href="https://calendly.com/tobias-wedel-code/30min" class="mobile-btn-text">Book a Call</a>
					</button>

					<button class="mobile-btn dark" on:click={redirectTechnologyPage}>
						<a href="/Technology/" class="mobile-btn-text white">View Technology</a>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<Footer />
</main>


<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow: hidden;
	}

	a {
		text-decoration: none;
		color: rgb(77, 77, 77);
		font-weight: 500;
		font-family: system-ui;
	}

	.bookCalllable {
		color: rgb(255, 255, 255);
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
	}

	.mainSection {
		height: 77%;
		margin-top: 30px;
		position: relative;
	}

	.mainLeftContentSection {
		width: 70%;
		height: 100%;
		position: relative;
		z-index: 2;
	}

	.rightContentSecitonInLeft {
		width: 1200px;
		position: absolute;
		top: 11%;
		left: 50%;
		opacity: 0.8;
		z-index: 1;
	}

	.brain-gif {
		width: 70%;
		height: 700px;
	}

	.headerMainContentSection {
		width: 100%;
		height: 7%;
		display: flex;
		align-items: center;
	}

	.leftContentHeaderArea {
		background-color: rgb(226, 241, 252);
		width: 300px;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		margin-left: 1%;
	}

	.middleMainContentSection{
		width: 100%;
		height: 86%;
	}

	.middleContentTitleArea {
		width: 100%;
		height: 80%;
	}

	.middleContentSubTextArea {
		width: 70%;
		height: 20%;
		color: white;
		padding: 1%;
	}
	
	.mainTitle {
		width: 70%;
		height: 100%;
		padding-left: 1%;
		font-size: clamp(6vw, 6vw, 6vw);
		font-family: system-ui;
		color: white;
	}

	.ButtomMainContentSection {
		width: 70%;
		height: 7%;
		color: rgb(48, 48, 48);
		padding: 1%;
	}

	.leftBtnSection {
		width: 70%;
		height: 100%;
		color: rgb(48, 48, 48);
		display: flex;
		align-items: center;
		gap: 5%;
	}

	.leftBtn.tech {
		background-color: rgb(255, 255, 255);
		width: 200px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		cursor: pointer;
	}

	.leftBtn.call {
		background-color: black;
		width: 200px;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid white;
		border-radius: 40px;
		color: black;
		cursor: pointer;
	}

	.leftappointmentbtn {
		color: rgb(0, 0, 0);
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
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

	.mobile-btn {
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 40px;
		border: 1px solid black;
		background-color: white;
		cursor: pointer;
	}

	.mobile-btn.dark {
		background-color: black;
		border: 1px solid white;
	}

	.mobile-btn-text {
		color: black;
		font-size: 16px;
		font-weight: 400;
		font-family: system-ui;
		text-decoration: none;
	}

	.mobile-btn-text.white {
		color: white;
	}

	@media (max-width: 768px) {
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
			padding: 20px;
			position: relative;
			z-index: 5;
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

		.mainTitle {
			font-size: 40px;
			width: 100%;
			height: auto;
			padding-left: 0;
			margin-top: 20px;
			line-height: 1.2;
		}

		.middleContentTitleArea {
			height: auto;
		}

		.middleContentSubTextArea {
			width: 100%;
			height: auto;
			padding: 0;
			margin-top: 20px;
		}

		.mainTitle {
			width: 100%;
			height: 100%;
			padding: 1rem;
			font-size: 50px;
			font-family: system-ui;
			color: white;
			
		}

		.subtext {
			font-size: 20px;
			line-height: 1.5;
		}

		.middleMainContentSection {
			height: auto;
		}
	}
</style>
