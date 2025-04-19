import { json } from '@sveltejs/kit';
// import textToSpeech from '@google-cloud/text-to-speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'node:fs/promises';
import { env } from '$env/dynamic/private';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { S3Client, ListBucketsCommand ,  DeleteObjectsCommand, GetObjectCommand, ListObjectsV2Command, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand} from '@aws-sdk/client-s3';



const s3Client = new S3Client({
	region: "auto", // Specify the AWS region from environment variables
	endpoint: "https://fly.storage.tigris.dev",
	forcePathStyle: true,
	credentials: {
		accessKeyId: env.AWS_ACCESSKEYID, // Access key ID from environment variables
		secretAccessKey: env.AWS_SECRETACCESSKEY // Secret access key from environment variables
	}
});

// Decode the base64-encoded key
const rawKey = env.GOOGLE_CLOUD_KEY_B64;
const keyPath = '/tmp/google-key.json';

// Write the decoded key to a temporary file
fs.writeFileSync(keyPath, Buffer.from(rawKey, 'base64'));

// Create the TextToSpeech client with the key file
const client = new TextToSpeechClient({
	keyFilename: keyPath
});

const handleCleanUp = async (audioUrl) => {
	const staticDir = 'static';

	try {
		// Read all files in the static directory
		const files = await fsp.readdir(staticDir);
		// console.log('triggere cleaning files:', files);

		// Loop through each file in the directory
		for (const file of files) {
			// Skip the current file (the one being used as audioUrl)
			if (file.startsWith('output') && file !== audioUrl) {
				// Construct the full path to the file
				const filePath = path.join(staticDir, file);

				// Delete the file
				await fsp.unlink(filePath);
				console.log(`Deleted old file: ${file}`);
			}
		}
	} catch (error) {
		console.error('Error cleaning static folder:', error);
	}
};
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

	// const filePath = path.join('static', 'output.mp3');
	// const audioFile = await writeFile(filePath, response.audioContent, 'binary');

	const uniqueFileName = `output-${Date.now()}.mp3`;
	const bucketName = env.AWS_BUCKET_NAME; // replace with your bucket name

	const uploadParams = {
		Bucket: bucketName,
		Key: uniqueFileName,
		Body: response.audioContent, // this is your binary buffer
		ContentType: 'audio/mpeg',
		ACL: 'public-read' // optional: makes the file publicly accessible
	};

	
		const audiores = await s3Client.send(new PutObjectCommand(uploadParams));

		// https://scanlytics-chatbot-audio.fly.storage.tigris.dev/output-1745101448235.mp3
		const publicUrl = `https://${bucketName}.fly.storage.tigris.dev/${uniqueFileName}`;


		// const publicUrl = `https://scanlytics-chatbot-audio.fly.storage.tigris.dev/${uniqueFileName}`
		return publicUrl;

	
		
	
	// const filePath = path.join('static', uniqueFileName);
	// const audioFile = await writeFile(filePath, response.audioContent, 'binary');

	// handleCleanUp(uniqueFileName)
	

	// return `/${uniqueFileName}`;
	// return audioRes

	// return '/output.mp3';
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();

	console.log('data from gpt in areach ttS', data);
	const botAudioFileData = await handlespeechBot(data);

	return json({ success: true, audioUrl: botAudioFileData });
}

// random comment
