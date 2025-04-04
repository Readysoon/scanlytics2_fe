<script>
	import Layout from '../Layout.svelte';
  </script>
  
  <Layout>
	<div class="page_container">
		<div class="Above">
			Company Information
		</div>
		<div class="Text">
			Scanlytics is a company that specializes in providing advanced analytics solutions for various industries. Our mission is to empower businesses with data-driven insights to enhance their decision-making processes and drive growth.
			We offer a range of services, including data analysis, predictive modeling, and machine learning solutions. Our team of experts is dedicated to delivering high-quality results and helping our clients achieve their goals.
		</div>
		<div class="GroupImage">
			<img src="/logow.jpg" alt="Logo" height="100" width="100" />
		</div>
	</div>
  </Layout>
  
  <style>
	.page_container {
		background-color: blueviolet;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.Above, .Text , .GroupImage {
		background-color: white;
		flex: 1;
	}

  </style>