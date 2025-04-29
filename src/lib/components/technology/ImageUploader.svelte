<script lang="ts" module>
	import axios from 'axios';
	export let onUploadSuccess: (parsedTexts: string[]) => void;
	import 'svelte-material-ui/bare.css';
	export let menuToggle;

	let mlMessage = $state('');
	let imgfileData: File | null = null;
	let currentStep: number = 1;
	let imgPreview = $state('');

	
	const uploadToML = async () => {
		try {
			if (imgfileData == null) {
				mlMessage = 'Please select a file first.';
				return;
			}

			const backendresData = await handleRequestToClassifier(imgfileData);

			if (backendresData) {
				await handleResponseArr(backendresData);
			}
		} catch (error) {
			console.error('Error in uploadToML:', error);
		}
	};

	const handleRequestToClassifier = async (imgfileData: File) => {
		try {
			const formData = new FormData();
			formData.append('file', imgfileData);

			const response = await axios.post('https://scanlytics2-be.fly.dev/ml', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			console.error('Error in handleRequestToClassifier', error);
		}
	};

	const handleResponseArr = async (backendresData: any) => {
		if (Array.isArray(backendresData) && backendresData.length > 0) {
			const parsedTexts = backendresData.map((item: { text: string }) => parseText(item.text));
			if (parsedTexts) {
				mlMessage = 'File uploaded successfully!';
				onUploadSuccess(parsedTexts);
				goToNextStep(); //
			}
		} else {
			mlMessage = 'Server starting... Please generate again.';
		}
		try {
		} catch (error) {
			console.error('Error in handleResponseArr:', error);
		}
	};

	// Handels text processing
	function parseText(text: string) {
		try {
			return text.replace(/\[dropdown:([^\]]+)\]/g, (match, options) => {
				return options.split(',')[0];
			});
		} catch (error) {
			console.error('Error in parseText:', error);
		}
	}

	function goToNextStep() {
		try {
			const step1 = document.getElementById('step-1');
			const step2 = document.getElementById('step-2');
			if (step1 && step2) {
				step1.classList.remove('active');
				currentStep = 2;
				step2.classList.add('active');
			}
		} catch (error) {
			console.error('Error in goToNextStep:', error);
		}
	}

	export function imageupload(event: any, selectedImgFileData: any) {
		try {
			if (event) {
				imgPreview = event;

				imgfileData = selectedImgFileData;
				if (imgfileData) {
					mlMessage = '';
				}
			}
		} catch (error) {
			console.error('Error in imageupload export function:', error);
		}
	}
</script>

<div class="image-uploader">
	<div class="imgSection">
		{#if imgPreview}
			<img src={imgPreview} class="imgPreview" alt="Uploaded image" />
		{:else}
			<img src={'/prostateMRI14.jpg'} class="imgPreview" alt="Uploaded image" />
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
