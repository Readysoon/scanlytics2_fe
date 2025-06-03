<script lang="ts" module>
	import axios from 'axios';
	export let onUploadSuccess: (parsedTexts: string[]) => void;
	import 'svelte-material-ui/bare.css';
	export let menuToggle;
	import ImageScroller from './ImageScroller.svelte';

	let mlMessage = $state('');
	let imgfileData: File | null = null;
	let currentStep: number = 1;
	let imgPreview = $state('');
	let openeningText: string = `Tap the microphone button on the right to begin the conversation and say "Hallo Bruno".`
	let index = 0 
	let avatarScriptText: string = $state("")
	let brunoTextLoadingState = $state(false)

	
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

<script>
	import { Application } from '@splinetool/runtime';
	let canvas: any;
	let loading: boolean = true;

	
	const handleAutoTextFillOut = () => {

		const IntervalId = setInterval(() => { 
			
			if(index < openeningText.length){
			avatarScriptText += openeningText.charAt(index);
			
			index++;
			

			}else{
				clearInterval(IntervalId)
			

			}
		}, 100)
}


	

	$effect(() => {

		
		let app = new Application(canvas);

	
		loading = true;
		
		const splineobj = app.load('https://prod.spline.design/gHGa7XTERPOXgvOV/scene.splinecode').then(() => {
			const obj = app.findObjectByName("brunov1")
			console.log('obj', obj);
		
			loading = false;
			brunoTextLoadingState = true 
			handleAutoTextFillOut()
		});
	
	})
	
</script>

<div class="image-uploader">
	<div class="imgSection">
		{#if imgPreview}
			<img src={imgPreview} class="imgPreview" alt="Uploaded image" />
		{:else}
			<!-- <img src="/xr4.png" class="xrLogo" alt="Logo" height="100" width="108"  /> -->

			<!-- <div class="placeholderObjecttext">Scanlytics AI Assistant</div> -->
			<!-- <img src={'/prostateMRI14.jpg'} class="imgPreview" alt="Uploaded image" /> -->
			<ImageScroller />

			<div class="avatarcanvas">
		
				{#if brunoTextLoadingState}
				<div class="avatarText"> 
					{avatarScriptText}
				</div>
				{/if}
				<div class="aibotAvatar">
					<canvas bind:this={canvas} class="avater"/>
				</div>
			</div>

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
		position: relative;
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

	.avatarcanvas{
		/* background-color: pink; */
		position: absolute;
		height: 30%;
		width: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		top: 75%;
		left: 85%;

	}

	@keyframes upDown {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }


	.avatarText{
		width: 100%;
		height: 35%;
		background-color: rgb(3, 32, 68);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid rgba(255, 255, 255, 0.175);
		border-radius: 7px;
		font-family: system-ui;
		color: white;
		font-size: 15px;
		position: absolute;
		top: -3%;
		left: -25%;
		z-index: 5;
		padding: 1%;
		animation: upDown 2s ease-in-out infinite;
		
	}

	.aibotAvatar{
		/* background-color: rgba(226, 17, 52, 0.619); */
		width:  100%;
		height: 90%;
		margin-top: 5%;
		/* position: absolute; */
		top: 0%;
		/* left: 70%; */
		z-index: 5;
		
	}

</style>
