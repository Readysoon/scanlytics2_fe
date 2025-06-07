 

<script  module>
	import Wavesurfer, { getWaveaudi } from './wavesurfer.svelte';
	import { loadtoggleCall } from './navigation/navigation.svelte';
	import {handleRecordBtnUpdate} from '../../../routes/(public)/Technology/+page.svelte'
	import {handleAITextData} from '../../../routes/(public)/Technology/+page.svelte'
	import {handleUpdateQuestionState} from '../../../routes/(public)/Technology/+page.svelte'
	import {AudioTracker} from '../../../routes/(public)/Technology/+page.svelte'
	import {loadAiTextToggle} from '../../../routes/(public)/Technology/+page.svelte'



	let isRecording = false;
	let recognition;
	let arrList = $state([]);
	import { onDestroy } from 'svelte';
	let audioUrl = $state('');
	let btnState = $state(false);
	let audioState =  $state(0);
	let stateTracker = $state(false);
	let pageTracker = $state(0);
	let userprevQAnswer = $state('');
	let userprevQState = $state([]);
	
	export function handleAudioStart() {
		if(audioState == 1){
			if(stateTracker == false){
			stateTracker = true 
			handleRecordBtnUpdate()
			recognition.stop();
			isRecording = false;
			btnState = false;
			}
			

		}else{
			recognition.start();

		}
	}

	if(pageTracker == 0){
		
		console.log('triggert in pageTracker', pageTracker);
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
				audioUrl = await result.audioUrl;
				if (audioUrl) {
					// loadAiTextToggle(true)
					loadtoggleCall();
					handleAITextData(gptText)
					getWaveaudi(audioUrl);
				}
			}
		} catch (error) {
			console.error('Error in handleTTSReq:', error);
		}
	};

	const handleAIReq = async (phrase, selVal) => {
		try {
			// const response = await fetch('/api/technology/audiobot', {
			// 	method: 'POST',
			// 	body: JSON.stringify({ 
			// 		data: phrase, 
			// 		selecteState: selVal

			// 	 }),
			// 	headers: {
			// 		'content-type': 'application/json'
			// 	}
			// });
			
		
			console.log('pageTracker', pageTracker);
			const response = await fetch('/api/technology/sessionAudiobot', {
				method: 'POST',
				body: JSON.stringify({ 
					data: phrase, 
					selecteState: selVal,
					reqtracker: pageTracker

				 }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const result = await response.json();
			
			// const totalRes = result.botmessage.text();

			const totalRes = result.botmessage;
			const recordState =  result.recordState
			 userprevQAnswer = result.userAnswer
			 userprevQState = result.userPrevQeustion

			console.log('totalRes', totalRes);
			console.log('recordState', recordState);
	
			

		

			
			// Handels the updating states on question Area
			if(userprevQAnswer !== "" && userprevQState !== null){

				console.log('userprevQAnswer in updating handleHandleUpdateState', userprevQAnswer);
				console.log('userprevQState  in updating handleHandleUpdateState', userprevQState);
			
				pageTracker+=1
				handleUpdateQuestionState(userprevQAnswer, userprevQState)
			}

			if(recordState == 1){
				console.log('triggered on last state');
				audioState = recordState
				pageTracker = 0
				userprevQAnswer = ""
				userprevQState = []
				handleAudioStart()
				
				// recognition.stop();
			}

			// HandlesTTS logic
			if (totalRes) {

				handleTTSReq(totalRes);
				arrList = [];
			}
		} catch (error) {
			console.error('Error in handleAIReq:', error);
		}
	};

	const handlespeechRecognitionData = async (phraseArr, selectVal) => {

		try {
			const phraseLen = phraseArr.length;
			const phraseLastWord = phraseArr.at(-1);
			// console.log('phaseARR', phraseArr);
			// console.log('selectVal', selectVal);

			if (phraseArr.includes('Stopp' || 'stop')) {
				try {
					const filteredStop = phraseArr.filter((e) => e !== 'Stopp');
					const updatedPhrase = filteredStop.join(' ');
					recognition.stop();
					handleRecordBtnUpdate()
					if (updatedPhrase) {
						handleAIReq(updatedPhrase, selectVal);
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
							console.log('updatedPhrase inside if condition', updatedPhrase);
							console.log('selectVal inside if condition', selectVal);
							handleAIReq(updatedPhrase, selectVal);
						}
						clearInterval(interval);
					}
				}, 2000);

				
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

	const handleRecording = (selectArrValue) => {
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
			loadtoggleCall();
			// loadAiTextToggle(false)
		};

		recognition.onend = () => {
			console.log('Speech recognition stopped.');
			
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
				} else {
					interimTranscript += result[0].transcript;
					AudioTracker(interimTranscript)
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
				handlespeechRecognitionData(arrList, selectArrValue);
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

	const toggleRecording = (selectedQuestion) => {

		if (!isRecording) {
			try {
				const selectedQuestionArr = selectedQuestion
				btnState = !btnState;
				handleRecording(selectedQuestionArr);
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


<script>
	let {selectedArr} = $props();
	let arrValue = $state([])

	$effect(() => {
		arrValue = selectedArr
		if(arrValue.length > 0){
			console.log('selectedArr', arrValue);
		}
	})	



	

</script>

 

<div>
	<button on:click={() => toggleRecording(arrValue)} class="btnstring" class:is-recording={isRecording}>
		{#if btnState}
		<div class="micIconPauseSection">
			<img src="/pause.png" alt="Microphone" class="micIconPause" />
		</div>
		{:else}
		<div class="micIconPauseSection">
			<img src="micro.png" alt="Microphone" class="micIconPause" />
		</div>
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
		width: 85%;
		height: 70%;
	}

	.micIconPauseSection{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.micIconPause{
		
		/* background-color: #fff; */
		width: 85%;
		height: 70%;
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
