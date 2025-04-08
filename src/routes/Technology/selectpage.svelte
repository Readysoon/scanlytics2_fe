<script lang="ts" module>
	import ImageUploader, { imageupload } from './ImageUploader.svelte';

	//  let toggleupload = false
	ImageUploader;

	let imageUrl = $state('') as string;
	let mlMessage: string = '';
	let mlSelectedFile: File | null = null;
	let currentStep: number = 1;
	let fileInput: HTMLInputElement;
	let imgArr = $state([]);

	const images = [`knie.jpg`, `knee2.jpg`, `knee3.jpeg`];

	export function triggerclickEvent() {
		fileInput.click();
	}

	async function handleFileChange(event: any) {
		const target = event?.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			mlSelectedFile = target.files[0];
			imageUrl = URL.createObjectURL(mlSelectedFile);
			if (imageUrl) {
				await handleImpageMultipleUpload(imageUrl);
			}
		}
	}

	function handleImpageMultipleUpload(event: any) {
		if (imgArr?.length <= 5) {
			imgArr.push(imageUrl);
		}
	}

	async function handletrigger(event: any) {
		// Uploads the image tp the select options

		console.log('mlSelectedFile', mlSelectedFile);
		if (mlSelectedFile) {
			imageupload(event, mlSelectedFile);
		} else {
			const imageFile = await handleSelectedFile(event);
			console.log('imageMockFile after convert', imageFile);

			imageupload(event, imageFile);
		}
	}

	const handleSelectedFile = async (event: any) => {
		const res = await fetch(event);
		if (!res.ok) throw new Error('Failed to fetch image');
		const blob = await res.blob();
		const imageName = event.split('/').pop() || 'unknown.jpg';
		const file = new File([blob], imageName, { type: blob.type });
		return file;
	};
</script>

<div class="boxSelectContentLayer">
	<div class="imgPrevieTitleArea">
		<p>Scans</p>
	</div>
	<div class="imgPreviewArea">
		<div class="imgPreviewAreaContent">
			{#if imageUrl}
			{#if imgArr.length > 0}
				{#each imgArr as img, i}
					<img
						src={img}
						alt="Uploaded image"
						height="300"
						width="100%"
						class="imgScan"
						on:click={() => handletrigger(img)}
					/>
				{/each}
			{/if}
		{:else}
			{#each images as image}
				<div class="defaultImageSelectionArea">
					<img
						src={image}
						alt="images"
						height="250"
						width="100%"
						on:click={() => handletrigger(image)}
					/>
				</div>
			{/each}
		{/if}

		</div>
	
	</div>

	<div class="imgPreviewAddArea">
		<div class="imgPreviewAddAreaContent">
			<input
				bind:this={fileInput}
				type="file"
				accept="image/*"
				on:change={handleFileChange}
				hidden
			/>

			<!-- <button class="read-btn" on:click={triggerclickEvent}>upload</button> -->
			<img src={'/add1.png'} alt="images" height="40px" width="40" on:click={triggerclickEvent} />
			<p>Upload Scan</p>
		</div>
	</div>
</div>

<style>
	.boxSelectContentLayer {
		/* background-color: rgba(60, 60, 60, 0.753); */
		/* background-color: rgb(157, 157, 157); */

		height: 100%;
		width: 100%;
		display: flex;
		/* gap: 10%; */
		flex-direction: column;
		align-items: center;
		/* border-right: 1px solid rgb(175, 166, 166); */

		/* padding-top: 5%; */
		/* justify-content: space-around; */
		/* overflow: auto; */
		/* border: 1px solid white; */
	}
	ul {
		text-decoration: none;
		list-style: none;
	}

	.xrLogo {
		opacity: 0.4;
		margin-bottom: 10%;
	}

	.imgPrevieTitleArea {
		height: 7%;
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25px;
		font-family: system-ui;
		opacity: 0.6;
	}
	.imgPreviewArea {
		/* background-color: rgb(214, 12, 12); */
		/* padding-top: 15%; */
		height: 83%;
		width: 100%;
		/* overflow: auto;
		display: flex; */
		/* flex-direction: column; */
		/* align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 25%;
		padding-bottom: 40%; */
		/* margin-top: 5%;
		margin-bottom: 5%; */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.imgPreviewAreaContent{
		/* background-color: rgb(214, 12, 12); */
		padding-top: 15%;
		height: 100%;
		width: 100%;
		overflow: auto;
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 26%;
		padding-bottom: 20%;
		/* margin-top: 5%;2
		margin-bottom: 5%; */
		border-top: 1px solid rgba(255, 255, 255, 0.175);

	}
	.imgScan{
		width: 50%;
		height: 40px;
	}
	.imgPreviewArea {
		overflow: auto;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}
	.imgPreviewAreaContent::-webkit-scrollbar {
		display: none; /* Chrome, Safari */
	}
	.imgPreviewAddArea {
		/* background-color: rgba(211, 210, 209, 0.64); */
		height: 10%;
		width: 100%;
		/* border-top: 1px solid rgb(175, 166, 166); */
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		opacity: 0.6;
	}

	.imgPreviewAddAreaContent {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 10%;
		color: white;
		text-align: center;
		font-family: system-ui;
	}

	.defaultImageSelectionArea {
		/* background-color: rgba(211, 210, 209, 0.64); */
		height: 33%;
		width: 100%;
	}
	.boxSelectContent {
		/* flex: 1; */
		/* margin: 30px; */
		width: 80%;
		height: 25%;
		/* padding: 10px; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		background-color: rgba(211, 210, 209, 0.64);
		border: 1px solid rgba(255, 255, 255, 0.066);
		position: relative;
	}
	.patientInfo {
		width: 97%;
		height: 10%;
		/* background-color: green; */
		/* padding: 0.2rem; */
		position: absolute;
		bottom: 1%;
		font-family: system-ui;
		color: white;
		font-size: 7px;
		font-weight: bold;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		opacity: 0.7;
	}
	.patientInfoData {
		width: 97%;
		height: 30%;
		/* background-color: green; */
		/* padding: 0.2rem; */
		position: absolute;
		top: 1%;
		font-family: system-ui;
		color: white;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: start;
		opacity: 0.8;
		font-size: 7px;
	}
	.patientB_Date {
		font-size: 7px;
	}
</style>
