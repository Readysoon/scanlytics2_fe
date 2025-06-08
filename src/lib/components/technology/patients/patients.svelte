<script lang="ts">
	import * as patientJson from '../../../../../static/patientContent.json';

	import { createEventDispatcher } from 'svelte';
	import { Application } from '@splinetool/runtime';
	import { getWaveaudiAuto } from '../guideWavesurfer.svelte';

	import GuideWavesurfer from '../guideWavesurfer.svelte';

	let canvas: any;
	let loading: boolean = true;
	let userName: string = $state('');
	let openeningText: string = $state('');
	let index = 0;
	let avatarScriptText: string = $state('');
	let brunoTextLoadingState = $state(false);
	let addIcon = $state(false);
	let textState = $state(false);
	let toggleAudioDefaultBtn = $state(false);
	let audioUrl = $state('');
	let defaultPlayState = $state(false);
	let enableViewTone = $state(true);
	let defaultPatientTextState = $state(true);
	let ToneBtnState = $state(true);
	let nameToggleCheck = $state(false); //default false
	let btnState = $state(true);

	const dispath = createEventDispatcher();

	const handleRobotClick = () => {
		dispath('robot');
	};

	const handleUpdateText = (textData: string) => {
		const IntervalId = setInterval(() => {
			if (index < textData.length) {
				avatarScriptText += textData.charAt(index);

				index++;
			} else {
				clearInterval(IntervalId);

				addIcon = true;
			}
		}, 20);
	};
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
	};

	const handleToneOn = () => {
		ToneBtnState = !ToneBtnState;
		defaultPatientTextState = false;

		// handleTonOnUpdateText(updatedText)
	};

	// const handleUserInput = (userNamVal: string) => {
	// 	console.log('handleUserInput', userNamVal);

	// }

	const handleInput = () => {
		console.log('userName', userName);
		if (userName) {
			nameToggleCheck = true;
		}
	};

	const handleSubmit = () => {
		nameToggleCheck = true;
	};

	$effect(() => {
		if (nameToggleCheck) {
			let app = new Application(canvas);
			loading = true;
			const splineobj = app
				.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode')
				.then(() => {
					const obj = app.findObjectByName('brunov1');
					console.log('obj', obj);
					// if (obj?.position) {
					// Adjust position
					// 	console.log('iits in postion',obj?.position);
					// 	obj.position.x += 10;
					// 	obj.position.y = 50;
					// 	obj.position.z -= -15;
					// 	}
					brunoTextLoadingState = true;
					textState = true;
					loading = false;
					openeningText = `Freut mich, Sie kennenzulernen, Dr.${userName}. Bitte klicken Sie auf den Roboter-Button im blau markierten Patientenbereich unter dem Namen Ben Krause.`;
					handleUpdateText(openeningText);
					// if(!nameToggleCheck){

					// }
				});

			if (!defaultPatientTextState) {
				console.log('triggered in defaultTextState on patient ');

				handleTTSReq(openeningText);
				defaultPlayState = true;
			}
		}

		if (userName != '') {
			btnState = false;
		}
	});
</script>

