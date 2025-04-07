<script>
	import Layout from '../Layout.svelte';
  </script>
  
  <Layout>
	<div class="page_container">
		<div class="Above">
			<h2>Startup Information</h2>
		</div>
		<div class="Text">
			<p>
				Welcome to Scanlytics, where innovation meets healthcare excellence. We are dedicated to transforming the radiology sector by addressing critical challenges such as specialist shortages, infrastructure limitations, and access disparities. Through cutting-edge technologies and collaborative solutions, we aim to enhance diagnostic accuracy, streamline workflows, and improve patient outcomes across diverse regions. Join us on our mission to revolutionize radiology, empowering healthcare professionals and providing better care for communities worldwide.
			</p>
		</div>
		<div class="GroupImage">
			<h2>Our Team</h2>
			<div class="image-container">
				<img src="/ScanlyticsGroupImage4.jpg" alt="Group Image" />
			</div>
		</div>
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
	}

	.GroupImage img {
		max-height: 100%; /* Make image only as high as the container */
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