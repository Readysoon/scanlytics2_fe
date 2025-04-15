import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import path from 'path';
import fs from 'fs';



// Decode the base64-encoded key
const rawKey = env.GOOGLE_CLOUD_KEY_B64;
const keyPath = '/tmp/google-key.json';

// Write the decoded key to a temporary file
fs.writeFileSync(keyPath, Buffer.from(rawKey, 'base64'));

// Create the TextToSpeech client with the key file
const client = new TextToSpeechClient({
  keyFilename: keyPath
});

const handlespeechBot = async (botText) => {
	// The text to synthesize
	const text = botText;

	// Construct the request
	const request = {
		input: { text },
		// Select the language and SSML voice gender (optional)
		voice: {
			languageCode: 'de-DE',
			name: 'de-DE-Wavenet-B',
			ssmlGender: 'NEUTRAL'
		},
		// Select the type of audio encoding
		audioConfig: { audioEncoding: 'MP3' }
	};

	// Performs the text-to-speech request
	const [response] = await client.synthesizeSpeech(request);

	const filePath = path.join('static', 'output.mp3');
	const audioFile = await writeFile(filePath, response.audioContent, 'binary');
	
	// const uniqueFileName = `output-${Date.now()}.mp3`;
	// const filePath = path.join('static', uniqueFileName);
	// const audioFile = await writeFile(filePath, response.audioContent, 'binary');
	

	// return `/${uniqueFileName}`;

	return '/output.mp3';
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();

	console.log('data from gpt in areach ttS', data);
	const botAudioFileData = await handlespeechBot(data);

	return json({ success: true, audioUrl: botAudioFileData });
}

// random comment
