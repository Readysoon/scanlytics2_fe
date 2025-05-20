<script lang="ts">
	let resultAreaToggle = $state(false);

	const handleStartConversation = () => {
		resultAreaToggle = true;
	};
</script>

<div class="medicalConversationArea"> 
<div class="imgScanSection">
	<div class="medicalAIImageContent">
		<div class="medicalAIImageArea" style="width: {resultAreaToggle ? '50%' : '100%'};">
			<div class="medicalImageSection">
				<img
					src="form.png"
					alt="widget"
					class="amnesebogen"
					style="width: {resultAreaToggle ? '60%' : '30%'};"
				/>
			</div>
			<div class="medicalImagebtnAreaSection" on:click={handleStartConversation}>
				<button>Start Conversation</button>
			</div>
		</div>

		{#if resultAreaToggle}
			<div class="medicalResultArea">result</div>
		{/if}
	</div>
</div>
</div>

<style>

.medicalConversationArea {
		height: 96%;
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-left: 1px solid rgba(255, 255, 255, 0.175);
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}

	.imgScanSection {
		background-color: #0d1117;

		height: 100%;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.medicalAIImageContent {
		height: 100%;
		width: 100%;
		display: flex;
	}

	.medicalAIImageArea {
		height: 100%;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalImageSection {
		height: 94%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.amnesebogen {
		width: 60%;
		height: 90%;
	}
	.medicalImagebtnAreaSection {
		height: 6%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.medicalResultArea {
		height: 100%;
		width: 50%;
	}
    
</style>
