<script>
	// Uses the Web Speech API

	let isRecording = false;
    let recordingTimeout;
	let recognition;
	let transcript;

    const transkriptionArr = []
    const arrList = []

    const handleUploadData = async(phrase) => { 
        if(phrase){
            try{

            }catch{
                console.error('Error uploading audio:', error);
            }

        }

    }
    const handletranskriptionData = (event) => { 

      
         if(event){
            arrList.push(event)
            console.log('event on handler', event);
         }
         
    }
   

  

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



			
            if(finalTranscript){

               let transkriptList = finalTranscript.split(' ');

           
            if(transkriptList){
                for(let  word of transkriptList ){
                    console.log('word', word);
                    // transkriptionArr.push(word)
                    handletranskriptionData(word)
                }
            }
            }

           
          

            console.log('Final array list:', arrList);
            
            if(arrList.length != 0){
                const recordedPhrase = arrList.join(' ')
                console.log('recordedPhrase', recordedPhrase);
                handleUploadData(recordedPhrase)
                if(recordedPhrase.includes('Stopp')){
                    console.log('recognition stopped');
                    recognition.stop();

                }
               
            }
          


		};



		recognition.onerror = (event) => {
			console.error('SpeechRecognition error:', event.error);
		};

		recognition.onend = () => {
			console.log('Speech recognition ended.');
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

    console.log('arrList', arrList);
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
