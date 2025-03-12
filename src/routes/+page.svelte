<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount, onDestroy } from 'svelte';

	let innerHeight: any;
	let innerWidth: any;

	onMount(() => {
	})

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
		<div class="mainLeftContentSection">

			<!-- Header  -->
			<div class="headerMainContentSection">
				<div class="leftContentHeaderArea">
					<p>Worlds fastest Reporting Software</p>
				</div>
			</div>

			<!-- Middle Area -->
			<div class="middleMainContentSection">
				<div class="middleContentTitleArea">
					<div class="mainTitle">Revolutionizing Medical Reporting with AI</div>
				</div>

				<div class="middleContentSubTextArea">
					<div class="subtext">
						Scanlytics is an AI-powered solution designed to streamline medical reporting, enhance
						efficiency, and empower healthcare professionals to spend more time with patients.
					</div>
				</div>

			</div>

			<!-- Buttom Area of left main section -->
			<div class="ButtomMainContentSection">
				<div class="leftBtnSection">
					<button class="leftBtn_1" on:click={redirectUser}><a href="https://calendly.com/tobias-wedel-code/30min" class="bookCalllable">Book a Call</a></button>

					<button class="leftBtn_2" on:click={redirectTechnologyPage}>
						<a href="/Technology/" class="leftappointmentbtn">View Technology</a>
					</button>
				</div>
			</div>
			
			<!-- Gif Image -->
			<div class="rightContentSecitonInLeft">
				<img src="head-MRI-SCHWARZ.gif" alt="Brain GIF" width="70%" height="700" />
				<!-- <img src="LNz.gif" alt="Brain GIF" width="70%" height="700" /> -->

			</div>
		</div>
	</div>

	<Footer />

</main>


<style>
	main {
    /* background-color: rgb(255, 254, 251); */
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* display: flex;
		flex-direction: column; */
		overflow: hidden;
	}

	a {
		text-decoration: none;
		color: rgb(77, 77, 77);
		font-weight: 500;
		font-family: system-ui;
	}

	.bookCalllable {
		color: black;
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
	}

	.mainSection {
		/* background-color: rgb(36, 34, 34); */
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		/* background-color: rgb(255, 23, 193); */
		width: 70%;
		height: 100%;
	}

	.rightContentSecitonInLeft {
		width: 1200px;
		position: absolute;
		top: 11%;
		left: 50%;
		opacity: 0.8;
		zindex: -3;
	}

	.headerMainContentSection {
		width: 100%;
		height: 7%;
		display: flex;
		align-items: center;
	}

	.leftContentHeaderArea {
		background-color: rgb(226, 241, 252);
		width: 20%;
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
		/* background-color: rgb(11, 139, 111); */

		width: 100%;
		height: 86%;
	}

	.middleContentTitleArea {
		/* background-color: rgb(139, 84, 11); */

		width: 100%;
		height: 80%;
	}

	.middleContentSubTextArea {
		/* background-color: rgb(29, 38, 44); */
		width: 70%;
		height: 20%;
		color: white;
		padding: 1%;
	}
	.mainTitle {
		/* background-color: rgb(37, 139, 11); */
		width: 70%;
		height: 100%;
		padding-left: 1%;
		font-size: 100px;
		font-family: system-ui;
		color: white;
	}

	.ButtomMainContentSection {
		/* background-color: rgb(139, 11, 11); */

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

	.leftBtn_1 {
		background-color: rgb(255, 255, 255);
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		cursor: pointer;
	}

	.leftBtn_2 {
		background-color: black;
		width: 30%;
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
		color: white;
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
	}

</style>
