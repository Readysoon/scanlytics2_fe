<script lang="ts" module>
	let barwidth = $state(0);
	let progress: any | undefined;

    
	// Increments the progress bar width by 1 unit at each interval
	const handleAddColor = () => {
		try {
			if (barwidth < 100) {
				barwidth += 1;
			} else {
				clearInterval(progress);
			}
		} catch (error) {
			console.log('Error in handleAddColor:', error);
		}
	};


	// Starts the progress bar animation using a timed interval
	export function handleprogressbar() {
		try {
			progress = setInterval(handleAddColor, 10);
		} catch (error) {
			console.error('Error in handleprogressbar:', error);
		}
	}
</script>

{#if barwidth != 0}
	<div id="progressbar">
		<div id="myBar" style="width: {barwidth}%"></div>
	</div>
{/if}

<style>
	#progressbar {
		width: 50%;
		height: 10px;
		background-color: grey;
		border-radius: 50px;
	}

	#myBar {
		width: 0%;
		height: 100%;
		background-color: rgb(0, 17, 255);
		border-radius: 50px;
	}
</style>
