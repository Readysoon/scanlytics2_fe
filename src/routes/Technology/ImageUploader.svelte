<script lang="ts" module>
	import axios from 'axios';
	export let onUploadSuccess: (parsedTexts: string[]) => void;
	// import TextList, from './TextList.svelte';
	import TextEditor, { handleCirleBarCall } from './TextEditor.svelte';
	import { onMount, onDestroy } from 'svelte';
	import CircularProgress from '@smui/circular-progress';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import Button from '@smui/button';
	import 'svelte-material-ui/bare.css';
	import { writable } from 'svelte/store';
	import loading, { handleprogressbar } from './loadingbar.svelte';
	let progress = 0;
	let closed = false;
	let timer: ReturnType<typeof setInterval>;
	let imageUrl = $state('');
	let mlMessage = $state('');
	let imgfileData: File | null = null;
	let mlSelectedFile: File | null = null;
	let currentStep: number = 1;
	let imgPreview = $state('');

	const uploadToML = async () => {
		// handleprogressbar()

		if (imgfileData == null) {
			handleCirleBarCall(false);
			mlMessage = 'Please select a file first.';
			return;
		}

		const backendresData = await sendImgDataToBackend(imgfileData);

		if (backendresData) {
			await handleResponseArr(backendresData);
		}
	};

	const sendImgDataToBackend = async (imgfileData: File) => {
		try {
			handleCirleBarCall(true);
			console.log('imgfileData in api call data:', imgfileData);
			const formData = new FormData();
			formData.append('file', imgfileData);

			const response = await axios.post('https://scanlytics2-be.fly.dev/ml', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			console.log('responseData', response.data);
			return response.data;
		} catch (error) {
			handleCirleBarCall(false);
			console.error('Error uploading file to ML:', error);
			mlMessage = 'Error uploading file to ML';
		}
	};

	const handleResponseArr = async(backendresData: any) => {


		console.log('backendresData', backendresData);
		if (Array.isArray(backendresData) && backendresData.length > 0) {
			handleCirleBarCall(true);
			console.log('in array section');
			
			const parsedTexts = backendresData.map((item: { text: string }) => parseText(item.text));

			console.log('parsedText', parsedTexts);
			// What does this function
			onUploadSuccess(parsedTexts);
			mlMessage = 'File uploaded successfully!';
			goToNextStep(); // Move to the next step
		} else {
			handleCirleBarCall(false);

			mlMessage = 'Server starting... Please generate again.';
		}
	};

	function parseText(text: string) {
		return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
			return options.split(',')[0];
		});
	}

	// What does this function do?

	function goToNextStep() {
		const step1 = document.getElementById('step-1');
		const step2 = document.getElementById('step-2');
		if (step1 && step2) {
			step1.classList.remove('active');
			currentStep = 2;
			step2.classList.add('active');
		}
	}

	export function imageupload(event: any, selectedImgFileData: any) {
		if (event) {
			imgPreview = event;

			imgfileData = selectedImgFileData;
			if (imgfileData) {
				mlMessage = '';
			}
		}
	}
</script>

<div class="image-uploader">
	<div class="imgSection">
		{#if imgPreview}
			<img src={imgPreview} class="imgPreview" alt="Uploaded image" height="400px" width="500" />
		{:else}
			<div class="placeholderObjecttext">Select an Object</div>
		{/if}
		<!-- {#if imageUrl}  
		{#if imgArr.length > 0}
    
    <ul>

    
    {#each imgArr as img, i}
    
      <img src={img} alt="Uploaded image" height="40px" width="50" />


     {/each}
    </ul>
    {/if}
		{:else}
			<div class="placeholderObjecttext">Select an Object</div>
		{/if} -->
	</div>

	<div class="btnSection">
		<!-- <input bind:this={fileInput} type="file" accept="image/*" on:change={handleFileChange} hidden /> -->
		<button on:click={uploadToML}>Generate Report</button>
		<!-- <button on:click={uploadImageToMl}>Generate Report</button> -->
	</div>

	{#if mlMessage}
		<p>{mlMessage}</p>
	{/if}
</div>

<style>
	.image-uploader {
		display: flex;
		flex-direction: column;
		text-align: center;
		box-sizing: border-box;
		width: 100%;
		height: 100%; /* Extend to full height of the container */
	}

	.imgSection {
		/* background-color: rgb(0, 255, 166); */

		height: 90%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		flex-wrap: wrap;
		gap: 10px;
	}
	.imgPreview {
		width: 400px; /* Set the desired width */
		height: 390px; /* Set the desired height */
	}
	.btnSection {
		height: 10%;
		border-top: 1px solid rgb(175, 166, 166);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	img {
		max-width: 100%;
		height: auto;
		margin-top: 10px;
	}
	button {
		margin-top: 10px;
	}
	p {
		margin-top: 10px;
		color: red;
	}
	.placeholderObjecttext {
		font-size: 25px;
		font-weight: bold;
		font-family: sans-serif;
		color: rgba(0, 0, 0, 0.403);
	}
</style>
