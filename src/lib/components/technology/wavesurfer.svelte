<script module>
	import WaveSurfer from 'wavesurfer.js';
	import AudioRecorder, { handleAudioEnd } from './audioRecorder.svelte';
	let audioUrl = $state('');

	// Receives the updated audio data
	export function getWaveaudi(audionode) {
		audioUrl = audionode;
	}
</script>

<script>
	let container;
	import { onMount } from 'svelte';

	// Plays the WaveSurfer audio when the audioUrl state is updated
	$effect(() => {
		if (audioUrl) {
			onMount(() => {
				try {
					const instance = WaveSurfer.create({
						container: container,
						responsive: true,
						height: 30,
						waveColor: 'violet',
						progressColor: '#ea7900b1'
					});

					instance.load(audioUrl);
					instance.on('ready', () => {
						instance.play();
					});

					instance.on('finish', () => {
						handleAudioEnd();
						instance.destroy();
					});
				} catch (error) {
					console.log('error on wavesurfer', error);
				}
			});
		}
	});
</script>

<div class="waveform">
	{#if audioUrl}
		<div bind:this={container} />
	{/if}
</div>

<style>
	.waveform {
		width: 100%;
		height: 100%;
		overflow: hidden;
		justify-content: center;
	}
</style>
