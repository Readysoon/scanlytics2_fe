import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import path from 'path';

const client = new TextToSpeechClient();


const handlespeechBot = async (botText) => {
	// Creates a client
	// const client = new textToSpeech.TextToSpeechClient({
	// 	credentials: {
	// 		client_email: 'your-service-account@project-id.iam.gserviceaccount.com',
	// 		private_key: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
	// 	}


	// The text to synthesize
	const text =  botText;

	// Construct the request
	const request = {
		input: { text },
		// Select the language and SSML voice gender (optional)
		voice: { 
			languageCode: 'de-DE',
			name: 'de-DE-Wavenet-B', 
			ssmlGender: 'NEUTRAL' },
		// Select the type of audio encoding
		audioConfig: { audioEncoding: 'MP3' }
	};

	// Performs the text-to-speech request
	const [response] = await client.synthesizeSpeech(request);

	const filePath = path.join('static', 'output.mp3' )
    const audioFile = await writeFile(filePath, response.audioContent, 'binary');
	console.log('Audio content written to file: output.mp3');

	return '/output.mp3'
};


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();
	
    console.log('data from gpt in areach ttS', data);
	const botAudioFileData = await handlespeechBot(data)

    return json({success: true, audioUrl: botAudioFileData})
}
