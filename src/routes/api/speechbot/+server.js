import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
// import { writeFile } from 'node:fs/promises';


const handlespeechBot = async () => {
	// Creates a client
	// const client = new textToSpeech.TextToSpeechClient({
	// 	credentials: {
	// 		client_email: 'your-service-account@project-id.iam.gserviceaccount.com',
	// 		private_key: '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n'
	// 	}
	// });

	// // The text to synthesize
	// const text = 'hello, world!';

	// // Construct the request
	// const request = {
	// 	input: { text },
	// 	// Select the language and SSML voice gender (optional)
	// 	voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
	// 	// Select the type of audio encoding
	// 	audioConfig: { audioEncoding: 'MP3' }
	// };

	// // Performs the text-to-speech request
	// const [response] = await client.synthesizeSpeech(request);
    // await writeFile('output.mp3', response.audioContent, 'binary');
	// console.log('Audio content written to file: output.mp3');
};
console.log('triggert');

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();
	
    console.log('data from gpt in areach ttS', data);

    return json("success ful connected")
}
