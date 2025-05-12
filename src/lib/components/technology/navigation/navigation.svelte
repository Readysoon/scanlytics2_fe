<script module>
	let loadBotToggle = $state(false);

	// Handles the AI bot loading action when button is pressed
	export function loadtoggleCall() {
		loadBotToggle = !loadBotToggle;
	}
</script>

<script >
    import Wavesurfer from "../wavesurfer.svelte";
    import { createEventDispatcher } from 'svelte';
    import { Circle2 } from 'svelte-loading-spinners';


    const dispath = createEventDispatcher();
    let navAssistantToggle_Structured = $state(true);
	let navAssistantToggle_History = $state(false);


    const handleStructureNavCall = () => {
        navAssistantToggle_Structured = true
        navAssistantToggle_History = false
        dispath('structured')

    } 

    const handleHistoryCall = () => {
        navAssistantToggle_History = true
        navAssistantToggle_Structured = false
        dispath('history')


    } 

</script>


<div class="conversationNav">
    <div class="conversationNavContent">
        <div
            class="StucturedReport"
            style="background-color: {navAssistantToggle_Structured ? 'rgba(254, 127, 0, 0.767)' : '#0d1117'}"
            on:click={handleStructureNavCall}
        >
            Structured Report
        </div>
        <div
            class="MedicalReport"
            style="background-color: {navAssistantToggle_History ? '#ea7900b1' : '#0d1117'}"
            on:click={handleHistoryCall}
        >
            Medical History Report
        </div>
    </div>

    <div class="conversationBotLayer">
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
</div>


<style>
    .conversationNav {
		height: 4%;
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		display: flex;
		justify-content: space-between;
	}

	.conversationNavContent {
		width: 30%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 3%;
	}

	.conversationBotLayer {
		width: 18%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
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