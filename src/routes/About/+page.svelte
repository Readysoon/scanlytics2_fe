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
					<img src="/Philipp_circle_portrait.png"  class="userProfileImg"/>
				</di>
				<div class="profileCardNameSection">
					 <p class="profileNameContent">
					 Philipp Gallaschik
					 </p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Doctor of Medicine (since 2021)<br>
						Software Engineer (2021 - today)
					</p>
				</div>
			</div>

			<div  class="profileCard">
				<div class="profileImageCardSection" >
					<img src="/Tobias_circle_portrait.png"  class="userProfileImg"/>
				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Tobias Wedel
					</p>
				</div>
				<div class=profileCardKnowHowSection>
					<p class="knowHowContent">
						Product Manager (2022 - today)<br>
						Software Engineer (2024 - today)
					</p>
				</div>
			</div>
			
			<div class="profileCard">
				<div class="profileImageCardSection">
					<img src="/emms1.jpg"  class="userProfileImg"/>
				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Emmanuel Neuenhaus
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent" >
						Business Administration (2019 - 2022)<br>
						Software Engineer (2022 - today)
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
		display: flex;
		align-items: center;
	}

	.mainLeftContentSection {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: auto;
		position: relative;
	}

	.profileCard{
		width: 20%;
		height: auto;
		background-color: rgba(41, 40, 41, 0.86);
		display: flex;
		border: 1px solid white; 
		border-radius: 7px;
		flex-direction: column;
	}

	.profileImageCardSection{
		padding: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.profileCardNameSection{
		/* background-color: rgb(21, 90, 34); */
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid white;
		border-bottom: 1px solid white;
	}

	.profileNameContent{
		font-size: 30px;
		color: white;
		font-family: Arial, Helvetica, sans-serif;
	}

	.profileCardKnowHowSection{
		/* background-color: rgb(194, 144, 255); */
		height: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* padding: 0.5rem; */
		align-items: center;
		padding-top: 5%;
		height: 100%;
	}

	.profileCardKnowHowSection p{
		color: white;
		font-family: system-ui;
		font-size: 25px;
	}

	.knowHowContent {
		padding: 20px;
		text-align: center;
	}


	.userProfileImg{
		height: 250px;
		max-height: 250px;
		max-width: 100%;
		border-radius: 50%;
		width: auto;
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
