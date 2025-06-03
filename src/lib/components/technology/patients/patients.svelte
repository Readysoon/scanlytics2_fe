<script lang="ts">
	import * as patientJson from '../../../../../static/patientContent.json';

    import { createEventDispatcher } from 'svelte';
	import { Application } from '@splinetool/runtime';
	let canvas: any;
	let loading: boolean = true;
	let openeningText: string = "Please click on the selected robot icon to start the reporting process:"
	let index = 0 
	let avatarScriptText: string = $state("")
	let textAutoFillState = $state(false)
	let addIcon = $state(false)
	

	

	const dispath = createEventDispatcher();

	const handleRobotClick = () => {
		dispath('robot')
		

	}

	const handleUpdateText = () => {


	const IntervalId = setInterval(() => { 
		
		if(index < openeningText.length){
		avatarScriptText += openeningText.charAt(index);
		
		index++;
		textAutoFillState = true 

		}else{
			clearInterval(IntervalId)
			addIcon = true

		}
	}, 100)

	}

	

	$effect(() => {
		console.log('trigget in effect');
		let app = new Application(canvas);

		console.log('');
		loading = true;
		const splineobj = app.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode').then(() => {
			const obj = app.findObjectByName("brunov1")
			console.log('obj', obj);
			// if (obj?.position) {
				// Adjust position
			// 	console.log('iits in postion',obj?.position);
			// 	obj.position.x += 10;
			// 	obj.position.y = 50;
			// 	obj.position.z -= -15;
			// 	}
			loading = false;
		});


		if(textAutoFillState == false){
			handleUpdateText()
		}
		
	});
</script>


