<script lang="ts" module>
	let showMessagePopUp = $state(false)
	let newMessageNum = $state(0)

	export function handlepdfMessagePopuP(){
		showMessagePopUp = true 
		newMessageNum+=1
	}

</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AudioRecorder from '../audioRecorder.svelte';
	let {
		menuToggle,
		scansToggle,
		textEditToggle,
		recordState,
		audioData,
		audioTrackArrState,
		selectedQuestionNum
	} = $props();

	// AI Report Section Skript

	const dispath = createEventDispatcher();

	const handleMenuAIClick = () => {
		dispath('menuAIClick');
	};

	const handleMenuScansClick = () => {
		dispath('menuScansClick');
	};

	const handleMenuDownloadClick = () => {
		dispath('menuDownloadClick');
	};

	const handleTextEditorToggle = () => {
		dispath('textEditorToggle');
		showMessagePopUp = false
		newMessageNum = 0
	};

	const handleStartAI = () => {
		dispath('startAI');
	};

	function getColorByIndex(index: any) {
		console.log('index', index);
		if (index >= 0 && index <= 2) {
			return 'rgba(52, 255, 1, 0.837)'; // Green
		} else if (index >= 3 && index <= 5) {
			return 'orange';
		} else if (index >= 6 && index <= 7) {
			return 'red';
		}
	}
</script>

<!-- AI Report Section Component -->
<div class="aiNavBar">
	<div class="upperBar">
		<div class="optionBox" on:click={handleMenuAIClick}>
			{#if menuToggle}
				<img src="widget2.png" alt="widget" class="widgetlogo" />
				<p class="selectedMenuText">Menu</p>
			{:else}
				<img src="widget.png" alt="widget" class="widgetlogo" />
				<p class="defaultMenuText">Menu</p>
			{/if}
		</div>

		<div class="optionBox" on:click={handleMenuScansClick}>
			{#if scansToggle}
				<img src="/xr6.png" alt="widget" class="widgetlogo" />
				<p class="selectedMenuText">Scans</p>
			{:else}
				<img src="/xr5.png" alt="widget" class="widgetlogo" />
				<p class="defaultMenuText">Scans</p>
			{/if}
		</div>

		<div class="optionBox" on:click={handleMenuDownloadClick}>
			<img src="her1.png" alt="widget" class="widgetlogo" />
			<p class="defaultMenuText">Load</p>
		</div>

		<div class="optionBox" on:click={handleTextEditorToggle}>
			{#if showMessagePopUp}
			<div class="messagePopUp">{newMessageNum}</div>
			{/if}

			
			{#if textEditToggle}
				<img src="text1.png" alt="widget" class="widgetlogo" />
				<p class="selectedMenuText">Editor</p>
			{:else}
				<img src="text.png" alt="widget" class="widgetlogo" />
				<p class="defaultMenuText">Editor</p>
			{/if}
		</div>
	</div>
	<div class="middleBar">
		<div class="freq1">
			<div class="audioPort">
				{#if recordState}
					<img src="live.png" alt="widget" class="audioLogoON" />
				{:else}
					<img src="liveOff.png" alt="widget" class="audioLogoON" />
				{/if}
			</div>
			<div class="uvMeter">
				{#if audioData}
					{#each audioTrackArrState as item, index}
						<div
							class="audioStateObjStyle"
							style="background-color: {getColorByIndex(index)};
                        border-top: 1px solid rgba(255, 255, 255, 0.175)
                        "
						></div>
					{/each}
				{/if}
			</div>
			<div class="assistantPlayArea">
				<!-- Audio Recorder function -->
				<AudioRecorder selectedArr={selectedQuestionNum} />
			</div>
		</div>
	</div>
</div>

<!-- AI Report Section Component Styles -->
<style>
	.aiNavBar {
		height: 100%;
		width: 3%;
		background-color: #0d1117;
		/* border: 1px solid rgba(255, 255, 255, 0.175); */
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		flex-direction: column;
	}

	.upperBar {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		/* background-color: #fff; */
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.messagePopUp{
		width: 40%;
		height: 20%;
		border-radius: 50px;
		background-color: red;
		position: absolute;
		font-size: 9px;
		top: 19%;
		left: -1%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.optionBox {
		width: 80%;
		height: 14%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: white;
		font-family: sans-serif;
		gap: 8%;
		font-size: 11px;
		cursor: pointer;
		position: relative;
		/* background-color: pink; */
	}

	.widgetlogo {
		height: 25px;
	}

	.defaultMenuText {
		color: white;
	}

	.selectedMenuText {
		color: rgba(254, 127, 0, 0.767);
	}
	.middleBar {
		height: 50%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.freq1 {
		height: 98%;
		width: 80%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.audioPort {
		/* background-color: green; */
		height: 15%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.audioLogoON {
		height: 40%;
		width: 55%;
	}
	.uvMeter {
		height: 70%;
		width: 100%;
		border: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		/* background-color: #fff; */
	}

	.audioStateObjStyle {
		/* background-color: pink; */
		width: 100%;
		height: 10%;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		/* justify-content: flex-end; */
	}

	.assistantPlayArea {
		height: 15%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* border: 1px solid rgba(255, 255, 255, 0.175); */
		align-items: center;
		color: white;
		font-family: sans-serif;
		cursor: pointer;
		/* background-color: pink; */
		gap: 8%;
		font-size: 10px;
	}

	.microIcon {
		width: 60%;
		height: 40%;
	}

	/* Mobile Devices */
	@media (min-width: 320px) and (max-width: 460px) {
	}
	/* Tablet or small screens */
	@media (min-width: 768px) {
	}

	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {
		.upperBar {
			height: 60%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			/* background-color: #fff; */
			align-items: center;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		}
		.middleBar {
			height: 40%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.widgetlogo {
			height: 18px;
		}
		.defaultMenuText {
			color: white;
			font-size: 10px;
		}
		.downloadText {
			color: white;
			font-size: 8px;
		}
	}

	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px) {
        .upperBar {
			height: 60%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			/* background-color: #fff; */
			align-items: center;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		}
		.middleBar {
			height: 40%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.widgetlogo {
			height: 20px;
		}
		.defaultMenuText {
			color: white;
			font-size: 9px;
		}
		
	}

	/* Ultra-wide screens (e.g. 2560px) */
	@media (min-width: 2560px) {
        .upperBar {
			height: 60%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			/* background-color: #fff; */
			align-items: center;
			border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		}
		.middleBar {
			height: 40%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.widgetlogo {
			height: 30px;
		}
		.defaultMenuText {
			color: white;
			font-size: 12px;
		}
		
	}
</style>
