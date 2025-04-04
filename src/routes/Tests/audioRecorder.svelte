<script>
	let isRecording = false;
	let recordingTimeout;
	let recognition;
	let transcript;
	let audiodata;
	let gptclient = audiodata;
	let arrList = $state([])

	// console.log('audiodata', audiodata);

	const transkriptionArr = [];
	// const arrList = [];

	const handleapiCall = async(phrase) =>{
		const response = await fetch('/api/audiobot', {
					method: 'POST',
					body: JSON.stringify({data: phrase}),
					headers: {
						'content-type': 'application/json'
					}
				});

				const totalRes = await response.text();
				
				if(totalRes){
					arrList = []
					recognition.start();
				}
				console.log('gpt', totalRes);
				// await load(phrase)
	}

	const handleUploadData = async (phraseArr) => {
		if (phraseArr.includes('Stopp' || 'stop')) {
			try {
				const filteredStop  = phraseArr.filter(e => e !== "Stopp")
				console.log('filteredStop', filteredStop);

				const updatedPhrase = filteredStop.join(' ');
				console.log('updatedPhrase', updatedPhrase);
				recognition.stop();
				if(updatedPhrase){
					handleapiCall(updatedPhrase)
				}
				

				

				
			} catch {
				console.error('Error uploading audio:', error);
			}
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
			console.log('Speech recognition started...');
		};

		recognition.onend = () => {
			console.log('Speech recognition stopped.');
	
		};

		// Event that runs when results are available (i.e., transcribed speech)
		recognition.onresult = (event) => {
			let interimTranscript = '';
			let finalTranscript = '';
			console.log('event', event);

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
			console.log('Speech recognition ended.');
			// handleUploadData(arrList);
			// recognition.stop();
			// Automatically restart recognition
			if (isRecording) {
				recognition.start();
				console.log('Speech recognition restarted...');
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
				console.log('toggled recording');
				handleRecording();
			} catch (error) {
				console.error('Error accessing media devices:', error);
			}
		} else {
			console.log('Stopping recording...');
			// clearTimeout(recordingTimeout);
			recognition.stop();
			isRecording = false;
		}
	};
</script>

<button on:click={toggleRecording} class:is-recording={isRecording}>
	<img src="/mic.png" alt="Microphone" class="mic-icon" />
</button>

<style>
	.mic-icon {
		width: 24px;
		height: 24px;
	}
</style>
