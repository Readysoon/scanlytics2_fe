import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import OpenAI from 'openai';


const client = new OpenAI({
	apiKey: env.OPENAI_API_KEY
});


// console.log('SECRET_OPENAIKEY', SECRET_OPENAIKEY);



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
  
  let newArr = []
  let stateNum = 0;
  let recordValue = 0
  let updateState = 0
  let userReply  = []
  let stateQuestion = []
  let prevQuestionNum = 0
  
//   let sessionTriggeredState = 0
//   let controlsState = 0
//   let  convoArr = []
//   let prevlastQuestion = ""
  let updateQuestion = ""
//   let addUpState = 0
	

const handleUpdateState =  async(answer, state) => {


		console.log('answer', answer);
		console.log('state',state);

	if(!userReply.includes(answer) && !stateQuestion.includes(state) ){
		userReply.push(answer)
		stateQuestion.push(state)
	}
	

	


}

const handleGreeting = (userGreetAnswerData, userGreetSelectedArr) => {

	try{
		stateNum = 0;
		updateState = 0
		recordValue = 0
		newArr = []
		userReply  = []
		stateQuestion = []
		const currentState = brunoPromptMap[stateNum];
		console.log('userGreetSelectedArr',userGreetSelectedArr);
			if (!userGreetAnswerData || userGreetAnswerData =="") {
				return "Unfortunately, I couldn't hear you. There seems to be an issue with the audio recording. Please try again later or contact our service team."
			}
		if(userGreetAnswerData && userGreetSelectedArr){
			console.log('userGreetAnswerData &userGreetSelectedArr exist');
			if (stateNum === 0 && userGreetAnswerData.toLowerCase().includes("hallo bruno")) {
				console.log('triggerd in hallo bruuno');
				console.log('selectedArrState',userGreetSelectedArr);
				
				updateState = userGreetSelectedArr[0]
				stateNum = updateState+=1
		
				console.log('stateNum', stateNum);
				newArr = userGreetSelectedArr.filter((item) => item !== userGreetSelectedArr[0] );
				return `${currentState.response} ${currentState.followUp}`;
			}
		} 
	

	}catch(error){
		console.error('Error on handleGreeting', error);
	}



}
const handleUserAgreement = (userAnswerData) => {

	const positiveWords = ["ja", "sehr gerne", "natürlich", "klar"];

	console.log('stateNum before sec question', stateNum);
	console.log('updateState before sec question', updateState);
	const currentState = brunoPromptMap[stateNum];
	if (stateNum == updateState && positiveWords.some(word => userAnswerData.toLowerCase().includes(word)))  {

			console.log('triggert in ja gerne');
			console.log('currentstate',currentState.question);
			console.log('newArr', newArr);
			//receives the updated array where the first element is already removed and sets the new num for the next question
			let updateSecState = newArr[0]  
			stateNum = updateSecState
			// prevlastQuestion = currentState.question
			console.log(' currentState.question ja gerne answer',  currentState.question);
			return `${currentState.question}`;
	}

}

const handleFirstQuestionProcessNSecQuestionReq = async(userAnswerData, userSelectedData) => {

	try{
		userReply  = []
	stateQuestion = []
	if(newArr.length == 2){
	      
		
		let convoArr = newArr[0]
		let updateConvoState = convoArr+=1

		const nextQuestion = brunoPromptMap[updateConvoState]?.question || "Es sind keine weiteren Fragen vorhanden.";
		const response = await client.responses.create({
		  model: 'gpt-4o',
		  input: `Antwort des users(bitte nicht drauf eingehen):\n"${userAnswerData}"\n\nAntworte kurz und knapp, höflich ohne zu bedanken. Stelle dann folgende Frage:\n"${nextQuestion}"`,
		});

		console.log('response from gpt', response);


		// Updates the client side code - stands for the list tracker
		handleUpdateState(userAnswerData, userSelectedData[0])

	
		
		// Assigns the first element towards thenext new return value for the client side 
		stateNum = newArr[0];

		newArr = newArr.filter((item) => item !== newArr[0]);
		console.log('state num after asnswerd first question starting for second question', stateNum);
		// updateQuestion = nextQuestion
	  
		return response.output_text;

	  }

	}catch(error){
		console.error('Error on handleFirstQuestionProcessNSecQuestionReq:', error);
	}
	

}

const handleSecQuestProcessNThirdQuestReq = async(userAnswerData, userSelectedData) => { 
	if(newArr.length == 1){
		console.log('in 2 second question process');
		
		
		  let addUpState = newArr[0] 
		
		  const nextState = addUpState+=1;
		  const nextQuestion = brunoPromptMap[nextState]?.question || "Es sind keine weiteren Fragen vorhanden.";
		


		  const response = await client.responses.create({
			model: 'gpt-4o',
			input: `sei höflich antworte kurz als ob du eine gute antowrt erhalten hast, aber bedanke dich nicht und stelle dann folgende Frage:\n"${nextQuestion}"`,
		  });
		  

		


		 
	
		  console.log('stateNm on handleSecQuestProcessNThirdQuestReq');
		  await handleUpdateState(userAnswerData,  stateNum)
		  stateNum = -1;
		 
		  return response.output_text;

	
	}
}


const handletextThirdProcessNLastquery = (userAnswerData, userSelectedData) => {
	if(stateNum == -1){
				
		console.log('last Question Process');
		handleUpdateState(userAnswerData, userSelectedData.at(-1))
		stateNum = 0
		newArr = []
		console.log('userReply on last call', userReply);
		console.log('stateQuestion on last call', stateQuestion);
		// userReply  = []
		// stateQuestion = []
		recordValue = 1


		return 'Super, ich habe alle Fragen notiert. Bitte navigieren Sie zur Textseite, um Ihren Befund zu bearbeiten.'
	}

}

const handleApiAgentCall = async (userDataQuery, selectedArrState, tracker) => {
		

	try{
		if(tracker <= 4){
			let stateNum = 0;
		
			console.log('userDataQuery on first request', userDataQuery);
			console.log('selectedArrState on first request' , selectedArrState);
			const currentState = brunoPromptMap[stateNum];
					  // Begrüßungsfall
			if(tracker == 0){
				const textContext = handleGreeting(userDataQuery, selectedArrState)
				
				return textContext
			}else if(tracker == 1){
				const textAgreedContext = handleUserAgreement(userDataQuery)
				return textAgreedContext
			}else if(tracker == 2){
	
				// console.log('tirggered in tracker 2');
				const textFirstProcessNSecQuestion = handleFirstQuestionProcessNSecQuestionReq(userDataQuery,selectedArrState)
				return  textFirstProcessNSecQuestion
			}else if(tracker == 3){
					const textSecProcessNThirdQuest = handleSecQuestProcessNThirdQuestReq(userDataQuery,selectedArrState)
					return textSecProcessNThirdQuest
			}else if(tracker == 4){ 
	
				
				const textThirdProcessNLastquery = handletextThirdProcessNLastquery(userDataQuery,selectedArrState)
				return textThirdProcessNLastquery
			}
		
		 }
		
	}catch(error){
		console.error('Error on handleApiAgentCall function', error);
	}



};


// Receives a data from the client side and handles the audio get call operation 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {


	const { data, selecteState, reqtracker } = await request.json();


	console.log('reqtracker',reqtracker);

	if (data) {
		const botRes = await handleApiAgentCall(data, selecteState, reqtracker );

		
		return json({botmessage: botRes, recordState: recordValue, userAnswer: userReply, userPrevQeustion: stateQuestion});
	}
	
}
