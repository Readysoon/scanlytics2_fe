<script>
	import Layout from '../../Layout.svelte';

	import ImageScroller from '$lib/components/technology/ImageScroller.svelte';

	import { isMobile } from '../../../stores/device.js';
  </script>
  
  <Layout>
	<div class="page_container">
		<div class="Above">
			<h2>Test Image Scroller</h2>
		</div>
		<div class="Text">
			<p>
				Scroll through the images using your mouse wheel or touchpad. This is a test page to demonstrate the image scroller functionality. The images are loaded dynamically, and you can scroll through them seamlessly.
			</p>
		</div>
		<ImageScroller />
	</div>
  </Layout>
  
  <style>
	.page_container {
		display: flex;
		flex-direction: column;
		height: 100%; /* This is essential to make the content not overlap the footer */
		flex: 1; /* This is essential to make the content not overlap the footer */
	}

	.Above {
		padding-top: 10px;
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Above h2 {
		color: white;
		font-family: system-ui;
	}

	.Text {
		flex-direction: row;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Text p {
		color: white;
		width: 70%;
		padding-top: 15px;
		text-align: center;
		font-family: system-ui;
	}

	.GroupImage {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	.image-container {
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		position: relative;
	}

	.GroupImage h2 {
		padding-top: 20px;
		color: white;
		font-family: system-ui;
	}

	.GroupImage img {
		max-height: 100%; /* Make image only as high as the container */
		padding-top: 10px;
		width: auto; /* Maintain aspect ratio */
		object-fit: contain; /* Ensure the image fits within the container */
		position: absolute; /* Position absolutely within the container */
		top: 0;
		bottom: 0;
		margin: auto; /* Center vertically */
	}

	@media (max-width: 1024px) {
		.image-container {
			margin-bottom: 50px;
		}
	}

  </style>