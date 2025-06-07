<script lang="ts">
	import { SyncLoader } from 'svelte-loading-spinners';
	import { BarLoader } from 'svelte-loading-spinners';
	import { RingLoader } from 'svelte-loading-spinners';
	import { ScaleOut } from 'svelte-loading-spinners';
	import * as kneejsonData from '../../../../../static/knee.json';
	import * as scanQuestion from '../../../../../static/scanQuestion.json';
	import { createEventDispatcher } from 'svelte';
	import { closeNav } from '../navigation/navigation.svelte';
	import { handleSelectedQuestions } from '../selectedQuestions/selectedQuestions.svelte';
	import { SelectedQuestionAI } from '../../../../routes/(public)/Technology/+page.svelte';
	import { Application } from '@splinetool/runtime';
	let canvas: any;
	let loading: boolean = true;

	let resultAreaToggle = $state(false);
	let loadingToggle = $state(false);
	let scanToggle = $state(false);
	let selectedArr: number[] = $state([]);
	let questionList: any = $state([]);
	let findingsList: any = $state([]);
	let StartreportToggle = $state(false);
	let questionNum: number = $state(0);
	let countquestionLength = $state(0);
	let loadArrtracker: number[] = $state([]);
	let scanIconToggle = $state(false);
	let selectedQuestionState = $state(true);
	let showStartBtn = $state(false);
	const dispath = createEventDispatcher();
	let openeningText: string =
		'Click the Scan button to begin scanning the report and select your required questions.';
	let index = 0;
	let avatarScriptText: string = $state('');
	let brunoTextLoadingState = $state(false);
	let ShowBrunoState = $state(true);
	let val = $state(0);

	let scanPercentState = $state(0);

	let questionData = $state(scanQuestion);
	const questionDataSections = questionData.sections[0].questions;
	const questionLength = questionDataSections.map((item: any) => item.id);
	countquestionLength = questionLength.length;

	const handleStartConversation = () => {
		// resultAreaToggle = true;
		loadingToggle = true;
		scanToggle = true;
	};

	const handleSelectedQuestion = (questionid: number) => {
		if (questionid >= 0) {
			// console.log('questionid',questionid);

			if (!selectedArr.includes(questionid)) {
				selectedArr.push(questionid);
				if (selectedArr.length > 3) {
					selectedArr.pop();
				}
			} else {
				selectedArr = selectedArr.filter((item: number) => item !== questionid);
			}
		}
	};

	const handleStartReporting = () => {
		StartreportToggle = true;
		resultAreaToggle = false;
		handleSelectedQuestions(selectedArr);
		SelectedQuestionAI(selectedArr);

		dispath('startReporting');
	};

	const updateProgressUI = (progressVal: any) => {
		// console.log('progressVal', progressVal);

		if (progressVal == 100) {
			val += countquestionLength;

			if (val <= 100) {
				for (let i = 0; i <= val; i++) {
					scanPercentState = i;
				}
			}
		}
	};
	const loadNextQuestion = () => {
		if (questionNum < countquestionLength) {
			let progress = 0;
			scanIconToggle = true;

			const progressInterval = setInterval(() => {
				progress++;

				if (progress >= 100) {
					updateProgressUI(progress);
					clearInterval(progressInterval);
					// console.log('questionNum', questionNum);
					loadArrtracker.push(questionNum);
					questionNum++;
					resultAreaToggle = true;

					if (questionNum == countquestionLength) {
						scanToggle = false;
						loadingToggle = false;
						scanIconToggle = false;
						showStartBtn = true;
					}

					loadNextQuestion();
				}
			}, 5);
		}
		// scanToggle = false;
	};

	const handleScanning = () => {
		ShowBrunoState = false;
		scanPercentState = 0;
		val = 0;
		loadArrtracker = [];
		questionNum = 0;
		showStartBtn = false;
		selectedArr = [];
		loadNextQuestion();
		closeNav(false);
	};

	const handleAutoTextFillOut = () => {
		const IntervalId = setInterval(() => {
			if (index < openeningText.length) {
				avatarScriptText += openeningText.charAt(index);

				index++;
			} else {
				clearInterval(IntervalId);
			}
		}, 50);
	};

	$effect(() => {
		if (selectedArr.length >= 3) {
			console.log('selectedArr', selectedArr);
			selectedQuestionState = false;
		}

		if (ShowBrunoState) {
			let app = new Application(canvas);

			loading = true;
			const splineobj = app
				.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode')
				.then(() => {
					const obj = app.findObjectByName('brunov1');

					loading = false;
					brunoTextLoadingState = true;
					handleAutoTextFillOut();
				});
		}
	});
