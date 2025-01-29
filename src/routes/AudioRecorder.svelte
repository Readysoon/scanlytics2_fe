<script>
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;
    let isUploading = false;
    let recordingTimeout;

    async function toggleRecording() {
    if (!isRecording) {
        console.log("Starting recording...");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

        mediaRecorder.ondataavailable = (event) => {
        console.log("Data available:", event.data);
        audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
        console.log("Recording stopped.");
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        console.log("Audio Blob created:", audioBlob);
        audioChunks = [];
        await uploadAudio(audioBlob);
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
        console.log("Stopping recording...");
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
    console.log("Uploading audio...");

    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.webm');

    try {
        const response = await fetch('https://scanlytics2-whisper.fly.dev/transcribe/', {
        method: 'POST',
        body: formData,
        });

        console.log("Response status:", response.status);

        if (response.ok) {
        const result = await response.json();
        displayTranscription(result.text);
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
    resultDiv.textContent = text;
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
  