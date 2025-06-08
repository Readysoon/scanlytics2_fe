<script module>
	import WaveSurfer from 'wavesurfer.js';
	import AudioRecorder, { handleAudioStart } from './audioRecorder.svelte';
	let audioUrl = $state('');
	import { loadAiTextToggle } from '../../../routes/(public)/Technology/+page.svelte';
	let audioTracker = $state(0);
	// Receives the updated audio data
	export function getWaveaudi(audionode) {
		try {

			if(audionode){
				audioTracker+=1
			}
			audioUrl = audionode;
		} catch (error) {
			console.log('Error in getWaveaudi export function:', error);
		}
	}
</script>

<script>
	let container;
	let innerHeight;
	let innerWidth;
	let isMobile = false;
	
	import { onMount } from 'svelte';

	// Plays the WaveSurfer audio when the audioUrl state is updated
	$effect(() => {
		console.log('audioUrl state: ',audioUrl);
		

		console.log('innerwith', innerWidth);

		console.log('audioTracker', audioTracker);

		if(innerWidth <= 1500){
			console.log('inner with is smaller');
			isMobile = true
		}


		if (audioUrl && audioTracker <= 5) {
			
			onMount(() => {
				try {
					const instance = WaveSurfer.create({
						container: container,
						responsive: true,
						height: isMobile ? 20 : 30,
						waveColor: 'violet',
						progressColor: '#ea7900b1'
					});

					instance.load(audioUrl);
					instance.on('ready', () => {
						instance.play();
						console.log('is playing audio');
						loadAiTextToggle(true)
					});

					instance.on('finish', () => {
						handleAudioStart();
						console.log('is not playing audio');
						audioUrl = ''
						loadAiTextToggle(false)
						instance.destroy();
						
					});
				} catch (error) {
					console.error('error in Wavesurfer call:', error);
				}
			});
		}
	});
</script>

<svelte:window  bind:innerWidth={innerWidth} />

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
		/* background-color: #ffffff4b; */

	}
</style>
