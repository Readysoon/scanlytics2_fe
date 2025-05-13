import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';


const client = new OpenAI({
	apiKey: env.OPENAI_API_KEY
});


// console.log('SECRET_OPENAIKEY', SECRET_OPENAIKEY);

let stateNum = 0;
let controlsState = 0
let  newArr = []
let  convoArr = []
let updateState = 0
let prevlastQuestion = ""
let updateQuestion = ""
let recordValue = 0
let userReply = []
let stateQuestion = []
let addUpState = 0
let lastQuestionNum = 0

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
  


const handleUpdateState =  async(answer, state) => {

	

	if(!userReply.includes(answer) && !stateQuestion.includes(state) ){
		userReply.push(answer)
	stateQuestion.push(state)
	}
	

	


}

// const handleSecUpdateState =  (answer, state) => {

// 	console.log('inside handlestate on sec Update ');
// 	if(answer && state){
// 		console.log('updating state userReply', answer);
// 		console.log('stateQuestion', state);
// 	userReply = answer
// 	stateQuestion = state

// 	}


// }

// const handleSecUpdateState =  (answer, state) => {

// 	console.log('inside handlestate on sec Update ');
// 	if(answer && state){
// 		console.log('updating state userReply', answer);
// 		console.log('stateQuestion', state);
// 	userReply = answer
// 	stateQuestion = state

// 	}


// }
  
const handleApiAgentCall = async (userDataQuery, selectedArrState) => {
	try {
		if (!userDataQuery) {
			return json('Empty userDataQuery');
		}

		console.log('selectedArrState', selectedArrState);
		if(stateNum === -1){
			console.log('userDataQuery on last', userDataQuery);
			console.log('selectedArrState', selectedArrState.at(-1));
			handleUpdateState(userDataQuery, selectedArrState.at(-1))
			stateNum = 0
			recordValue = 1

			return 'Super, ich habe alle Fragen notiert. Bitte navigieren Sie zur Textseite, um Ihren Befund zu bearbeiten.'
		}


		  // Sonderfall: Wiederholen
		 // Sonderfall: Wiederhole letzte Frage
		 if (userDataQuery.toLowerCase().includes("wiederhole")) {
			const previousState = brunoPromptMap[stateNum]?.previous;
			const repeatQuestion = brunoPromptMap[previousState]?.question;
			return `Natürlich, hier ist die letzte Frage erneut:\n${repeatQuestion}`;
		  }
	  
		// const restartWords = ["restart", "starte von vorne"];

		  if ( userDataQuery.toLowerCase().includes("restart")) {
			stateNum = 0
			convoArr = []
			return 'Ich starte die Abfrage nochmal von vorn.'
		  }
	  
		  const currentState = brunoPromptMap[stateNum];
	  
		  if (!currentState) {
				return "Sie haben leider noch keine Fragen zur Befundung ausgewählt. Bitte wählen Sie im Bereich 'Finding' mehrere Fragen aus und beginnen Sie anschließend mit der Befunderstellung. Vielen Dank!"

		  }
	  
		  // Begrüßungsfall
		  if (stateNum === 0 && userDataQuery.toLowerCase().includes("hallo bruno")) {
			updateState = selectedArrState[0]
			stateNum = updateState+=1
			newArr = selectedArrState.filter((item) => item !== selectedArrState[0] );
			return `${currentState.response} ${currentState.followUp}`;
		  }

		// First default question
		  const positiveWords = ["ja", "sehr gerne", "natürlich", "klar"];

		  if (stateNum == updateState && positiveWords.some(word => userDataQuery.toLowerCase().includes(word)))  {
			let updateSecState = newArr[0]
			stateNum = updateSecState
			prevlastQuestion = currentState.question
			return `${currentState.question}`;
		  }

		


		  
		if(convoArr.length == 0){
	      
		
		  convoArr = newArr[0]
		//   console.log('convoArr', newArr);

		  let updateConvoState = convoArr+=1

		  const nextQuestion = brunoPromptMap[updateConvoState]?.question || "Es sind keine weiteren Fragen vorhanden.";
		  const response = await client.responses.create({
			model: 'gpt-4o',
			input: `Antwort des users(bitte nicht drauf eingehen):\n"${userDataQuery}"\n\nAntworte kurz und knapp, höflich ohne zu bedanken. Stelle dann folgende Frage:\n"${nextQuestion}"`,
		  });


		
		   handleUpdateState(userDataQuery, selectedArrState[0])
		  stateNum = updateConvoState;
		  updateQuestion = nextQuestion


		  convoArr = newArr.filter((item) => item !== newArr[0]);



		
		  return response.output_text;







		}
		else if(convoArr.length == 1){

		

		//   console.log('convoArr',convoArr);
		  let addUpState = convoArr[0] 
		
		  const nextState = addUpState+=1;
		  const nextQuestion = brunoPromptMap[nextState]?.question || "Es sind keine weiteren Fragen vorhanden.";
		//  const nextQuestion =  currentState.question|| "Es sind keine weiteren Fragen vorhanden.";


		  const response = await client.responses.create({
			model: 'gpt-4o',
			input: `sei höflich antworte kurz als ob du eine gute antowrt erhalten hast, aber bedanke dich nicht und stelle dann folgende Frage:\n"${nextQuestion}"`,
		  });
		  


		  stateNum = -1;
		//   console.log('newArr', newArr);
		//   console.log('firstNum', newArr[0]);
		  await handleUpdateState(userDataQuery,  newArr[0])

		  return response.output_text;

	


		}else{
		 

		  	addUpState = convoArr[0]

		//   const nextState = currentState.next;
		  const nextState = addUpState+=1;
		  const nextQuestion = brunoPromptMap[nextState]?.question || "Es sind keine weiteren Fragen vorhanden.";
		//  const nextQuestion =  currentState.question|| "Es sind keine weiteren Fragen vorhanden.";


	  
		  const response = await client.responses.create({
			model: 'gpt-4o',
			input: `bedanke dich für die antowrt kurz und knapp, selle dann folgende Frage:\n"${nextQuestion}"`,
		  });
		  

	

		  
		  await handleSecUpdateState(userDataQuery, addUpState)
		  convoArr = convoArr.filter((item) => item !== convoArr[0]);


	
		
		  return response.output_text;




		}
		
		 
		
	} catch (error) {
		console.log('error on handleApiAgentCall', error);
	}
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { data, selecteState } = await request.json();
	// console.log('data', data);
	// console.log('selecteState', selecteState);
	if (data) {
		const botRes = await handleApiAgentCall(data, selecteState);
		console.log('botRes', botRes);
		return json({botmessage: botRes, recordState: recordValue, userAnswer: userReply, userPrevQeustion: stateQuestion});
	}
	// return json('succesful');
}