<div class="medicalConversationArea"> 
<div class="imgScanSection">
	<div class="medicalAIImageContent">
		

			<div class="patientHeaderSection">
					{#if patientJson}

					<div class="patientHeaderId">{patientJson.patientHeader.IDHead}</div>
					<div class="patientHeaderDate">{patientJson.patientHeader.TimeHead}</div>

					<div class="patientHeaderName">{patientJson.patientHeader.vorNameHead}</div>
					<div class="patientHeaderName">{patientJson.patientHeader.NameHead}</div>
					<div class="patientHeaderStatus">{patientJson.patientHeader.StatusHead}</div>
					<div class="patientHeaderUntersuchung">{patientJson.patientHeader.UntersuchungHead}</div>
					<div class="patientHeaderPatientenInformationen">{patientJson.patientHeader.Patienteninformationen}</div>

					<div class="patientHeaderBericht">{patientJson.patientHeader.berichtHead}</div>
					<div class="patientHeaderFunktionen">{patientJson.patientHeader.Funktionen}</div>




				    {/if}	
					
			</div>

			<div class="patientContentSection">
				{#each patientJson.patientContent as patientData  (patientData)}

			
				<div class="patientContent"
				style="border-color: {patientData.ID >= 9 && patientData.ID <= 9 
				? 'rgba(4, 163, 249, 0.911)'
				: 'black'};
				background-color: {patientData.ID >= 9 && patientData.ID <= 9
				? 'rgba(4, 163, 249, 0.19)'
				: 'none'};
				}
				"
				>
					
					<div class="patientId">
						{patientData.ID} 
					</div>
					<div class="patientDate">
						<div>{patientData.Time}</div>

					</div>
					<div class="patientName">
						{patientData.vorName}
					</div>
					<div class="patientName">
						{patientData.Name}
					</div>

					<div class="patientStatus">
						{#if patientData.ID >= 0 && patientData.ID <= 8 }
								<img src="happy.png" alt="widget" class="emotionLogo" />
							
							{:else if  patientData.ID >= 9 && patientData.ID <= 9 }
								<img src="sad.png" alt="widget" class="emotionLogo" />

							{:else if  patientData.ID >= 10 && patientData.ID <= 13 }

								<img src="open.png" alt="widget" class="emotionLogo" />


						{/if}
					</div>

					<div class="patientUntersuchung">
						{patientData.Untersuchung}
					</div>
					

					

					<div class="patientInformationen">
						<div>
							<img src="akte.png" alt="widget" class="widgetlogoStructuredReport" />
  
						</div>
						<div>
						    <img src="klamm.png" alt="widget" class="widgetlogoKlammer" />
						</div>
						<div class="widgetlogoZeichen">
						    <img src="zeich.png" alt="widget" class="widgetlogoZeichenIcon" />
						</div>
					</div>

					<div class="patientBefundungsArt">
					
							<div>
								Dr. Weber
							</div>
							
					</div>

					<div class="patientFunktionen">
						<div class="widgetlogoRobotSection" on:click={handleRobotClick}>
							<img src="robo2.png" alt="widget" class="widgetlogoRobot" />
							 <!-- hello -->
  
						</div>
						<div class="widgetlogoAnalyseSection">
						    <img src="analy.png" alt="widget" class="widgetlogoAnalyse" />
						</div>
						
					</div>
					



				</div>
				
				<!-- <div>{patientData.Datum}</div>
				<div>{patientData.Name}</div>
				<div>{patientData.Status}</div>
				<div>{patientData.Untersuchung}</div> -->
									<!-- {patientData.ID} -->


	






		{/each}
		
			</div>

			<div class="avatarcanvas">
		
				<div class="avatarText"> 
					{avatarScriptText}
					{#if addIcon}

					<div class="fingerLogoArea">
						<img src="finger.png" alt="widget" class="fingerIcon" />
						<img src="robo2.png" alt="widget" class="TextLogoRobot" />
					</div>
					

					{/if}

					
				</div>
				<div class="aibotAvatar">
					<canvas bind:this={canvas} class="avater"/>
				</div>
			</div>
		
		
				
	</div>
</div>
</div>


<style>

.medicalConversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;
		
		border: 1px solid rgba(255, 255, 255, 0.175);
		/* padding: 0.5%; */
		/* padding-top: 0.51%;# */
	}

	.imgScanSection {
		/* background-color: rgba(245, 222, 179, 0.181); */
		background-color: #0d1117;

		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 0.5%;
		/* border-top: 1px solid rgba(255, 255, 255, 0.175); */

		
		/* border: 1px solid rgba(255, 255, 255, 0.379); */
	}

	.medicalAIImageContent {
		height: 100%;
		width: 100%;
		display: flex;
        color: white;
		flex-direction: column;
		position: relative;
		/* gap: 2%; */
		/* padding-top: 1%; */
	} 

	
	.avatarcanvas{
		/* background-color: pink; */
		position: absolute;
		height: 30%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 71%;
		left: 80%;

	}

	.avatarText{
		width: 100%;
		height: 35%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		color: white;
		/* font-size: 20px; */
		position: absolute;
		top: -3%;
		left: -25%;
		z-index: 5;
	}

	.aibotAvatar{
		/* background-color: rgba(226, 17, 52, 0.619); */
		width:  100%;
		height: 90%;
		margin-top: 5%;
		/* position: absolute; */
		top: 0%;
		/* left: 70%; */
		z-index: -0;
		
	}

	.topHeader{

		background-color: #2326281c;
		height: 2%;
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
	}

	.topHeaderItem{
		height: 50%;
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);

	}

	.patientHeaderSection{
		background-color: rgb(46, 47, 46);
		height: 4%;
		width: 100%;
		/* border-bottom: 1px solid white; */
		display: flex;
		



	}

	.patientContentSection{
		/* background: pink; */
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.9%;

	}

	.patientContent{
		display: flex;
		height: 4%;
		background-color:  rgba(163, 163, 163, 0.268);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;


		/* flex-direction: column; */
	}

	.patientContent:hover{
		background-color: rgba(2, 101, 159, 0.619);
		cursor: pointer;
	}
	
	.patientHeaderId{
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;


	}

	.patientHeaderDate{
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;


	}

	.patientHeaderName{
		width: 10%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;


	}

	.patientHeaderStatus{
		width: 5%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderUntersuchung{
		width: 17%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;

	}


	.patientHeaderBericht{

		width: 15%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderPatientenInformationen{
		
		width: 17%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
	}

	.patientHeaderFunktionen{
		width: 16%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: system-ui;

	}
	.patientId{
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;


	}

	.patientDate{
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;

	}

	.patientName{
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;

	}

	.patientStatus{
		width: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;

	}

	.patientUntersuchung{
		width: 17%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		font-size: 0.8rem;
	}

	.patientBefundungsArt{
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		display: flex;
		justify-content: center;
		font-size: 0.8rem;
	}

	.patientInformationen{
		width: 17%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		font-family: system-ui;
		
	}
	

	.patientFunktionen{
		width: 16%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-family: system-ui;
		gap: 10%;
		padding-right: 1%;
		

	}

	.widgetlogoRobotSection{
		height: 100%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.fingerLogoArea{
		/* background-color: #fff; */
		width: 37%;
		position: absolute;
		top: 65%;
		left: 69%;
		display: flex;
		gap: 10%;
		align-items: center;
	}

	.fingerIcon{
		height: 10%;
		width: 30%;
	}


	.TextLogoRobot{
		/* background-color: aqua; */
		height: 10%;
		width: 30%;
		
	}


	.widgetlogoAnalyseSection{
		height: 100%;
		width: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}



	.widgetlogoStructuredReport{
		height: 30%;
		width: 40%;
		opacity: 0.8;
		cursor: pointer;

	}

	.widgetlogoKlammer{
		height: 30%;
		width:  30%;
		opacity: 0.8;
		cursor: pointer;
	}
	.widgetlogoZeichen{
		height: 100%;
		width:  100%;
		opacity: 0.8;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.widgetlogoZeichen{
		width:  6.5%;
		cursor: pointer;
		
	}

	.widgetlogoRobot{
		height: 80%;
		width:  80%;
		opacity: 0.8;
		cursor: pointer;
	}

	.widgetlogoAnalyse{
		height: 70%;
		width:  70%;
		opacity: 0.8;
		cursor: pointer;
	}

	.emotionLogo{
		height: 50%;
		width: 20%;
	}

     
</style>
