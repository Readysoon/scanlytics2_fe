<script>
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let audioUrl = '';
    let isRecording = false;
    let isUploading = false;
    let recordingTimeout;
  
    async function toggleRecording() {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
  
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = async () => {
          audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          audioUrl = URL.createObjectURL(audioBlob);
          audioChunks = [];
          await uploadAudio();
        };
  
        mediaRecorder.start();
        isRecording = true;
  
        recordingTimeout = setTimeout(() => {
          if (isRecording) {
            mediaRecorder.stop();
            isRecording = false;
          }
        }, 10000); // 10 seconds
      } else {
        clearTimeout(recordingTimeout);
        mediaRecorder.stop();
        isRecording = false;
      }
    }
  
    async function uploadAudio() {
      if (!audioBlob) {
        console.error('No audio recorded');
        return;
      }
  
      isUploading = true;
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');
  
      try {
        const response = await fetch('https://scanlytics2-whisper.fly.dev/transcribe/', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          displayTranscription(result.transcription);
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
  
    function displayTranscription(text) {
      const resultDiv = document.getElementById('transcription-result');
      resultDiv.textContent = text || 'No transcription available';
    }
  </script>
  
  <div class="audio-recorder">
    <button on:click={toggleRecording} disabled={isUploading}>
      {isRecording ? 'Stop and Upload Recording' : 'Start Recording'}
    </button>
    <div id="transcription-result"></div>
  </div>
  
  <style>
    .audio-recorder {
      margin-top: 20px;
    }
  
    button {
      margin: 10px 0;
      padding: 0px 10px;
      font-size: 1.2em;
    }
  
    #transcription-result {
      margin-top: 10px;
      font-size: 1em;
      color: #333;
    }
  </style>
  