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
				Scanlytics is a company that specializes in providing advanced analytics solutions for various industries. 
				Our mission is to empower businesses with data-driven insights to enhance their decision-making processes and drive growth.
				We offer a range of services, including data analysis, predictive modeling, and machine learning solutions. Our team of experts is dedicated to delivering high-quality results and helping our clients achieve their goals.
			</p>
		</div>
		<div class="GroupImage">
			<h2>Our Team</h2>
			<div class="image-container">
				<img src="/VisianaGroupImage.jpg" alt="Group Image" />
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