<script module>
	let isRecording = false;
	let recognition;
	let arrList = $state([]);
	import { onDestroy } from 'svelte';
	let audioUrl = $state('');
	let btnState = $state(false);

	import Wavesurfer, { getWaveaudi } from './wavesurfer.svelte';
	import { loadtoggleCall } from './navigation/navigation.svelte';
	import {handleRecordBtnUpdate} from '../../../routes/(public)/Technology/+page.svelte'

	export function handleAudioStart() {
		recognition.start();
	}


	const handleTTSReq = async (gptText) => {
		try {
			const response = await fetch('/api/technology/speechbot', {
				method: 'POST',
				body: JSON.stringify({ data: gptText }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const result = await response.json();

			if (result.success) {
				console.log('result on auto', result);
				audioUrl = await result.audioUrl;
				if (audioUrl) {
					loadtoggleCall();
					getWaveaudi(audioUrl);
				}
			}
		} catch (error) {
			console.error('Error in handleTTSReq:', error);
		}
	};

	const handleAIReq = async (phrase) => {
		try {
			const response = await fetch('/api/technology/audiobot', {
				method: 'POST',
				body: JSON.stringify({ data: phrase }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const totalRes = await response.text();

			if (totalRes) {
				handleTTSReq(totalRes);
				arrList = [];
			}
		} catch (error) {
			console.error('Error in handleAIReq:', error);
		}
	};

	const handlespeechRecognitionData = async (phraseArr) => {
		try {
			const phraseLen = phraseArr.length;
			const phraseLastWord = phraseArr.at(-1);
			console.log('phaseARR', phraseArr);

			if (phraseArr.includes('Stopp' || 'stop')) {
				try {
					const filteredStop = phraseArr.filter((e) => e !== 'Stopp');
					const updatedPhrase = filteredStop.join(' ');
					recognition.stop();
					handleRecordBtnUpdate()
					if (updatedPhrase) {
						handleAIReq(updatedPhrase);
					}
				} catch {
					console.error('Error uploading audio:', error);
				}
			} else {
				const interval = setInterval(() => {
					if (phraseLen && phraseLastWord) {
						const filteredStop = phraseArr.filter((e) => e !== 'Stopp');

						const updatedPhrase = filteredStop.join(' ');
						recognition.stop();
						if (updatedPhrase) {
							handleAIReq(updatedPhrase);
						}
						clearInterval(interval);
					}
				}, 2000);

				onDestroy(() => {
					clearInterval(interval);
				});
			}
		} catch (error) {
			console.log('Error in handlespeechRecognitionData:', error);
		}
	};

	const handletranskriptionData = (event) => {
		if (event) {
			arrList.push(event);
		}
	};

	const handleRecording = () => {
		// Set up SpeechRecognition
		if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
			alert('Speech recognition not supported in this browser');
			return;
		}
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognition = new SpeechRecognition();
		recognition.continuous = true; // Continuously listen to the speech
		recognition.interimResults = true; // Get interim results while speaking

		recognition.onstart = () => {
			// console.log('Speech recognition started...');
			loadtoggleCall();
		};

		recognition.onend = () => {
			// console.log('Speech recognition stopped.');
		};

		// Event that runs when results are available (i.e., transcribed speech)
		recognition.onresult = (event) => {
			let interimTranscript = '';
			let finalTranscript = '';
			// console.log('event', event);

			for (let i = event.resultIndex; i < event.results.length; i++) {
				const result = event.results[i];
				if (result.isFinal) {
					finalTranscript += result[0].transcript; // Final text
				}
			}

			if (finalTranscript) {
				let transkriptList = finalTranscript.split(' ');

				if (transkriptList) {
					for (let word of transkriptList) {
						// transkriptionArr.push(word)
						handletranskriptionData(word);
					}
				}
			}

			// console.log('Final array list:', arrList);

			if (arrList.length != 0) {
				handlespeechRecognitionData(arrList);
			}
		};

		recognition.onerror = (event) => {
			console.error('SpeechRecognition error:', event.error);
		};

		recognition.onend = () => {
			// console.log('Speech recognition ended.');
			// handleUploadData(arrList);
			// recognition.stop();
			// Automatically restart recognition
			if (isRecording) {
				recognition.start();
				// console.log('Speech recognition restarted...');
			}
		};
		recognition.start();
		
	};

	const toggleRecording = () => {
		if (!isRecording) {
			try {
				// console.log('toggled recording');
				btnState = !btnState;
				handleRecording();
				handleRecordBtnUpdate()
			} catch (error) {
				console.error('Error accessing media devices:', error);
			}
		} else {
			
			recognition.stop();
			isRecording = false;
		}
	};


</script>

<div>
	<button on:click={toggleRecording} class="btnstring" class:is-recording={isRecording}>
		{#if btnState}
			<img src="/pause.png" alt="Microphone" class="mic-icon" />
		{:else}
			<img src="/play.png" alt="Microphone" class="mic-icon" />
		{/if}
	</button>
</div>

<!-- {#if updateAudioState}
	<audio autoplay 
on:ended={handleAudioEnd}

>
	<source src={`${audioUrl}?t=${Date.now()}`} type="audio/mp3" />
	Your browser does not support the audio element.
</audio> -->

<!-- {/if} -->

<style>
	.mic-icon {
		width: 24px;
		height: 24px;
	}

	button.is-recording {
		background: #ff0000; 
	}

	button {
		background: none;
		border: none; 
		color: #000;
		cursor: pointer;
		width: 100%;
	}
</style>
