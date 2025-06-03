<script module>
	let loadBotToggle = $state(false);
	let closeNavToggle = $state(true); //back to true - default 
	let searchToggle = $state(false);
	

	// Handles the AI bot loading action when button is pressed
	export function loadtoggleCall() {
		loadBotToggle = !loadBotToggle;
	}

	export function closeNav(navState){
		console.log('closeNav', navState);
		closeNavToggle = navState;
	}

	export function searchNav(searchState){
		console.log('searchNav', searchState);
		searchToggle = searchState;
	}
</script>

<script >
    import Wavesurfer from "../wavesurfer.svelte";
    import { createEventDispatcher } from 'svelte';
    import { Circle2 } from 'svelte-loading-spinners';


    const dispath = createEventDispatcher();
    let navAssistantToggle_Structured = $state(false);
	let navAssistantToggle_History = $state(false);
	let navAssistantToggle_Patients = $state(true);
	let patientToggle = $state(true);
	let structuredToggle = $state(false);
	let historyToggle = $state(false);
	let searchValue = $state('');

    const handleStructureNavCall = () => {
		structuredToggle = true
		historyToggle = false
		patientToggle = false
        navAssistantToggle_Structured = true
		navAssistantToggle_Patients = false
        navAssistantToggle_History = false
        dispath('structured')

    } 

    const handleSelectionCall = () => {
		historyToggle = true
		structuredToggle = false
		patientToggle = false
        navAssistantToggle_History = true
        navAssistantToggle_Structured = false
		navAssistantToggle_Patients = false

		
		
        dispath('selection')


    } 

	const handlePatientCall = () => { 
	 patientToggle = true
	 structuredToggle = false
	 historyToggle = false
	 navAssistantToggle_Patients = true
	 navAssistantToggle_History = false
	 navAssistantToggle_Structured = false
	
	dispath('patient')


	}

</script>


