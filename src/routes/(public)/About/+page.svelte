<script>
	import Layout from '../../Layout.svelte';

	import Footer from '../../Footer.svelte';
	import Header from '../../Header.svelte';

	import { isMobile } from '../../../stores/device.js';
  </script>


<main>
	<Header />

	<div class="page_container">
		<div class="Above">
			<h2>About us</h2>
		</div>
		<div class="Vision">
			<div class="Text">
				<p>
					In Scanlytics we want to create the Radiologist of the future. We want to transform their workflow from a monotonous and isolated environment to an intelligent and interactive one. In our first step we create a Conversational AI Assistant that helps Radiologists to create structured reports in a very efficient way. 
				</p>
			</div>
			<div class= "vision-image-container">
				<img src="/HighTechVision.png" alt="Group Image" />
			</div>
		</div>
		<div class="GroupImage">
			<h2>Team</h2>
			<div class="image-container">
				<img src="/ScanlyticsGroupImage4.jpg" alt="Group Image" />
			</div>
		</div>
	</div>
	<Footer />
</main>
  
  <style>
	main {
	background-color:	 rgb(0, 0, 0);
	height: 100vh;
	overflow-y: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE and Edge */
	}

.Vision {
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

.page_container {
    display: flex;
    flex-direction: column;
    flex: 1; /* Allow the content to grow */
    min-height: 100vh; /* Ensure the container takes at least the full viewport height */
    overflow: auto; /* Enable scrolling if content exceeds the viewport height */
}

.Above {
    padding-top: 70px;
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
    margin-top: 20px; /* Add some space above the group image */
	max-width: 80%;
}

.vision-image-container {
    min-width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;
    margin-right: 50px;
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
    position: relative; /* Change to relative for better flow */
    max-width: 100%; /* Ensure the image does not overflow the container */
}

@media (max-width: 1024px) {
    .image-container {
        margin-bottom: 50px;
    }
}
  </style>