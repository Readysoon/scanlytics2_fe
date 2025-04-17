<script>
	export let onTranscription;
	import { onMount } from 'svelte';
	import AudiorecordText from './audiorecordText.svelte';

	let mediaRecorder;
	let audioChunks = [];
	let isRecording = false;
	let isUploading = false;
	let recordingTimeout;
	let recognition;
	let transcript;

	// Function to log all available media devices
	async function logAvailableDevices() {
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			console.log('Available media devices:', devices);
		} catch (error) {
			console.error('Error enumerating devices:', error);
		}
	}

	// Call this function to log devices when the script is loaded
	logAvailableDevices();

	// const handleSpeechcognitation = () => {
	// 	// Set up SpeechRecognition
	// 	if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
	// 		alert('Speech recognition not supported in this browser');
	// 		return;
	// 	}
	// 	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	// 	recognition = new SpeechRecognition();
	// 	recognition.continuous = true; // Continuously listen to the speech
	// 	recognition.interimResults = true; // Get interim results while speaking

	// 	recognition.onstart = () => {
	// 		console.log('Speech recognition started...');
	// 	};

	// 	recognition.onend = () => {
	// 		console.log('Speech recognition stopped.');
	// 	};

	// 	// Event that runs when results are available (i.e., transcribed speech)
	// 	recognition.onresult = (event) => {
	// 		let interimTranscript = '';
	// 		let finalTranscript = '';
	// 		console.log('event', event);

	// 		// Go through all speech recognition results
	// 		for (let i = event.resultIndex; i < event.results.length; i++) {
	// 			const result = event.results[i];
	// 			if (result.isFinal) {
	// 				finalTranscript += result[0].transcript; // Final text
	// 			} else {
	// 				interimTranscript += result[0].transcript; // Interim text (real-time)
	// 			}
	// 		}

	// 		// Combine interim and final results into the transcript
	// 		transcript = finalTranscript || interimTranscript;

	// 		let getnumberofWords = [transcript];

	// 		console.log('getnumberofWords', getnumberofWords);

	// 		// for(let arrayitem in getnumberofWords){
	// 		//      console.log('arrayitem', arrayitem);
	// 		//      const stringphrase = getnumberofWords[arrayitem]

	// 		//      for(let char in stringphrase){
	// 		//         console.log('char', char);
	// 		//      }
	// 		// }
	// 		// Display the transcribed text (final or interim)
	// 		console.log('Transcript:', transcript);
	// 	};

	// 	recognition.onerror = (event) => {
	// 		console.error('SpeechRecognition error:', event.error);
	// 	};

	// 	recognition.onend = () => {
	// 		console.log('Speech recognition ended.');
	// 		// Automatically restart recognition
	// 		if (isRecording) {
	// 			recognition.start();
	// 			console.log('Speech recognition restarted...');
	// 		}
	// 	};

	// 	recognition.start();
	// };



	async function toggleRecording() {
		if (!isRecording) {
			try {
				console.log('Starting recording...');

				// // requests access to the user's microphone and returns an audio stream.
				// const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
				// console.log('Media stream obtained:', stream);

				// mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

				// // Gets the audio media data as blob
				// mediaRecorder.ondataavailable = (event) => {
				// 	console.log('Data available:', event.data);
				// 	audioChunks.push(event.data);
				// };

				// mediaRecorder.onstop = async () => {
				// 	console.log('Recording stopped.');
				// 	const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				// 	console.log('Audio Blob created:', audioBlob);
				// 	audioChunks = [];
				// 	await uploadAudio(audioBlob);
				// };

				// mediaRecorder.onerror = (event) => {
				// 	console.error('MediaRecorder error:', event.error);
				// };

				// mediaRecorder.start();
				// isRecording = true;

				handleSpeechcognitation();

				recordingTimeout = setTimeout(() => {
					if (isRecording) {
						mediaRecorder.stop();
						isRecording = false;
					}
				}, 10000); // 10 seconds
			} catch (error) {
				console.error('Error accessing media devices:', error);
			}
		} else {
			console.log('Stopping recording...');
			clearTimeout(recordingTimeout);
			mediaRecorder.stop();
			isRecording = false;
		}
	}

	async function uploadAudio(audioBlob) {
		if (!audioBlob) {
			console.error('No audio recorded');
			return;
		}

		isUploading = true;
		console.log('Uploading audio...');

		const formData = new FormData();
		formData.append('file', audioBlob, 'recording.webm');

		try {
			const response = await fetch('https://scanlytics2-whisper.fly.dev/transcribe/', {
				method: 'POST',
				body: formData
			});

			console.log('Response status:', response.status);

			if (response.ok) {
				const result = await response.json();
				if (onTranscription) {
					onTranscription(result.text);
				}
				console.log('Audio uploaded successfully');
			} else {
				console.error('Failed to upload audio');
			}
		} catch (error) {
			console.error('Error uploading audio:', error);
		} finally {
			isUploading = false;
		}
	}
</script>

<!-- <button on:click={toggleRecording} disabled={isUploading} class:is-recording={isRecording}>
	 <img src="/mic.png" alt="Microphone" class="mic-icon" /> -->
<!-- </button> -->
<AudiorecordText/>


<style>
	button {
		margin: 10px 0;
		padding: 2px 2px;
		font-size: 1.2em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	button.is-recording {
		background-color: rgb(69, 212, 255);
		color: white;
	}

	.mic-icon {
		width: 24px;
		height: 24px;
	}
</style>
