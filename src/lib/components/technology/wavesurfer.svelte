<script module>
	import WaveSurfer from 'wavesurfer.js';
	import AudioRecorder, { handleAudioEnd } from './audioRecorder.svelte';
	let audioUrl = $state('');


	export function getWaveaudi(audionode) {
		console.log('node in waveform', audionode);
		audioUrl = audionode;
		return 'ths is a test';
	}
	export async function waveform(node) {

		try {

			const wavesurfer = WaveSurfer.create({
				container: node,
				responsive: true, // Ensures it resizes with the container
				height: 30, // Match the height of your .waveform div
				waveColor: 'violet',
				progressColor: '#ea7900b1'
			});

			wavesurfer.load(`${audioUrl}?t=${Date.now()}`);
			wavesurfer.play();

			wavesurfer.on('finish', () => {
				console.log('Audio finished playing');
				handleAudioEnd()
				wavesurfer.destroy();
				
			});
		} catch (error) {
			console.log('Error on waveform', error);
		}
	}

	console.log('audio tack');

	


	
</script>

<div class="waveform">
	{#if audioUrl}
		<div use:waveform="{audioUrl}"/>
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