</script>

<div class="medicalConversationArea">
	<div class="imgScanSection">
		<div class="medicalAIImageContent">
			{#if StartreportToggle}
				<div class="ReportListArea">
					<div class="ReportListSideBar">
						<div class="medicalResultBarListIcon">
							<img src="liste4.png" alt="widget" class="listeIcon" />
						</div>
						<div class="medicalResultBarselectedList">
							{#each questionData.sections as items (items)}
								{#if items.name == 'Findings'}
									{#each items.questions as question (question)}
										<div
											class="QuestionItem"
											style="border: {selectedArr.includes(question?.id)
												? '1px solid grey'
												: 'none'};
								opacity: {selectedArr.includes(question?.id) ? '1' : '0.5'};
								"
										>
											<div class="selectedQuestionItemId">
												<p>{question?.id}</p>
											</div>
										</div>
									{/each}
								{/if}
							{/each}
						</div>
						<div class="medicalResultBarListRecordVisualizer">
							<RingLoader size="30" color="white" unit="px" duration="1s" />
						</div>
					</div>
				</div>
			{:else}
				<div class="medicalAIImageArea" style="width: {resultAreaToggle ? '50%' : '100%'};">
					<div class="medicalImageSection">
						<img
							src="form.png"
							alt="widget"
							class="amnesebogen"
							style="width: {resultAreaToggle ? '60%' : '30%'};"
						/>
						{#if scanToggle}
							<div class="scan-line"></div>
						{/if}

						{#if !resultAreaToggle}
							<div class="avatarcanvas">
								{#if ShowBrunoState}
									{#if brunoTextLoadingState}
										<div class="avatarText">
											<!-- {avatarScriptText} -->

											Click the Scan button to begin scanning the report and select your required
											questions.
										</div>
									{/if}

									<div class="aibotAvatar">
										<canvas bind:this={canvas} class="avater" />
									</div>
								{/if}
							</div>
						{/if}
					</div>
					<div class="medicalImagebtnAreaSection" on:click={handleStartConversation}>
						{#if loadingToggle}
							<div class="scanningFormArea">
								<div class="scanningFormText">
									<p>{scanPercentState}%</p>
								</div>
								<div class="scannFormLoadSection">
									<BarLoader size="70" color="#FF3E00" unit="px" duration="1s" />
								</div>
							</div>
						{:else}
							<div class="startScanningArea" on:click={handleScanning}>
								<button class="startScanBtn">Start Scanning</button>
							</div>
						{/if}
					</div>
				</div>
			{/if}
			{#if resultAreaToggle}
				<div class="medicalResultArea">

					<!-- Question MiddleBar -->
					<div class="medicalResultBar">
						<div class="medicalResultBarListIcon">
							<img src="liste4.png" alt="widget" class="listeIcon" />
						</div>

						<div class="medicalResultQuestionList">
							{#each questionData.sections as items (items)}
								{#if items.name == 'Findings'}
									{#each items.questions as question (question)}
										{#if loadArrtracker.includes(question?.id)}
											<div
												class="QuestionItem"
												style="border: {selectedArr.includes(question?.id)
													? '1px solid grey'
													: 'none'};
							opacity: {selectedArr.includes(question?.id) ? '1' : '0.5'};
							"
											>
												<div class="selectedQuestionItemId">
													<p>{question?.id}</p>
												</div>
											</div>
										{/if}
									{/each}
								{/if}
							{/each}
						</div>
						<div class="medicalResultBarListRecordVisualizer">
							{#if scanIconToggle}
								<RingLoader size="30" color="#FF3E00" unit="px" duration="1s" />
							{:else}
								<img src="scan.png" alt="widget" class="scanIcon" />
							{/if}
						</div>
					</div>

					<!-- Question Area  -->
					<div class="medicalQuestionArea">
						<div class="medicalQuestionTitle">Scanned Questions</div>

						<div class="medicalQuestionList">
							{#each questionData.sections as items (items)}
								{#if items.name == 'Findings'}
									{#each items.questions as question (question)}
										{#if loadArrtracker.includes(question?.id)}
											<div
												class="medicalQuestionItem"
												on:click={() => handleSelectedQuestion(question?.id)}
											>
												<div class="medicalQuestionItemLabel">
													<p>{question.label}</p>
												</div>
												<div class="checkedIconArea">
													{#if selectedArr.includes(question?.id)}
														<img src="checked.png" alt="widget" class="checkedIcon" />
													{:else}
														<img src="nocheck.png" alt="widget" class="notcheckedIcon" />
													{/if}
												</div>
											</div>
										{/if}
									{/each}
								{/if}
							{/each}
						</div>

						<div
							class="startConversationArea"
							style="border-top: {showStartBtn ? '1px solid rgba(255, 255, 255, 0.175)' : 'none'};"
						>
							<!-- <div class="startConversationAreaBtn" >
					<button on:click={handleStartReporting} class="startConversationAreaBtnItem">Start Reporting</button>
				</div> -->

							{#if showStartBtn}
								<button
									class="startBtn"
									style="background-color: {selectedQuestionState
										? 'rgba(38, 38, 38, 0.262)'
										: 'rgba(17, 100, 243, 0.912)'}; 

				"
									on:click={handleStartReporting}
									disabled={selectedQuestionState}
								>
									{#if selectedQuestionState}
										Please select 3 questions
									{:else}
										Start Reporting
									{/if}
								</button>
							{:else}
								<!-- <ScaleOut size="30" color="white" unit="px" duration="1s" /> -->
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.medicalConversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
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
	.medicalAIImageContent {
		height: 100%;
		width: 100%;
		display: flex;
	}

	.medicalAIImageArea {
		height: 100%;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalImageSection {
		height: 95%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		/* background-color: aqua; */
	}
	.amnesebogen {
		width: 60%;
		height: 90%;
	}
	.medicalImagebtnAreaSection {
		/* background: #FF3E00; */
		/*  */
		height: 5%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalResultArea {
		height: 100%;
		width: 50%;
		display: flex;
		/* background: pink; */
	}

	.scan-line {
		position: absolute;
		/* top: 100%; */
		left: 0;
		width: 100%;
		height: 2px;
		background: #ff3e00;
		animation: scanDown 3s ease-in-out infinite;
		pointer-events: none;
	}
	@keyframes scanDown {
		0% {
			top: 5%;
		}
		50% {
			top: 0%;
		}
		100% {
			top: 99%;
		}
	}

	.scanningFormArea {
		/* background-color: #2f7bed; */
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.scanningFormText {
		height: 60%;
		width: 100%;
		/* background: green; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: 600;
		/* margin-bottom: 10px; */
		font-family: system-ui;
	}

	.scannFormLoadSection {
		height: 40%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.medicalResultBar {
		height: 100%;
		width: 5%;
		/* border-left: 1px solid rgba(255, 255, 255, 0.175); */
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		/* background: #FF3E00; */
	}

	.medicalResultBarListIcon {
		/* background: pink; */

		height: 5%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalResultBarselectedList {
		/* background: #FF3E00; */
		height: 90%;
		width: 100%;
		/* background-color: blue; */
		gap: 50px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.medicalResultQuestionList{
				/* background: #FF3E00; */
		height: 90%;
		width: 100%;
		/* background-color: blue; */
		gap: 50px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.medicalResultBarListRecordVisualizer {
		height: 5%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.listeIcon {
		height: 60%;
		width: 50%;
		opacity: 0.5;
	}
	.medicalQuestionArea {
		/* background: #FF3E00; */
		height: 100%;
		width: 95%;
	}

	.scanIcon {
		height: 60%;
		width: 50%;
		opacity: 0.5;
	}

	.medicalQuestionContainer {
		height: 100%;
		width: 100%;
		background-color: pink;
		display: flex;
		flex-direction: column;
	}
	.medicalQuestionTitle {
		height: 5%;
		width: 100%;
		/* background-color: red; */
		color: white;
		font-size: 20px;
		font-weight: 600;

		font-family: system-ui;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.startConversationArea {
		height: 5%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}
	.medicalQuestionList {
		height: 90%;
		width: 100%;
		/* background-color: blue; */
		gap: 50px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}
	.medicalQuestionItem {
		background: rgba(211, 211, 235, 0.105);
		/* background-color: #1d4b1d; */
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
		height: 4%;
		width: 80%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 10px;
		font-family: system-ui;
		border-radius: 7px;
		border: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	}

	.medicalQuestionItem:hover {
		background: rgba(211, 211, 235, 0.381);
	}

	.medicalQuestionItemId {
		height: 100%;
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalQuestionItemLabel {
		height: 100%;
		width: 94%;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		padding-left: 10px;
	}

	.QuestionItem {
		background: rgba(211, 211, 235, 0.105);
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
		height: 4%;
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 10px;
		font-family: system-ui;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	}

	.checkedIconArea {
		height: 100%;
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.checkedIcon {
		height: 50%;
		width: 50%;
		/* opacity: 0.5; */
	}

	.notcheckedIcon {
		height: 50%;
		width: 50%;
		opacity: 0.5;
	}

	/* Report  Area */

	.ReportListArea {
		height: 100%;
		width: 100%;
		display: flex;
		/* background: pink; */
	}

	.ReportListSideBar {
		height: 100%;
		width: 3%;
		/* border-left: 1px solid rgba(255, 255, 255, 0.175); */
		border-right: 1px solid rgba(255, 255, 255, 0.175);
	}

	.startConversationAreaText {
		/* background: #000; */
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: 600;
		font-family: system-ui;
		opacity: 0.5;
	}

	.startConversationAreaBtn {
		/* background: #FF3E00; */
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.startConversationAreaBtnItem {
		/* background: #095486; */
		background: #000;
		height: 60%;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 7px;
		color: white;

		cursor: pointer;
		font-family: system-ui;
		border: 1px solid rgba(255, 255, 255, 0.175);
	}

	.startBtn {
		height: 70%;
		width: 30%;
		/* border: 1px solid rgb(43, 121, 194); */
		border: 1px solid grey;
		border-radius: 7px;
		/* background-color: rgba(58, 139, 210, 0.262); */
		background-color: rgba(17, 100, 243, 0.912);
		font-family: system-ui;
		color: white;
		cursor: pointer;
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

	.avatarText {
		width: 100%;
		height: 35%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		/* font-size: 20px; */
		position: absolute;
		top: -3%;
		left: -25%;
		z-index: 5;
		color: white;
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
		z-index: -0;
	}

	.startScanningArea {
		/* background-color: pink; */
		height: 100%;
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.startScanBtn {
		height: 70%;
		width: 30%;
		/* border: 1px solid rgb(43, 121, 194); */
		border: 1px solid rgb(0, 0, 0);
		border-radius: 7px;
		/* background-color: rgba(58, 139, 210, 0.262); */
		/* background-color: rgba(17, 100, 243, 0.912); */
		background-color: rgba(254, 127, 0, 0.767);
		font-family: system-ui;
		color: rgb(11, 11, 11);
		cursor: pointer;
		font-weight: 600;
	}

	/* Mobile Devices */
	/* @media (min-width: 320px) and (max-width: 460px) {

	} */

	/* Tablet or small screens */
	/* @media (min-width: 768px){

	} */
	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {
		.startScanBtn {
			height: 80%;
			width: 30%;
			/* border: 1px solid rgb(43, 121, 194); */
			border: 1px solid rgb(0, 0, 0);
			border-radius: 7px;
			/* background-color: rgba(58, 139, 210, 0.262); */
			/* background-color: rgba(17, 100, 243, 0.912); */
			background-color: rgba(254, 127, 0, 0.767);
			font-family: system-ui;
			color: rgb(11, 11, 11);
			cursor: pointer;
			font-weight: 600;
			font-size: 12px;
		}
		/* Scanning btn */
		.scanningFormArea {
			/* background-color: #2f7bed; */
			height: 100%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.scanningFormText {
			height: 70%;
			width: 100%;
			/* background: green; */
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 12px;
			font-weight: 600;
			/* margin-bottom: 10px; */
			font-family: system-ui;
		}
		.scannFormLoadSection {
			height: 30%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.startScanningArea {
			/* background-color: pink; */
			height: 100%;
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		/* Avatar Style */
		.avatarText {
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
			font-size: 14px;
			position: absolute;
			top: -33%;
			left: -25%;
			z-index: 5;
			color: white;
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
			z-index: -0;
		}
		.medicalResultBarselectedList {
			/* background: #FF3E00; */
			height: 90%;
			width: 100%;

			/* background-color: blue; */
			gap: 5%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}

		.medicalResultQuestionList{
			/* background: #FF3E00; */
			height: 90%;
			width: 100%;

			/* background-color: blue; */
			gap: 5%;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
		}
		.QuestionItem {
			background: rgba(211, 211, 235, 0.105);
			/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
			height: 3.5%;
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 11px;
			font-weight: 400;
			margin-bottom: 10px;
			font-family: system-ui;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;
		}

		/* .selectedQuestionItemId{
			
			font-size: 10px;
		} */

		.medicalResultBarListRecordVisualizer {
			height: 5%;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid rgba(255, 255, 255, 0.175);
		}

		.listeIcon {
			height: 60%;
			width: 50%;
			opacity: 0.5;
		}
		.medicalQuestionArea {
			/* background: #FF3E00; */
			height: 100%;
			width: 95%;
		}
		.medicalQuestionTitle {
		height: 5%;
		width: 100%;
		/* background-color: red; */
		color: white;
		font-size: 20px;
		font-weight: 600;

		font-family: system-ui;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		}

		.medicalQuestionList {
		height: 90%;
		width: 100%;
		/* background-color: blue; */
		gap: 5%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}
		.medicalResultArea {
		height: 100%;
		width: 50%;
		display: flex;
		/* background: pink; */
	}

	.medicalQuestionItem {
		background: rgba(211, 211, 235, 0.105);
		/* background-color: #1d4b1d; */
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
		height: 3.5%;
		width: 80%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: white;
		font-size: 11.5px;
		font-weight: 400;
		margin-bottom: 10px;
		font-family: system-ui;
		border-radius: 7px;
		border: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	}
	.startBtn {
		height: 80%;
		width: 30%;
		/* border: 1px solid rgb(43, 121, 194); */
		border: 1px solid grey;
		border-radius: 7px;
		/* background-color: rgba(58, 139, 210, 0.262); */
		background-color: rgba(17, 100, 243, 0.912);
		font-family: system-ui;
		color: white;
		cursor: pointer;
		font-weight: 600;
		font-size: 12px;
	}

	}
	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px) {
	}
	@media (min-width: 2560px) {
	}
</style>
