<script lang="ts">
	import Footer from '../Footer.svelte';
	// import AudioRecorder from '../Technology/AudioRecorder.svelte';
	import AudioRecorder from '../Tests/audioRecorder.svelte'
	import { writable } from 'svelte/store';
	

	let text = $state('');
	let currentStep = 3;
	let {data} = $props();
	

	function goToStepFour() {
		if (currentStep === 3) {
			document.getElementById('step-3').classList.remove('active');
			currentStep = 4;
			document.getElementById('step-4').classList.add('active');
		}
	}

	// console.log('data', data.gpt);
	// export const audioDataCall = (phrase) => {
	// 	console.log('phrase is triggered', phrase);
	// 	if(phrase){
	// 		 const textdata = writable(phrase)
	// 	}
	// 	return phrase
	// }

	function appendTranscription(transcription: any) {
		console.log('transcription', transcription);
		if (transcription) {
			text += (text ? '\n' : '') + transcription;
		} else {
			console.log('Hola im in appendTranscription function');
		}
	}

	console.log('Audio Text:', text);
</script>

<main>
	<div class="contentSection">
		<div class="audiosection">
			<AudioRecorder onTranscription={appendTranscription} audiodata={data}/>


		</div>

		<!-- <div class="testArea">
			<textarea bind:value={text} on:focus={goToStepFour} class="" />
		</div> -->
	</div>
</main>

<Footer />

<style>
	main {
		height: 100vh;
		background-color: rgb(12, 12, 12);
		display: flex;
		justify-content: center;
		align-items: center;


		.audiosection{
			height: 40%;
			width: 100%;
			background-color: rgb(255, 255, 255);

		}

		.contentSection {
			height: 50%;
			width: 50%;
			background-color: blue;
		}


		.testArea {
			height: 50%;
			width: 100%;
			background-color: rgb(59, 59, 60);
		}

		textarea {
			width: 100%;
			height: 99%;
			/* min-height: 400px; */
		}
	}
</style>
