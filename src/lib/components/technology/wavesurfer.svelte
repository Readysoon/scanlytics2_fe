<script module>
	import WaveSurfer from 'wavesurfer.js'
	import AudioRecorder, { handleAudioEnd } from './audioRecorder.svelte';
	let audioUrl = $state('');
	let container;

	export function getWaveaudi(audionode) {
		console.log('node in waveform', audionode);
		audioUrl = audionode;
		return 'ths is a test';
	}
</script>

<script>
	let container;
	import { onMount } from 'svelte';

	if (audioUrl) {
	}

	$effect(() => {
		if (audioUrl) {
			console.log('inside audiourl waversurfercall ', audioUrl);
			onMount(() => {
				// if (instance) {
				// 	console.log('Destroying previous WaveSurfer instance...');
				// 	instance.destroy();
				

				try{
				
					const instance = WaveSurfer.create({
					container: container,
					responsive: true, // Ensures it resizes with the container
					height: 30, // Match the height of your .waveform div
					waveColor: 'violet',
					progressColor: '#ea7900b1',
					
				});

				// instance.load(`${audioUrl}?t=${Date.now()}`);
				instance.load(audioUrl)
				instance.play();
				// Play the audio after loading
				instance.on('ready', () => {
					console.log('triigerd in play ');
					instance.play();
				});

				instance.on('finish', () => {
					console.log('Audio finished playing');
					handleAudioEnd();
					instance.destroy();
				});

				}catch(error){
					console.log('error on wavesurfer', error);
				}
				
			});
		}
	});
</script>

<div class="waveform">
	{#if audioUrl}
		<!-- <div use:waveform="{audioUrl}"/> -->
		<div bind:this={container} />
	{/if}
</div>

<style>
	.waveform {
		/* background-color: green; */
		width: 100%;
		height: 100%; /* or something visible */
		overflow: hidden;
		/* display: flex; */
		justify-content: center;
		/* align-items: center; */
	}
</style>
