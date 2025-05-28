<script>
	import { createEventDispatcher } from 'svelte';
	import { searchNav } from '../navigation/navigation.svelte';
	const dispath = createEventDispatcher();

	const handleEnterPage = () => {
		dispath('enterPage');
		searchNav(true);
	};

</script>

<div class="emailSectionArea">
<div class="imgScanSection">
	<div class="emailRequestSection">
		<div class="placeholderObjecttext">
			<p>Scanlytics AI Assistant</p>
		</div>
		<div class="subTextEmailRequestArea">
			<div class="subtTextContent">
				<p>Bruno v.0.3</p>
			</div>
		</div>

		<div></div>
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
		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.emailRequestSection {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		position: relative;
	}

	.placeholderObjecttext {
		font-size: 105px;
		font-weight: bold;
		font-family: sans-serif;
		text-align: center;

		color: rgba(220, 215, 215, 0.403);
	}

	.subTextEmailRequestArea {
		font-size: 35px;
		font-weight: bold;
		font-family: sans-serif;
		color: rgba(220, 215, 215, 0.403);
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
			justify-content: flex-start;
			text-align: center;
			position: relative;
			z-index: 4;
			color: rgba(220, 215, 215, 0.403);
		}
	}
</style>
