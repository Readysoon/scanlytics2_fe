<script >
	let isRecording = false;
	let recordingTimeout;
	let recognition;
	let transcript;
	let audiodata;
	let gptclient = audiodata;
	let arrList = $state([]);
	import { onDestroy } from 'svelte';
	let audioUrl = $state('');
	let audioElement;
	let updateAudioState = $state(false);
	let btnState = $state(false);
	import fs from 'fs/promises';
	import path from 'path';

	// console.log('audiodata', audiodata);

	const transkriptionArr = [];
	// const arrList = [];

	const handleAudioEnd = () => {
		updateAudioState = false;

		recognition.start();
	};

	
	const handleSpeechAgentCall = async (gptText) => {
		console.log('gptText', gptText);
		try {
			const response = await fetch('/api/technology/speechbot', {
				method: 'POST',
				body: JSON.stringify({ data: gptText }),
				headers: {
					'content-type': 'application/json'
				}
			});

			// console.log('response from speechagent', response );

			const result = await response.json();

			if (result.success) {
				// console.log('inside success result');
				console.log('result on auto', result);
				audioUrl = await result.audioUrl;
				if (audioUrl) {
					// console.log('updateAudioState', updateAudioState);
					updateAudioState = true;
				}
				// console.log('audioUrl', audioUrl);
			}
		} catch (error) {
			console.log('Error on google cloud', error);
		}
	};

	// Top-level await is allowed in ES modules

	const handleapiCall = async (phrase) => {
		const response = await fetch('/api/technology/audiobot', {
			method: 'POST',
			body: JSON.stringify({ data: phrase }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const totalRes = await response.text();

		if (totalRes) {
			handleSpeechAgentCall(totalRes);
			arrList = [];
		}
		// console.log('gpt', totalRes);
		// await load(phrase)
	};

	const handleUploadData = async (phraseArr) => {
		// console.log('phrase', phraseArr);
		const phraseLen = phraseArr.length;
		const phraseLastWord = phraseArr.at(-1);
		// console.log('phraselen', phraseLen);
		// console.log('phrase last word', phraseLastWord);

		if (phraseArr.includes('Stopp' || 'stop')) {
			try {
				const filteredStop = phraseArr.filter((e) => e !== 'Stopp');
				// console.log('filteredStop', filteredStop);

				const updatedPhrase = filteredStop.join(' ');
				// console.log('updatedPhrase', updatedPhrase);
				recognition.stop();
				if (updatedPhrase) {
					handleapiCall(updatedPhrase);
				}
			} catch {
				console.error('Error uploading audio:', error);
			}
		} else {
			// console.log('ping else');

			const handleIntervalCount = () => {
				const interval = setInterval(() => {
					if (phraseLen && phraseLastWord) {
						// console.log('recording is stopped on voice pause');
						const filteredStop = phraseArr.filter((e) => e !== 'Stopp');
						// console.log('filteredStop', filteredStop);

						const updatedPhrase = filteredStop.join(' ');
						// console.log('updatedPhrase', updatedPhrase);
						recognition.stop();
						if (updatedPhrase) {
							handleapiCall(updatedPhrase);
						}
						clearInterval(interval);
					}
				}, 2000);

				onDestroy(() => {
					clearInterval(interval);
				});
			};

			handleIntervalCount();
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
				handleUploadData(arrList);
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
		// recordingTimeout = setTimeout(() => {
		// 	if (isRecording) {
		// 		mediaRecorder.stop();
		// 		isRecording = false;
		// 	}
		// }, 60000);
	};

	// console.log('arrList', arrList);
	const toggleRecording = () => {
		if (!isRecording) {
			try {
				// console.log('toggled recording');
				btnState = !btnState;
				handleRecording();
			} catch (error) {
				console.error('Error accessing media devices:', error);
			}
		} else {
			// console.log('Stopping recording...');
			// clearTimeout(recordingTimeout);
			recognition.stop();
			isRecording = false;
		}
	};

	// console.log('audioUrl', audioUrl);

	//   $effect(() => {

	// 	if (updateAudioState) {
	//     audioElement.load();   // reload new source
	//     audioElement.play().catch(e => {
	//       console.warn("Autoplay failed:", e);
	//     });
	//   }
	// 	});
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

{#if updateAudioState}
	<!-- <audio autoplay 
on:ended={handleAudioEnd}

>
	<source src={`${audioUrl}?t=${Date.now()}`} type="audio/mp3" />
	Your browser does not support the audio element.
</audio> -->
	<audio autoplay on:ended={handleAudioEnd}>
		<source src={audioUrl} type="audio/mp3" />
		Your browser does not support the audio element.
	</audio>
{/if}

<style>
	.mic-icon {
		width: 24px;
		height: 24px;
	}

	button.is-recording {
		background: #ff0000; /* Change the background if recording (for example red) */
	}

	button {
		background: none;
		border: none; /* Optionally, remove border if you don't want it */
		color: #000; /* Set text color (optional) */
		cursor: pointer;
		width: 100%;
	}
</style>
