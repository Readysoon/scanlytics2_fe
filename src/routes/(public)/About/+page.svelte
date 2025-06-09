<script>
	import Layout from '../../Layout.svelte';

	import Footer from '../../Footer.svelte';
	import Header from '../../Header.svelte';

	import { isMobile } from '../../../stores/device.js';
</script>

<main>
	<Header />

	<div class="page_container">
		

		<div class="Vision">
			<div class="Text-container">
				<div class="Text-container-content">
					<div class="Text-container-content-header">
						<h2>Team</h2>
					</div>
					<div class="Text-container-content-Text">
						<p>
							At Scanlytics, we want to write the next chapter in medical reporting. We are a team
							of students currently exploring the medical landscape in Germany. With our
							conversational AI solution, we aim to support radiology from the ground up. We are
							dreaming of a world where technological advancement meets human imagination. We focus
							on improving repetitive workflows, enabling opportunities, and unlocking potential
							areas for advancement. We are Scanlytics.
						</p>
					</div>
				</div>
			</div>
			<div class="image-container">
                <div class="imageItem">
                    <img src="/ScanlyticsGroupImage4.jpg" alt="Group Image" class="image-content" />
                </div>
				<!-- <img src="/HighTechVision.png" alt="Group Image" /> -->
				
			</div>
		</div>

		<div class="PartnerHeader">
			<h2>Partner</h2>
		</div>

		<div class="PartnerContent">Partners</div>
	</div>
	<Footer />
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow: auto;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.page_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* height: 100vh; Allow the content to grow */
		min-height: 100vh;
		/* flex-wrap: wrap; */
		overflow: auto;
		/* overflow: auto; Enable scrolling if content exceeds the viewport height */
		/* align-items: center; */

		/* gap: 40px; */
		/* background-color: pink; */
	}

	.Above {
		/* background-color: orange; */
		width: 100%;
		height: 8vh;
		/* padding-top: 70px; */
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 29px;
	}

	.PartnerHeader {
		width: 100%;
		height: 8vh;
		padding-left: 2%;
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 29px;
		/* background-color: orange; */
		margin-top: 20%;
		/* border-top: 1px solid rgba(255, 255, 255, 0.359); */
		/* border-top: 1px solid white ; */
	}

	.PartnerContent {
		height: 50%;
		width: 100%;
		/* background-color: #ffffff0c; */
		height: 40vh;
	}

	.PartnerSection {
		height: 20%;
		width: 100%;
		background-color: pink;
	}

	.PartnerHeader h2 {
		color: white;
		font-family: system-ui;
	}

	.Vision {
		/* background-color: rgba(115, 226, 115, 0.175); */
		flex-direction: row;
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		/* text-align: center; */
		height: 40vh;
		width: 100%;
		/* flex-grow: 1; */
	}

	.Above h2 {
		color: white;
		font-family: system-ui;
	}

	.Text-container {
		/* background-color: orangered; */
		flex-direction: row;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		text-align: center;
		height: 100%;
		width: 59%;
	}

	.Text-container-content {
		/* background-color: #242121; */
		width: 80%;
		height: 100%;
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		font-size: 27px;
		flex-direction: column;
		gap: 1%;
	}

	.Text-container-content-header {
		/* background-color: grey; */
		height: 13%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
		font-family: system-ui;
		width: 100%;
	}
	.Text-container-content-Text {
		/* background-color: rgb(234, 90, 90); */
		height: 87%;
		display: flex;
		justify-content: center;
		/* align-items: center;  */
	}

	.Text-container-content-Text p {
		color: white;
		width: 90%;
		/* padding-top: 15px; */
		text-align: center;
		font-family: system-ui;
		font-weight: 700;
		opacity: 0.8;
		font-size: 26px;
	}

	.image-container {
		/* background-color: pink; */
		width: 40%;
		display: flex;
		justify-content: center;
		align-items: center;
		/* flex-grow: 1; */
		/* position: relative; */
	}

	.image-content {
		/* background-color: green; */
	}

	.GroupImage {
		/* background: pink; */
		display: flex;
		flex-direction: row-reverse;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		/* gap: 40px; */
		/* margin-top: 20px; Add some space above the group image */
		/* max-width: 80%; */
		width: 100%;
		padding-left: 2%;
		/* height: 40vh; */
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




    /* Mobile screens */
	@media (min-width: 320px) and (max-width: 460px){
        .Vision {
			/* background-color: rgba(201, 13, 13, 0.175); */
			flex-direction: column !important;
			display: flex;
			/* justify-content: center; */
			/* align-items: center; */
			/* text-align: center; */
            min-height: 100%;
            /* height: 100%; */
			height: 80vh;
			width: 100%;
            margin-top: 6%;
			/* flex-grow: 1; */
		}

		.PartnerHeader {
			width: 100%;
			height: 8vh;
			padding-left: 2%;
			flex-direction: column;
			display:  none;
			justify-content: center;
			align-items: center;
            font-size: 18px;
			/* background-color: orange; */
        
			/* margin-top: 2%; */
			/* border-top: 1px solid rgba(255, 255, 255, 0.359); */
			/* border-top: 1px solid white ; */
		}

		.PartnerContent {
			height: 50%;
			width: 100%;
			/* background-color: #ffffff0c; */
			

        }
        .Text-container {
			/* background-color: orangered; */
            height: 60%;
			width: 100%;
            /* display: flex; */
			/* flex-direction: column; */
			/* justify-content: center; */
			/* align-items: center; */
			/* font-size: 20px; */
			/* text-align: center; */
			
		}

        
	.Text-container-content {
		/* background-color: #e01b1b; */
		width: 100%;
		height: 100%;
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		/* font-size: 18px; */
		flex-direction: column;

		/* gap: 30px; */
	}

    .Text-container-content-header {
		/* background-color: grey; */
		height: 20%;
        width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
        font-size: 18px;
		font-family: system-ui;
		
	}
    .Text-container-content-Text {
		/* background-color: rgb(234, 90, 90); */
		height: 70%;
        width: 100%;
		display: flex;
		justify-content: center;
        font-size: 4px;
        /* color: green; */
		/* align-items: center;  */
	}
    .Text-container-content-Text p {
		color: white;
		width: 90%;
		/* padding-top: 15px; */
		text-align: center;
		font-family: system-ui;
		font-weight: 700;
		opacity: 0.8;
		font-size: 14px;
	}
	

        
	.image-container {
		/* background-color: pink; */
		width: 100%;
        height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
        margin-top: 5%;
		/* flex-grow: 1; */
		/* position: relative; */
	}


		/* .Vision {
			flex-direction: column !important;
		} */

		.vision-image-container {
			margin-top: 50px;
			margin-left: 90px;
			margin-right: 90px;
		}

    }




	/* Small laptops (e.g. 1366px - 1440px wide) */
	@media (min-width: 1280px) {
		.Vision {
			/* background-color: rgba(201, 13, 13, 0.175); */
			flex-direction: row !important;
			display: flex;
			/* justify-content: center; */
			/* align-items: center; */
			/* text-align: center; */
			height: 70vh;
			width: 100%;
			/* flex-grow: 1; */
		}
        

		
	}

	/* Mid laptops (your 1807px screen) */
	@media (min-width: 1700px) {
	}

	/* Ultra-wide screens (e.g. 2560px) */
	@media (min-width: 2560px) {
        .Vision {
			/* background-color: rgba(201, 13, 13, 0.175); */
			flex-direction: row !important;
			display: flex;
			/* justify-content: center; */
			/* align-items: center; */
			/* text-align: center; */
			height: 40vh;
			width: 100%;
			/* flex-grow: 1; */
		}

		.PartnerHeader {
			width: 100%;
			height: 8vh;
			padding-left: 2%;
			flex-direction: row;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 29px;
			/* background-color: orange; */
			margin-top: 2%;
			/* border-top: 1px solid rgba(255, 255, 255, 0.359); */
			/* border-top: 1px solid white ; */
		}

		.PartnerContent {
			height: 50%;
			width: 100%;
			/* background-color: #ffffff0c; */
			

        }
	}
</style>
