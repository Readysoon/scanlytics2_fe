<script lang="ts" module>
	let text = $state('');

	export function bindingText(textevent: string) {
		try {
			text = textevent;
		} catch (error) {
			console.error('Error in bindingText', error);
		}
	}
</script>

<div class="text-editor">
	<textarea bind:value={text}></textarea>
</div>

<style>
	.text-editor {
		padding: 10px;
		height: 100%;
	}

	textarea {
		width: 100%;
		height: 92.2%;
		min-height: 400px;
	}

	.button-group {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
	}
</style>
