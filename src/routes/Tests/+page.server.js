// import { SECRET_OPENAIKEY } from '$env/static/private';
// import OpenAI from 'openai';
// import audioDataCall from '../Tests/+page.svelte';

// console.log('audioDataCall', audioDataCall);
// const handleApiAgentCall = async () => {
// 	console.log('triggert');
// 	try {
// 		// console.log('openai key', SECRET_OPENAIKEY);
// 		const response = await client.responses.create({
// 			model: 'gpt-4o',
// 			input: 'Write a one-sentence bedtime story about a unicorn.'
// 		});

// 		console.log('res', response);
// 	} catch (error)
// 		console.error('Error on Calling openAI', error);
// 	}
// };

// export async function load() {
// 	const client = new OpenAI({
// 		apiKey: SECRET_OPENAIKEY
// 	});
// 	return{
// 		gpt: client
// 	}
// }

// // import OpenAI from 'openai';
// // const client = new OpenAI({
// // 	apiKey: SECRET_OPENAIKEY
// // });
