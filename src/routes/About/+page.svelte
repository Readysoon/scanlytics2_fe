<script lang="ts">
	import Footer from "../Footer.svelte";
  	import Header from "../Header.svelte";

	let impressState: boolean = false;
	let DatenschutzState: boolean = false;
	function redirectUser(){ 
	window.location.href = 'https://calendly.com/tobias-wedel-code/30min';

	}


	const handleImpressumClick = () => { 
		impressState = !impressState
	}

	
	const handleDatenschutzClick = () => { 
		DatenschutzState = !DatenschutzState
	}

</script>

<main>

	<Header />

	<div class="mainSection">
		<div class="mainLeftContentSection">
			<div class="profileCard">
				<di class="profileImageCardSection" >
					<img src="/Philipp_circle_portrait.png"  class="userProfileImg" height="100" width="100" />

				</di>
				<div class="profileCardNameSection">
					 <p class="profileNameContent">
					 Philipp Gallaschik
					 </p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Doctor of Medicine (2014 - 2021)
					</p>
					<br>
					<p class="knowHowContent">
						Software Engineer (2021 - today)
					</p>
				
				</div>
			</div>

			<div  class="profileCard">
				<div class="profileImageCardSection" >
					<img src="/Tobias_circle_portrait.png"  class="userProfileImg" height="100" width="100" />

				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Tobias Wedel
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Product Management (2022 - Today)
					</p>
					<br>
					<p class="knowHowContent">
						Software Engineer (2024 - Today)
					</p>
				
				</div>
			</div>
			<div  class="profileCard">
				<div class="profileImageCardSection" >
					<img src="/Julius_circle_portrait.png"  class="userProfileImg" height="100" width="100" />

				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Julius Klingelhöller
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Project Manager M&A (2021 - Today)
					</p>
					<br>
					<p class="knowHowContent">
						Software Engineer (2022 - Today)
					</p>
				
				</div>
			</div>
			
			<div class="profileCard">
				<div class="profileImageCardSection">
					<img src="/emms1.jpg"  class="userProfileImg" height="100" width="100" />

				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Emmanuel Neuenhaus
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent" >
						Business Administration (2019 - 2022)
					</p>
					<br>
					<p class="knowHowContent">
						Software Engineer (2022 - Today)
					</p>
					
					
				</div>
			</div>
		</div>
	</div>

	<Footer />
</main>

<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow: hidden;
	}

	.mainSection {
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		display: flex;
		justify-content: space-around;
		align-items: center;
		/* background-color: rgb(227, 63, 63); */
		width: 100%;
		height: 100%;
		position: relative;
	}

	.profileCard{
		width: 20%;
		height: 50%;
		background-color: rgba(41, 40, 41, 0.86);
		display: flex;
		border: 1px solid white; 
		border-radius: 7px;
		flex-direction: column;
	}

	.profileImageCardSection{
		/* background-color: rgb(196, 135, 12); */
		min-height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.knowHowContent{
		color: white;
		font-family: system-ui;
		font-size: 14px;
		
	}
	.profileCardNameSection{
		/* background-color: rgb(21, 90, 34); */
		min-height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid white;

		border-bottom: 1px solid white;
	}

	.profileCardKnowHowSection{
		/* background-color: rgb(194, 144, 255); */
		min-height: 130px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* padding: 0.5rem; */
		align-items: center;
		padding-top: 5%;


	}


	.userProfileImg{
		border-radius: 50%;
	}

	.profileNameContent{
		font-size: 20px;
		color: white;
		font-family: Arial, Helvetica, sans-serif;

	}
	.mainImage {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain; /* Ensures the image scales while maintaining aspect ratio */
	}

	@media (max-width: 768px) {
		/* Force content to be scrollable */
		:global(body) {
			overflow-y: auto !important;
		}

        .mainSection {
            height: auto !important;
            overflow-y: auto !important;
        }
        
        .mainLeftContentSection {
            flex-direction: column;
            height: auto;
            padding: 20px 0;
            gap: 20px; /* Adds space between stacked cards */
        }
        
        .profileCard {
            width: 90%; /* Make cards wider on mobile */
            height: auto; /* Let height adjust to content */
            margin-bottom: 20px; /* Add space between cards */
        }
        
        main {
            height: auto !important; 
            overflow-y: auto !important;
        }
    }
</style>
