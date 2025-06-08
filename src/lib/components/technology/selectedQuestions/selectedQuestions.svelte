<script lang="ts" module>
	import { Parts } from 'openai/resources/uploads/parts';

	let selectedQuestions = $state([]);
	let questionArray: number[] = $state([]);
	let questionBackgroundState = $state([]);
	export function handleSelectedQuestions(itemArray: any) {
		selectedQuestions = itemArray;
	}

	export function handleSelectUpdateBackground(item: any) {
		console.log('item', item);
		questionBackgroundState = item;
	}

	// selectedQuestions = [0,1,2,3,4]
</script>

<div class="selectedQuestions">
	{#each selectedQuestions as item, index (item)}
		<!-- <p>{item}</p> -->

		<div
			class="questionNumber"
			style="background-color: {questionBackgroundState.includes(item)
				? 'rgba(18, 120, 230, 0.751)'
				: 'rgba(211, 211, 235, 0.105)'} "
		>
			<p>{index}</p>
		</div>
	{/each}
</div>

<style>
	.selectedQuestions {
		display: flex;
		flex-direction: column;
		gap: 50px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		padding-top: 45%;
		/* padding-bottom: 100px; */

		/* background-color: green; */
	}

	.questionNumber {
		background: rgba(18, 120, 230, 0.751);
		/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
		height: 4%;
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 20px;
		font-weight: 400;
		margin-bottom: 10px;
		font-family: system-ui;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.175);
		cursor: pointer;
	}

    /* Iphone Screen */
	/* @media (min-width: 320px) and (max-width: 460px) {
	} */
	/*  Ipads Screen (e.g. 1366px - 1440px wide) */
	/* @media (min-width: 768px) {
	} */
	/* Small Screen (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {
		.questionNumber {
			background: rgba(18, 120, 230, 0.751);
			/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
			height: 4%;
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 12px;
			font-weight: 400;
			margin-bottom: 10px;
			font-family: system-ui;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;
		}
	}

	/* Mid Screen (your 1807px screen) */
	@media (min-width: 1700px) {
		.questionNumber {
			background: rgba(18, 120, 230, 0.751);
			/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
			height: 4%;
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 15px;
			font-weight: 400;
			margin-bottom: 10px;
			font-family: system-ui;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;
		}
	}

	/* Large Screen */
	@media (min-width: 2560px) {
		.questionNumber {
			background: rgba(18, 120, 230, 0.751);
			/* border-bottom: 1px solid rgba(255, 255, 255, 0.175); */
			height: 4%;
			width: 70%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 20px;
			font-weight: 400;
			margin-bottom: 10px;
			font-family: system-ui;
			border-radius: 50%;
			border: 1px solid rgba(255, 255, 255, 0.175);
			cursor: pointer;
		}
	}
</style>
