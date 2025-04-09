import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import path from 'path';
import fs from 'fs';


// Log the status of the secret environment variable
console.log('GOOGLE_CLOUD_KEY_B64:', env.GOOGLE_CLOUD_KEY_B64 ? 'Available' : 'Not Available');

// Proceed with writing the key to a temporary file if available
if (!env.GOOGLE_CLOUD_KEY_B64) {
  throw new Error('Missing GOOGLE_CLOUD_KEY_B64 env variable');
}

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
	console.log('Audio content written to file: output.mp3');

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