<div class="conversationNav">
	{#if searchToggle}
	
		<div class="searchNavSection">
			<div class="interGlobeBtnArea">
				
				 <div class="GlobeBtnIcon">
					<img src="user2.png" alt="Microphone" class="userIcon" />
				 </div>
				 <div class="searchInputArea">
					<input type="text" bind:value={searchValue} placeholder="Search "  class="searchInput"/>
					

				 </div>

				</div>
		</div>
	

	{:else}
    <div class="conversationNavContent">
		        <!-- <div class="userNav"
				style="background-color: {patientToggle ? '#0a39c669' : '#0d1117'}"
				on:click={handlePatientCall}

				>
				 <img src="user.png" alt="Microphone" class="userIcon" />
				</div> -->

				{#if closeNavToggle}
				<div class="scanAddbtn">
					<img src="addIcon.png" alt="widget" class="addIcon" />
				</div>
				{:else}
				<div class="BrunoTitleArea">
					<p> Bruno v.0.3 Conversational AI Assistant</p>
				</div>
				{/if}
				<!-- <div class="interGlobeBtnArea"
				
				

				>
				
				 <div class="GlobeBtnIcon">
					<img src="globe.png" alt="Microphone" class="userIcon" />
				 </div>
				 <div class="searchInputArea">
					<input type="text" bind:value={searchValue} placeholder="Search "  class="searchInput"/>
					

				 </div>

				</div> -->
				<!-- <div class="StructuredNav"
				style="background-color: {structuredToggle ? '#0a39c669' : '#0d1117'}"
				on:click={handleStructureNavCall}

				>
					
				 <img src="tree.png" alt="Microphone" class="userIcon" />
				</div> -->
		
		<!-- <div
				class="MedicalReport"
				style="background-color: {navAssistantToggle_Patients ? 'rgba(254, 127, 0, 0.767)' : '#0d1117'}"
				on:click={handlePatientCall}
		>
				Patients
			</div>
		 -->
			<!-- <div
		class="MedicalReport"
		style="background-color: {navAssistantToggle_History ? 'rgba(254, 127, 0, 0.767)' : '#0d1117'}"
		on:click={handleSelectionCall}
	>
		 Form Selection
	</div> -->
		
        <!-- <div
            class="StucturedReport"
            style="background-color: {navAssistantToggle_Structured ? 'rgba(254, 127, 0, 0.767)' : '#0d1117'}"
            on:click={handleStructureNavCall}
        >
            Structured Report
        </div> -->
       
	
    </div>

    <div class="conversationBotLayer">
	
		
		<!-- <div class="patientNav"
		on:click={handlePatientCall}
		>
			<img src="user.png" alt="Microphone" class="userIcon" />
		</div>
		<div class="scanNav"
		on:click={handleSelectionCall}
		>
			<img src="scan.png" alt="Microphone" class="scanIcon" />
		</div> -->
		<!-- <div class="GlobeBtnArea">
			<img src="globe.png" alt="Microphone" class="globeIcon" />
		</div> -->

        <div class="botNav">
            {#if loadBotToggle}
                <Circle2 size="25" colorOuter="orange" unit="px" durationInner="3s" />
            {:else}
                <img src="/robo.png" alt="Microphone" class="roboIcon" />
            {/if}

            <!-- <img src="/robo.png" alt="Microphone" class="roboIcon" /> -->
        </div>
        <div class="blockContentSection">
            <div class="botContent">
                <Wavesurfer />
            </div>
        </div>
    </div>
	{/if}
</div>


<style>
    .conversationNav {
		height: 4%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		justify-content: space-between;
		background-color: #0d1117;
	}

	.conversationNavContent {
	
		width:30%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content:  flex-start;
		gap: 3%;
		/* background: green; */
	}
	.searchNavSection{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: pink; */
	}
	.scanAddbtn{
		height: 100%;
		width: 7%;
		display: flex;
		/* background-color: red; */
		justify-content: center;
		align-items: center;	
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	
	}
	.BrunoTitleArea{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: white;
		font-family: system-ui;
		font-weight: 600;
		font-size: 19px;
		padding-left: 10px;
		opacity: 0.4;
		
	}
	.addIcon{
		height: 50%;
		width: 50%;
		/* opacity: 0.5; */
	}

	.conversationBotLayer {
		width: 19%; 
		/* width: 27% with the other navigation props */
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		/* background-color: red; */
	}

	.botNav {
		height: 100%;
		width: 15%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.GlobeBtnArea{
		height: 100%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: green; */
		border-left: 1px solid rgba(255, 255, 255, 0.175);
	}

	.scanNav{
		height: 100%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: green; */
		border-left: 1px solid rgba(255, 255, 255, 0.175);
	}

	.patientNav{
		height: 100%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: green; */
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	}

	.scanIcon{
		height: 50%;
		width: 40%;
		opacity: 0.9;
		cursor: pointer;
	}
	.globeIcon{
		height: 50%;
		width: 40%;
		opacity: 0.9;
		cursor: pointer;
		/* opacity: 0.5; */
	}
	.userIcon{
		height: 80%;
		width: 50%;
		opacity: 0.9;
	}
	.interGlobeBtnArea{
		
		height: 70%;
		width: 23%;
		background-color: rgba(240, 242, 244, 0.091);
		/* border-left: 1px solid rgba(255, 255, 255, 0.175); */
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		/* justify-content: center; */
		/* cursor: pointer; */
		border-radius: 7px;
		border: 1px solid rgba(255, 255, 255, 0.175);	
	}

	.GlobeBtnIcon{

		height: 100%;
		width: 10%;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.searchInputArea{
		height: 100%;
		width: 90%;
		/* border-radius: 50px; */
		/* background-color: transparent; */
		/* background-color: rgba(240, 242, 244, 0.091); */
	}
	.searchInput{
		height: 100%;
		width: 90%;
		/* border-radius: 50px; */
		background-color: transparent;
		/* background-color: rgba(240, 242, 244, 0.091); */
		border: none;
		outline: none;
		color: white;
		padding-left: 10px;
		font-size: 17px;
		font-family: system-ui;
		
	}
	.userNav{
		/* background-color: #ffa3a3(255, 255, 255, 0.175); */
		height: 100%;
		width: 10%;
		/* border-left: 1px solid rgba(255, 255, 255, 0.175); */
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;


	}




	

	.blockContentSection {
		height: 100%;
		width: 85%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-right: 3%;
	}

	.roboIcon {
		height: 70%;
		width: 50%;
		opacity: 0.9;
		cursor: pointer;
	}


	.botContent {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		background: linear-gradient(
				to top left,
				rgba(0, 0, 0, 0.7),
				rgba(37, 37, 37, 0.4),
				rgba(0, 0, 0, 0.4)
			),
			linear-gradient(rgba(255, 255, 255, 0.175) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.175) 1px, transparent 1px);
		background-size:
			cover,
			30px 10px,
			10px 10px;

		width: 97%;
		height: 70%;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.175);
	}

	.StucturedReport {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		color: white;
		font-family: system-ui;
		cursor: pointer;
	}
	.MedicalReport {
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 1%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		color: white;
		font-family: system-ui;
		cursor: pointer;
	}

    @media (max-width: 420px) {
        .conversationNav {
			display: none;
		}
    }
</style>