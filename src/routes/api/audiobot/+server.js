import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';


const client = new OpenAI({
	apiKey: env.OPENAI_API_KEY
});


// console.log('SECRET_OPENAIKEY', SECRET_OPENAIKEY);

let stateNum = 0;


const brunoPromptMap = {
	0: {
	  trigger: "Hallo Bruno",
	  response: "Hallo Doctor, wie kann ich Ihnen helfen?",
	  followUp: "Möchten Sie mit dem Reporting beginnen?",
	  next: 1,
	  previous: null
	},
	1: {
	  question: "Wie ist die Qualität der Untersuchung?",
	  next: 2,
	  previous: 0
	},
	2: {
	  question: "Wie ist der Zustand der Darmreinigung?",
	  next: 3,
	  previous: 1
	},
	3: {
	  question: "Welche Feldstärke wurde verwendet?",
	  next: 4,
	  previous: 2
	},
	4: {
	  question: "Welches Kontrastmittel wurde verwendet?",
	  next: 5,
	  previous: 3
	},
	5: {
	  question: "Wie viel Kontrastmittel (in ml) wurde verwendet?",
	  next: 6,
	  previous: 4
	},
	6: {
	  question: "Was ist der aktuelle PSA-Wert?",
	  next: 7,
	  previous: 5
	},
	7: {
	  question: "Gibt es eine PSA-Vorgeschichte?",
	  next: 8,
	  previous: 6
	},
	8: {
	  question: "Was wurde bei vorherigen Biopsien festgestellt?",
	  next: 9,
	  previous: 7
	},
	9: {
	  question: "Was war das Ergebnis der digitalen rektalen Untersuchung?",
	  next: 10,
	  previous: 8
	},
	10: {
	  question: "Wie groß ist die Prostata (in mm)?",
	  next: 11,
	  previous: 9
	},
	11: {
	  question: "Wie stark ist die Prostatahyperplasie?",
	  next: 12,
	  previous: 10
	},
	12: {
	  question: "Wie viele verdächtige Läsionen gibt es in der periphären Zone (1–4)?",
	  next: 13,
	  previous: 11
	},
	13: {
	  question: "Wie viele verdächtige Läsionen gibt es in der transistenten Zone?",
	  next: 14,
	  previous: 12
	},
	14: {
	  question: "Gibt es Hinweise auf neoplastische Beteiligung anderer Zonen?",
	  next: 15,
	  previous: 13
	},
	15: {
	  question: "Ja oder Nein: Gibt es Hinweise auf neoplastische Beteiligung anderer Zonen?",
	  next: 16,
	  previous: 14
	},
	16: {
	  question: "Anzahl und Lokalisation der metastatischen Lymphknoten.",
	  next: 17,
	  previous: 15
	},
	17: {
	  question: "Anzahl und Lokalisation der metastatischen Knochenläsionen.",
	  next: 18,
	  previous: 16
	},
	18: {
	  question: "Gibt es weitere relevante Befunde?",
	  next: 19,
	  previous: 17
	},
	19: {
	  question: "Schlussfolgerungen basierend auf den Befunden.",
	  next: 20,
	  previous: 18
	},
	20: {
	  question: "Dominante Läsion nach PI-RADS v.2 Kategorie.",
	  next: 21,
	  previous: 19
	},
	21: {
	  question: "Fokus auf Infiltration des neurovaskulären Bündels und der Samenblasen.",
	  next: 22,
	  previous: 20
	},
	22: {
	  question: "Zusammenfassung der metastatischen Erkrankung.",
	  next: null,
	  previous: 21
	},
	repeat: {
	  trigger: "bitte wiederhole die letzte Frage",
	  action: "Wiederhole die vorherige Frage"
	}
  };
  
  
const handleApiAgentCall = async (userDataQuery) => {
	try {
		if (!userDataQuery) {
			return json('Empty userDataQuery');
		}


		// console.log('userDataQuery before gpt trigger', userDataQuery);
		// const response = await client.responses.create({
		// 	model: 'gpt-4o',
		// 	input:  `${brunoPrompt}\n\n${userDataQuery}`,
		// });
		
		// if(response){

		// }
		// console.log('state', stateNum);
	
	
		// console.log('response', response);
		// const gptRes =  response.output_text
		// return gptRes
	
	  
		  // Sonderfall: Wiederholen
		 // Sonderfall: Wiederhole letzte Frage
		 if (userDataQuery.toLowerCase().includes("wiederhole")) {
			const previousState = brunoPromptMap[stateNum]?.previous;
			const repeatQuestion = brunoPromptMap[previousState]?.question;
			return `Natürlich, hier ist die letzte Frage erneut:\n${repeatQuestion}`;
		  }
	  
		  console.log('stateNum',stateNum);
		  const currentState = brunoPromptMap[stateNum];
		  console.log('currentState', currentState);
	  
		  if (!currentState) {
			return "Wir haben alle Fragen durchlaufen. Vielen Dank!";
		  }
	  
		  // Begrüßungsfall
		  if (stateNum === 0 && userDataQuery.toLowerCase().includes("hallo bruno")) {
			stateNum = currentState.next;
			return `${currentState.response} ${currentState.followUp}`;
		  }
		  const positiveWords = ["ja", "sehr gerne", "natürlich", "klar"];

		  if (stateNum === 1 && positiveWords.some(word => userDataQuery.toLowerCase().includes(word)))  {
			stateNum = currentState.next;
			return `${currentState.question}`;
		  }

		  const startWord = ["restart", "starte", "von" , "neu"];

		  if ( userDataQuery.toLowerCase().includes(startWord)) {
			stateNum = 0
			return 'Ich starte die Abfrage nochmal von vorn.'
		  }
	  
		  // Hole nächste Frage
		  const nextState = currentState.next;
		  const nextQuestion = brunoPromptMap[nextState]?.question || "Es sind keine weiteren Fragen vorhanden.";
	  
		  const response = await client.responses.create({
			model: 'gpt-4o',
			input: `Der Nutzer hat auf folgende Frage geantwortet:\n"${currentState.question}"\n\nAntwort:\n"${userDataQuery}"\n\nAntworte kurz und knapp, höflich ohhne zu bedanken. Stelle dann folgende Frage:\n"${nextQuestion}"`,
		  });
	  
		  stateNum = nextState;



		
		  return response.output_text;


		
	} catch (error) {
		console.log('error on handleApiAgentCall', error);
	}
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data } = await request.json();
	// console.log('data', data);
	if (data) {
		const botRes = await handleApiAgentCall(data);
		// console.log('botRes', botRes);
		return json(botRes);
	}
	// return json('succesful');
}
