<script>
	import Layout from '../Layout.svelte';
  </script>
  
  <Layout>
	<div class="page_container">
		<div class="Above">
			<h2>Project Information</h2>
		</div>
		<div class="Text">
			<p>
				Welcome to Scanlytics, where innovation meets healthcare excellence. We are dedicated to transforming the radiology sector by addressing critical challenges such as specialist shortages, infrastructure limitations, and access disparities. Through cutting-edge technologies and collaborative solutions, we aim to enhance diagnostic accuracy, streamline workflows, and improve patient outcomes across diverse regions. Join us on our mission to revolutionize radiology, empowering healthcare professionals and providing better care for communities worldwide.
			</p>
		</div>
		<div class="GroupImage">
			<h2>Our Team</h2>
			<div class="image-container">
				<img src="/ScanlyticsGroupImage.jpg" alt="Group Image" />
			</div>
		</div>
	</div>
  </Layout>
  
  <style>
	.page_container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.Above {
		height: 15%;
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
		height: 20%;
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
		padding-top: 10px;
		width: auto;
		height: 65%;
		overflow: hidden;
	}

	.image-container {
		max-height: 80%;
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.GroupImage img {
		max-height: 450px;
		max-width: 100%;
		object-fit: contain;
		height: auto;
		width: auto;
	}

  </style>