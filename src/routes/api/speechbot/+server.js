import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import path from 'path';
import fs from 'fs';


const rawKey = env.GOOGLE_CLOUD_KEY_B64;

if (!rawKey) {
  throw new Error('Missing GOOGLE_CLOUD_KEY_B64 env variable');
}


const keyPath = '/tmp/google-key.json';
fs.writeFileSync(keyPath, Buffer.from(rawKey, 'base64'));


// const client = new TextToSpeechClient();
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
