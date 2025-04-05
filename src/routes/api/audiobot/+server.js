import { json } from '@sveltejs/kit';
import { SECRET_OPENAIKEY } from '$env/static/private';
import OpenAI from 'openai';


const client = new OpenAI({
	apiKey: SECRET_OPENAIKEY
});

const handleApiAgentCall = async (userDataQuery) => {
	try {
		if (!userDataQuery) {
			return json('Empty userDataQuery');
		}
		// console.log('userDataQuery before gpt trigger', userDataQuery);
		const response = await client.responses.create({
			model: 'gpt-4o',
			input:  `${userDataQuery}`
		});
        const gptRes =  response.output_text
        return gptRes
	} catch (error) {
		console.log('error on handleApiAgentCall', error);
	}
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();
	// console.log('data', data);
	if(data){
	   const botRes = await handleApiAgentCall(data)
        // console.log('botRes', botRes);
	     return json(botRes);
	}
	// return json('succesful');
}