<div class="medicalConversationArea">
	{#if !nameToggleCheck}
		<div class="namecheckoverLay">
			<div class="nameAskContainer">
				<div class="askforNameHeader">
					<p class="formUsermName">Bitte geben Sie Ihren Namen ein</p>
				</div>
				<div class="userNameInputSection">
					<input
						type="text"
						name=""
						id=""
						class="formInput"
						bind:value={userName}
						on:change={handleInput}
						placeholder="Nachname"
					/>
				</div>
				<div class="formBtnArea">
					<!-- nameToggleCheck -->

					<button
						class="sumbitBtn"
						on:click={handleSubmit}
						disabled={btnState}
						style="color: {userName != '' ? 'white' : 'grey'}">Bestätigen</button
					>
				</div>
			</div>
		</div>
	{/if}

	<div class="imgScanSection">
		<div class="medicalAIImageContent">
			<!-- Header Section -->
			<div class="patientHeaderSection">
				{#if patientJson}
					<div class="patientHeaderId">{patientJson.patientHeader.IDHead}</div>
					<div class="patientHeaderDate">{patientJson.patientHeader.TimeHead}</div>

					<div class="patientHeaderName">{patientJson.patientHeader.vorNameHead}</div>
					<div class="patientHeaderName">{patientJson.patientHeader.NameHead}</div>
					<div class="patientHeaderStatus">{patientJson.patientHeader.StatusHead}</div>
					<div class="patientHeaderUntersuchung">{patientJson.patientHeader.UntersuchungHead}</div>
					<div class="patientHeaderPatientenInformationen">
						{patientJson.patientHeader.Patienteninformationen}
					</div>

					<div class="patientHeaderBericht">{patientJson.patientHeader.berichtHead}</div>
					<div class="patientHeaderFunktionen">{patientJson.patientHeader.Funktionen}</div>
				{/if}
			</div>

			<!-- Content Section -->
			<div class="patientContentSection">
				{#each patientJson.patientContent as patientData (patientData)}
					<div
						class="patientContent"
						style="border-color: {patientData.ID >= 9 && patientData.ID <= 9
							? 'rgba(4, 163, 249, 0.911)'
							: 'black'};
				background-color: {patientData.ID >= 9 && patientData.ID <= 9 ? 'rgba(4, 163, 249, 0.19)' : 'none'};
				}
				"
					>
						<div class="patientId">
							{patientData.ID}
						</div>
						<div class="patientDate">
							<div>{patientData.Time}</div>
						</div>
						<div class="patientName">
							{patientData.vorName}
						</div>
						<div class="patientName">
							{patientData.Name}
						</div>

						<div class="patientStatus">
							{#if patientData.ID >= 0 && patientData.ID <= 8}
								<img src="happy.png" alt="widget" class="emotionLogo" />
							{:else if patientData.ID >= 9 && patientData.ID <= 9}
								<img src="sad.png" alt="widget" class="emotionLogo" />
							{:else if patientData.ID >= 10 && patientData.ID <= 13}
								<img src="open.png" alt="widget" class="emotionLogo" />
							{/if}
						</div>

						<div class="patientUntersuchung">
							{patientData.Untersuchung}
						</div>

						<div class="patientInformationen">
							<div>
								<img src="akte.png" alt="widget" class="widgetlogoStructuredReport" />
							</div>
							<div>
								<img src="klamm.png" alt="widget" class="widgetlogoKlammer" />
							</div>
							<div class="widgetlogoZeichen">
								<img src="zeich.png" alt="widget" class="widgetlogoZeichenIcon" />
							</div>
						</div>

						<div class="fachArzt">
							<div>Dr. {userName}</div>
						</div>

						<div class="patientFunktionen">
							<div class="widgetlogoRobotSection" on:click={handleRobotClick}>
								<img src="robo2.png" alt="widget" class="widgetlogoRobot" />
								<!-- hello -->
							</div>

							<div class="widgetlogoAnalyseSection">
								<img src="analy.png" alt="widget" class="widgetlogoAnalyse" />
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Avatar Section -->
			<div class="avatarcanvas">
				{#if brunoTextLoadingState}
					<div class="avatarContentArea">
						<div class="avatarText">
							{avatarScriptText}
						</div>

						<div class="avatarNavIcon">
							{#if addIcon}
								<div class="fingerLogoArea">
									<img src="finger.png" alt="widget" class="fingerIcon" />
									<img src="robo2.png" alt="widget" class="TextLogoRobot" />
								</div>
							{/if}
						</div>
						<!-- {#if enableViewTone}
					<div class="audioSet"
					
					>

						<button class="tonOffBtn" on:click={handleToneOn}>

							{#if ToneBtnState}
								
							<img src="tonoff.png" alt="Scanlytics" class="tonOffIcon">

							{:else}
							<img src="tonon.png" alt="Scanlytics" class="tonOffIcon">

							{/if}
						</button>
						
					</div>
					{/if} -->
					</div>
				{/if}
				<div class="aibotAvatar">
					<canvas bind:this={canvas} class="avater" />
				</div>
			</div>

			<dir class="loadingPlayAudioArea">
				<!-- <GuideWavesurfer/> -->
			</dir>
		</div>
	</div>
</div>

<style>
	.medicalConversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;

		border: 1px solid rgba(255, 255, 255, 0.175);
		/* padding: 0.5%; */
		/* padding-top: 0.51%;# */
	}

	.namecheckoverLay {
		background-color: rgba(24, 24, 24, 0.897);
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: 20;
		top: 0;
		left: 0;
		/* color: white; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nameAskContainer {
		width: 20%;
		height: 20%;
		background-color: #0d1117;

		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
	}

	.askforNameHeader {
		height: 20%;
		width: 100%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		align-items: center;
		background-color: rgba(71, 68, 68, 0.175);
		padding-left: 2%;
	}

	.formUsermName {
		color: rgb(165, 158, 158);
		font-family: system-ui;
		font-size: 20px;
		font-weight: 700;
	}

	.userNameInputSection {
		height: 50%;
		width: 100%;
		/* background-color: #ffffff2b; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.formInput {
		width: 70%;
		height: 33%;
		border-radius: 7px;
		font-size: 20px;
		padding-left: 2%;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}

	.formBtnArea {
		height: 25%;
		width: 100%;
		/* background: rgba(255, 166, 0, 0.151); */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.sumbitBtn {
		width: 50%;
		height: 60%;
		background: rgb(174, 174, 176);
		cursor: pointer;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		font-size: 19px;
		font-weight: 700;
		color: #0d1117;
	}

	.imgScanSection {
		/* background-color: rgba(245, 222, 179, 0.181); */
		background-color: #0d1117;

		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 0.5%;
		/* border-top: 1px solid rgba(255, 255, 255, 0.175); */

		/* border: 1px solid rgba(255, 255, 255, 0.379); */
	}

	.medicalAIImageContent {
		height: 100%;
		width: 100%;
		display: flex;
		color: white;
		flex-direction: column;
		position: relative;
		/* gap: 2%; */
		/* padding-top: 1%; */
	}

	.loadingPlayAudioArea {
		position: absolute;

		width: 30%;
		height: 5%;
		background-color: #ffffff1e;
		top: 90%;
		/* left: 45%; */
		display: none;
		justify-content: center;
		align-items: center;
	}

	.avatarcanvas {
		/* background-color: pink; */
		position: absolute;
		height: 30%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 71%;
		left: 80%;
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

	.avatarContentArea {
		width: 100%;
		height: 50%;
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
		/* font-size: 20px; */
		position: absolute;
		top: -3%;
		left: -25%;
		z-index: 5;
		animation: upDown 2s ease-in-out infinite;
		padding: 3%;
	}

	.audioSet {
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
	.tonOffBtn {
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

	.tonOffIcon {
		width: 100%;
		height: 100%;
	}
	.avatarText {
		/* background-color: pink; */
		height: 70%;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1%;
	}

	.avatarNavIcon {
		/* background-color: rgb(197, 192, 255); */
		height: 20%;
		width: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fingerLogoArea {
		/* background-color: #fff; */
		width: 37%;
		/* position: absolute; */
		/* top: 65%; */
		/* left: 69%; */
		display: flex;
		gap: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.aibotAvatar {
		/* background-color: rgba(226, 17, 52, 0.619); */
		width: 100%;
		height: 90%;
		/* margin-top: 10%; */
		position: absolute;
		top: 20%;
		left: -5%;
		z-index: -0;
	}

	.topHeader {
		background-color: #2326281c;
		height: 2%;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.topHeaderItem {
		height: 50%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.patientHeaderSection {
		background-color: rgb(46, 47, 46);
		height: 4%;
		width: 100%;
		/* border-bottom: 1px solid white; */
		display: flex;
	}

	.patientContentSection {
		/* background: pink; */
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.9%;
	}

	.patientContent {
		display: flex;
		height: 4%;
		background-color: rgba(163, 163, 163, 0.268);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;

		/* flex-direction: column; */
	}

	.patientContent:hover {
		background-color: rgba(2, 101, 159, 0.619);
		cursor: pointer;
	}

	.patientHeaderId {
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderDate {
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderName {
		width: 10%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderStatus {
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderUntersuchung {
		width: 17%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderBericht {
		width: 15%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderPatientenInformationen {
		width: 17%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderFunktionen {
		width: 16%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: system-ui;
	}

	/* Patient Content Values */
	.patientId {
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;
	}

	.patientDate {
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;
	}

	.patientName {
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;
	}

	.patientStatus {
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientUntersuchung {
		width: 17%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;
	}

	.fachArzt {
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		display: flex;
		justify-content: center;
		font-size: 0.8rem;
	}

	.patientInformationen {
		width: 17%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientFunktionen {
		width: 16%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-family: system-ui;
		gap: 10%;
		padding-right: 1%;
	}

	.widgetlogoRobotSection {
		height: 100%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fingerIcon {
		height: 10%;
		width: 30%;
	}

	.TextLogoRobot {
		/* background-color: aqua; */
		height: 10%;
		width: 30%;
	}

	.widgetlogoAnalyseSection {
		height: 100%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.widgetlogoStructuredReport {
		height: 30%;
		width: 40%;
		opacity: 0.8;
		cursor: pointer;
	}

	.widgetlogoKlammer {
		height: 30%;
		width: 30%;
		opacity: 0.8;
		cursor: pointer;
	}
	.widgetlogoZeichen {
		height: 100%;
		width: 100%;
		opacity: 0.8;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.widgetlogoZeichen {
		width: 6.5%;
		cursor: pointer;
	}

	.widgetlogoRobot {
		height: 80%;
		width: 80%;
		opacity: 0.8;
		cursor: pointer;
	}

	.widgetlogoAnalyse {
		height: 70%;
		width: 70%;
		opacity: 0.8;
		cursor: pointer;
	}

	.emotionLogo {
		height: 50%;
		width: 20%;
	}

	/* Mobile Devices */
	@media (min-width: 320px) and (max-width: 460px) {
		.namecheckoverLay {
			background-color: rgba(24, 24, 24, 0.897);
			/* background-color: orange; */
			background-color: rgba(0, 0, 0, 0.982);

			position: absolute;
			width: 100vw;
			height: 100vh;
			z-index: 20;
			top: 0;
			left: 0;
			/* color: white; */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nameAskContainer {
			width: 30%;
			height: 30%;
			background-color: #0d1117;
			display: none;

			border: 1px solid rgba(255, 255, 255, 0.175);
			border-radius: 7px;
		}
			.minusBtnIcon {
		height: 100%;
		width: 25%;
	}
	}
	/* Tablet or small screens */
	@media (min-width: 768px) {
		.namecheckoverLay {
			background-color: rgba(24, 24, 24, 0.897);
			/* background-color: rgba(0, 0, 0, 0.982); */
			/* background-color: rgba(255, 192, 203, 0.992); */
			position: absolute;
			width: 100vw;
			height: 100vh;
			z-index: 20;
			top: 0;
			left: 0;
			/* color: white; */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nameAskContainer {
			width: 60%;
			height: 30%;
			background-color: #0d1117;
			/* display: none; */

			border: 1px solid rgba(255, 255, 255, 0.175);
			border-radius: 7px;
		}
		.askforNameHeader {
			height: 20%;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
			display: flex;
			align-items: center;
			background-color: rgba(71, 68, 68, 0.175);
			padding-left: 2%;
		}

		.formUsermName {
			color: rgb(165, 158, 158);
			font-family: system-ui;
			font-size: 18px;
			font-weight: 700;
		}

		.userNameInputSection {
			height: 50%;
			width: 100%;
			/* background-color: #ffffff2b; */
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.formInput {
			width: 70%;
			height: 30%;
			border-radius: 7px;
			font-size: 20px;
			/* padding-left: 2%; */
			background-color: rgb(255, 255, 255);
			font-family:
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				'Open Sans',
				'Helvetica Neue',
				sans-serif;
		}
		.formBtnArea {
			height: 25%;
			width: 100%;
			/* background: rgba(255, 166, 0, 0.151); */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.sumbitBtn {
			width: 50%;
			height: 60%;
			/* background: rgba(170, 170, 187, 0.852); */
			background-color: rgba(3, 134, 209, 0.619);
			cursor: pointer;
			font-family: system-ui;
			font-weight: 700;
			color: #ffffffe1;
			border-radius: 7px;
		}


	

	}

	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {
		/* Form Style */
		.namecheckoverLay {
			background-color: rgba(24, 24, 24, 0.897);
			/* background-color: rgba(255, 192, 203, 0.323); */
			position: absolute;
			width: 100vw;
			height: 100vh;
			z-index: 20;
			top: 0;
			left: 0;
			/* color: white; */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nameAskContainer {
			width: 30%;
			height: 30%;
			background-color: #0d1117;

			border: 1px solid rgba(255, 255, 255, 0.175);
			border-radius: 7px;
		}
		.askforNameHeader {
			height: 20%;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
			display: flex;
			align-items: center;
			background-color: rgba(71, 68, 68, 0.175);
			padding-left: 2%;
		}

		.formUsermName {
			color: rgb(165, 158, 158);
			font-family: system-ui;
			font-size: 15px;
			font-weight: 700;
		}

		.userNameInputSection {
			height: 50%;
			width: 100%;
			/* background-color: #ffffff2b; */
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.formInput {
			width: 70%;
			height: 30%;
			border-radius: 7px;
			font-size: 20px;
			/* padding-left: 2%; */
			background-color: rgb(255, 255, 255);
			font-family:
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				'Open Sans',
				'Helvetica Neue',
				sans-serif;
		}
		.formBtnArea {
			height: 25%;
			width: 100%;
			/* background: rgba(255, 166, 0, 0.151); */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.sumbitBtn {
			width: 50%;
			height: 60%;
			/* background: rgba(170, 170, 187, 0.852); */
			background-color: rgba(3, 134, 209, 0.619);
			cursor: pointer;
			font-family: system-ui;
			font-weight: 700;
			color: #ffffffe1;
			border-radius: 7px;
		}

		/* Patient List - Header */

		.patientHeaderSection {
			background-color: rgb(46, 47, 46);
			height: 5%;
			width: 100%;
			/* border-bottom: 1px solid white; */
			display: flex;
		}
		.patientHeaderId {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderDate {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderName {
			width: 10%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderStatus {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderUntersuchung {
			width: 17%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderBericht {
			width: 15%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderPatientenInformationen {
			width: 17%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 14px;
		}

		.patientHeaderFunktionen {
			width: 16%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: system-ui;
			font-size: 14px;
		}

		/* Patient List - Content */

		.patientContentSection {
			/* background: pink; */
			height: 95%;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1.9%;
		}
		.patientContent {
			display: flex;
			height: 4.5%;
			background-color: rgba(163, 163, 163, 0.268);
			border-top: 1px solid rgba(255, 255, 255, 0.175);
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;

			/* flex-direction: column; */
		}
		/*  Patient List - items */
		.patientId {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 0.8rem;
		}

		.patientDate {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 0.8rem;
		}

		.patientName {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 0.8rem;
		}

		.patientStatus {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
		}

		.patientUntersuchung {
			width: 17%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 0.8rem;
		}

		.fachArzt {
			width: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			display: flex;
			justify-content: center;
			font-size: 0.8rem;
		}

		.patientInformationen {
			width: 17%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
		}

		.patientFunktionen {
			width: 16%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-family: system-ui;
			gap: 10%;
			padding-right: 1%;
		}

		/* Avatar Area  */

		.avatarcanvas {
			/* background-color: pink; */
			position: absolute;
			height: 30%;
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 71%;
			left: 80%;
		}
		.avatarContentArea {
			width: 100%;
			height: 80%;
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
			/* font-size: 20px; */
			position: absolute;
			top: -3%;
			left: -70%;
			z-index: 5;
			animation: upDown 2s ease-in-out infinite;
			padding: 3%;
		}
		.avatarText {
			/* background-color: pink; */
			height: 80%;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1%;
			font-size: 15px;
			font-family: system-ui;
		}
		.widgetlogoRobot {
		height: 80%;
		width: 100%;
		opacity: 0.8;
		cursor: pointer;
		/* background-color: orange; */
		}
	}

	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px) {
		.avatarcanvas {
			/* background-color: pink; */
			position: absolute;
			height: 30%;
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 71%;
			left: 80%;
		}
		.avatarContentArea {
			width: 100%;
			height: 70%;
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
			/* font-size: 20px; */
			position: absolute;
			top: -10%;
			left: -70%;
			z-index: 5;
			animation: upDown 2s ease-in-out infinite;
			padding: 3%;
		}
		.avatarText {
			/* background-color: pink; */
			height: 80%;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1%;
			font-size: 15px;
			font-family: system-ui;
		}
		
		.widgetlogoRobot {
		height: 80%;
		width: 100%;
		opacity: 0.8;
		cursor: pointer;
		/* background-color: orange; */
		}
	}

	/* Ultra-wide screens (e.g. 2560px) */
	@media (min-width: 2560px) {
		/* Form Style */
		.namecheckoverLay {
			background-color: rgba(24, 24, 24, 0.897);
			/* background-color: rgba(227, 4, 41, 0.323); */
			position: absolute;
			width: 100vw;
			height: 100vh;
			z-index: 20;
			top: 0;
			left: 0;
			/* color: white; */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.nameAskContainer {
			width: 30%;
			height: 30%;
			background-color: #0d1117;

			border: 1px solid rgba(255, 255, 255, 0.175);
			border-radius: 7px;
		}
		.askforNameHeader {
			height: 20%;
			width: 100%;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
			display: flex;
			align-items: center;
			background-color: rgba(71, 68, 68, 0.175);
			padding-left: 2%;
			
		}

		.formUsermName {
			color: rgb(165, 158, 158);
			font-family: system-ui;
			font-size: 20px;
			font-weight: 700;
		}

		.userNameInputSection {
			height: 50%;
			width: 100%;
			/* background-color: #ffffff2b; */
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.formInput {
			width: 70%;
			height: 30%;
			border-radius: 7px;
			font-size: 20px;
			/* padding-left: 2%; */
			background-color: rgb(255, 255, 255);
			font-family:
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				'Segoe UI',
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				'Open Sans',
				'Helvetica Neue',
				sans-serif;
		}
		.formBtnArea {
			height: 25%;
			width: 100%;
			/* background: rgba(255, 166, 0, 0.151); */
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.sumbitBtn {
			width: 50%;
			height: 60%;
			/* background: rgba(170, 170, 187, 0.852); */
			background-color: rgba(3, 134, 209, 0.619);
			cursor: pointer;
			font-family: system-ui;
			font-weight: 700;
			color: #ffffffe1;
			border-radius: 7px;
		}

		/* Patient List - Header */

		.patientHeaderSection {
			background-color: rgb(46, 47, 46);
			height: 5%;
			width: 100%;
			/* background-color: rgba(227, 4, 41, 0.323); */
			/* border-bottom: 1px solid white; */
			display: flex;
		}
		
		.patientHeaderId {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderDate {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderName {
			width: 10%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderStatus {
			width: 5%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderUntersuchung {
			width: 17%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderBericht {
			width: 15%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderPatientenInformationen {
			width: 17%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 18px;
		}

		.patientHeaderFunktionen {
			width: 16%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: system-ui;
			font-size: 18px;
		}

		/* Patient List - Content */
			/*  Patient List - items */
			.patientId {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 1rem;
			/* background-color: #fff; */
		}

		.patientDate {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 1rem
		}

		.patientName {
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 1rem
		}

		.patientStatus {
			width: 5%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
		}

		.patientUntersuchung {
			width: 17%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			font-size: 1rem
		}

		.fachArzt {
			width: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
			display: flex;
			justify-content: center;
			font-size: 1rem
		}

		.patientInformationen {
			width: 17%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-right: 1px solid rgba(255, 255, 255, 0.175);
			font-family: system-ui;
		}

		.patientFunktionen {
			width: 16%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-family: system-ui;
			gap: 10%;
			padding-right: 1%;
		}

		.patientContentSection {
			/* background: pink; */
			height: 95%;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1.9%;
		}
		.patientContent {
			display: flex;
			height: 4.5%;
			background-color: rgba(163, 163, 163, 0.268);
			border-top: 1px solid rgba(255, 255, 255, 0.175);
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;

			/* flex-direction: column; */
		}

		/* Avatar Area  */

		.avatarcanvas {
			/* background-color: pink; */
			position: absolute;
			height: 30%;
			width: 20%;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 71%;
			left: 80%;
		}
		.avatarContentArea {
			width: 80%;
			height: 50%;
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
			/* font-size: 20px; */
			position: absolute;
			top: -3%;
			left: -0%;
			z-index: 5;
			animation: upDown 2s ease-in-out infinite;
			padding: 3%;
		}
		.avatarText {
			/* background-color: pink; */
			height: 80%;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 1%;
			font-size: 15px;
			font-family: system-ui;
		}
	}
</style>
