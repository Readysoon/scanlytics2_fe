<script lang="ts" module>
	import ImageUploader, { imageupload } from './ImageUploader.svelte';

	ImageUploader;

	let imageUrl = $state('') as string;
	let selectedImageFile: File | null = null;
	let fileInput: HTMLInputElement;
	let imgArr = $state([]);

	// Default Images
	const images = [`knie.jpg`, `knee2.jpg`, `knee3.jpeg`];

	// clicks on the input tag
	export function triggerclickEvent() {
		fileInput.click();
	}

	// Handles image upload from local file storage and adds it to the array
	const handleFileChange = async (event: any) => {
		try {
			const target = event?.target as HTMLInputElement;
			if (target.files && target.files[0]) {
				selectedImageFile = target.files[0];
				imageUrl = URL.createObjectURL(selectedImageFile);
				if (imageUrl) {
					await handleImpageMultipleUpload(imageUrl);
				}
			}
		} catch (error) {
			console.error('Error in handleFileChange:', error);
		}
	};

	// Allows the user to upload multiple images to the selection area
	const handleImpageMultipleUpload = (event: any) => {
		try {
			if (imgArr?.length <= 5) {
				imgArr.push(imageUrl);
			}
		} catch (error) {
			console.error('Error in handleImpageMultipleUpload:', error);
		}
	};

	// Handles both uploaded images and clicks on default images
	const handleImageSelection = async (event: any) => {
		try {
			if (selectedImageFile) {
				imageupload(event, selectedImageFile);
			} else {
				const imageFile = await handleImageConversion(event);
				console.log('imageMockFile after convert', imageFile);

				imageupload(event, imageFile);
			}
		} catch (error) {
			console.error('Error in handleImageSelection:', error);
		}
	};

	// Converts the image URL to a Blob and returns it as a File object
	const handleImageConversion = async (event: any) => {
		try {
			const res = await fetch(event);
			if (!res.ok) throw new Error('Failed to fetch image');
			const blob = await res.blob();
			const imageName = event.split('/').pop() || 'unknown.jpg';
			const file = new File([blob], imageName, { type: blob.type });
			return file;
		} catch (error) {
			console.error('Error in handleImageConversion:', error);
		}
	};
</script>

<div class="scansToggleArea">
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
								on:click={() => handleImageSelection(img)}
							/>
						{/each}
					{/if}
				{:else}
					{#each images as image}
						<div class="defaultImageSelectionArea">
							<img
								src={image}
								alt="images"
								class="defaultImg"
								height="250"
								width="100%"
								on:click={() => handleImageSelection(image)}
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

				<img src={'/add1.png'} class="addImageIcon" height="40px" width="40" on:click={triggerclickEvent} />
				<p>Upload Scan</p>
			</div>
		</div>
	</div>
</div>

<style>
	.scansToggleArea {
		background-color: #0d1117;
		height: 100%;
		width: 12%;
		border-right: 1px solid rgba(255, 255, 255, 0.175);
		border-top: 1px solid rgba(255, 255, 255, 0.175);
		border-bottom: 1px solid rgba(255, 255, 255, 0.175);
	}
	.boxSelectContentLayer {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
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
		height: 83%;
		width: 100%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}

	.imgPreviewAreaContent {
		padding-top: 15%;
		height: 100%;
		width: 100%;
		overflow: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 26%;
		padding-bottom: 20%;
		border-top: 1px solid rgba(255, 255, 255, 0.175);
	}
	.imgScan {
		width: 50%;
		height: 40px;
	}
	.imgPreviewArea {
		overflow: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.imgPreviewAreaContent::-webkit-scrollbar {
		display: none;
	}
	.imgPreviewAddArea {
		height: 10%;
		width: 100%;
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
		height: 33%;
		width: 100%;
	}


	/*  ipads (e.g. 1366px - 1440px wide) */
	@media (min-width: 768px) {
	}

	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {

	.imgPreviewAddArea {
		height: 10%;
		width: 100%;
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
		font-size: 10px;
	}
	.addImageIcon{
		width: 20%;
		height: 40%;
	}
	.defaultImg {
		width: 100%;
		height: 100%;
	}
	
	.imgPrevieTitleArea {
		height: 7%;
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 19px;
		font-family: system-ui;
		opacity: 0.6;
	}

	}
	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px) {
		.imgPreviewAddArea {
		height: 10%;
		width: 100%;
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
		font-size: 13px;
	}
	.addImageIcon{
		width: 20%;
		height: 40%;
	}
	.defaultImg {
		width: 100%;
		height: 100%;
	}
	
	.imgPrevieTitleArea {
		height: 7%;
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-family: system-ui;
		opacity: 0.6;
	}

	}
	/* Large Screen */
	@media (min-width: 2560px) {
		.imgPreviewAddArea {
		height: 10%;
		width: 100%;
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
		font-size: 15px;
	}
	.addImageIcon{
		width: 20%;
		height: 50%;
	}
	.defaultImg {
		width: 100%;
		height: 100%;
	}
	
	.imgPrevieTitleArea {
		height: 7%;
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 29px;
		font-family: system-ui;
		opacity: 0.6;
	}

	}
</style>
