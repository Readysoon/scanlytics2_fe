<script lang="ts" module>
	import axios from 'axios';
	export let onUploadSuccess: (parsedTexts: string[]) => void;
	import 'svelte-material-ui/bare.css';
	export let menuToggle;

	let mlMessage = $state('');
	let imgfileData: File | null = null;
	let currentStep: number = 1;
	let imgPreview = $state('');

	if (menuToggle) {
		console.log('triggered the menutoggle');
	}
	const uploadToML = async () => {
		// handleprogressbar()

		if (imgfileData == null) {
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
			console.error('Error uploading file to ML:', error);
			mlMessage = 'Error uploading file to ML';
		}
	};

	const handleResponseArr = async (backendresData: any) => {
		console.log('backendresData1', backendresData);
		if (Array.isArray(backendresData) && backendresData.length > 0) {
			console.log('in array section');

			const parsedTexts = backendresData.map((item: { text: string }) => parseText(item.text));

			console.log('parsedText', parsedTexts);
			if (parsedTexts) {
				mlMessage = 'File uploaded successfully!';
				onUploadSuccess(parsedTexts);
				goToNextStep(); //
			}
		} else {
			mlMessage = 'Server starting... Please generate again.';
		}
	};

	function parseText(text: string) {
		return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
			return options.split(',')[0];
		});
	}

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
			<img src={imgPreview} class="imgPreview" alt="Uploaded image" />
		{:else}
			<img src={'/knee2.jpg'} class="imgPreview" alt="Uploaded image" />
		{/if}
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
		height: 100%;
	}

	.imgSection {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		flex-wrap: wrap;
		gap: 10px;
	}
	.imgPreview {
		width: 80%;
		height: 100%;
		background-size: cover;
	}

	img {
		max-width: 100%;
		height: auto;
		margin-top: 10px;
	}

	p {
		margin-top: 10px;
		color: red;
	}
</style>
