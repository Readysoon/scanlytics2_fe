import { json } from '@sveltejs/kit';
import { SECRET_OPENAIKEY } from '$env/static/private';


/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const {data} = await request.json();
    console.log('request', request);
    console.log('data',data);
	return json("succesful");
}