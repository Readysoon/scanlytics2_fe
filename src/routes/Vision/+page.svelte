<script lang="ts">
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
	import { onMount } from 'svelte';

	// Mobile detection state
	let isMobile = false;
	let showMobileAlternative = false;
	let activeMobileRegion: string | null = null;  // Added missing variable

	let impressState: boolean = false;
	let DatenschutzState: boolean = false;
	let pinAmerica: boolean = false;
	let pinBrazil: boolean = false;
	let pinEurope: boolean = false;
	let pinAfrica: boolean = false
	let pinChina: boolean = false; 
	let pinaustralia: boolean = false;

		// Check if device is mobile
		onMount(() => {
			checkIfMobile();
			window.addEventListener('resize', checkIfMobile);
			
			return () => {
				window.removeEventListener('resize', checkIfMobile);
			};
		});

		function checkIfMobile() {
			isMobile = window.innerWidth <= 768;
		}
		
		// Toggle mobile alternative view
		function toggleMobileView() {
			showMobileAlternative = !showMobileAlternative;
		}
	
		const handleImpressumClick = () => { 
			impressState = !impressState
		}
	
		
		const handleDatenschutzClick = () => { 
			DatenschutzState = !DatenschutzState
		}

		// Added missing function
		function setMobileRegion(region: string) {
			activeMobileRegion = region === activeMobileRegion ? null : region;
		}

		const handlePinState = (event: string) => {

			if(event == "america"){
				pinAmerica = !pinAmerica
				pinBrazil = false
				pinEurope = false
				pinAfrica = false
				pinChina = false
				pinaustralia = false
				
			}else if(event == "brazil"){
				pinAmerica = false
				pinBrazil = !pinBrazil
				pinEurope = false
				pinAfrica = false
				pinChina = false
				pinaustralia = false
			}else if(event == "africa"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = false
				pinAfrica = !pinAfrica
				pinChina = false
				pinaustralia = false
			}else if( event == "europe"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = !pinEurope
				pinAfrica = false
				pinChina = false
				pinaustralia = false

			}else if( event == "china"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = false
				pinAfrica = false
				pinChina = !pinChina
				pinaustralia = false

			}else if( event == "australia"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = false
				pinAfrica = false
				pinChina = false
				pinaustralia = !pinaustralia
			}
		}
	</script>
	
	<main>

		<Header />

		{#if pinAmerica}
			<div class="pinLayer">

				<!-- Header -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle"> 
						<p class="impressumCardTitle">
							Radiology in America
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("america")}>x</p>
					</div>
				</div>

				<!-- Body -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionUSA.jpeg"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">The Pressures on US Radiology</p>
						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							Radiology in the US faces seven major challenges identified by 31 societies, including declining reimbursements, corporatization, staffing shortages, and imaging appropriateness issues, creating a complex and challenging business environment. Automation offers potential solutions by streamlining administrative tasks, leveraging AI for improved imaging accuracy, and optimizing workflows to address staffing shortages and enhance productivity. <a href="https://radiologybusiness.com/topics/healthcare-management/medical-practice-management/7-most-pressing-challenges-radiology-practice-perfect-storm-brewing">Learn more</a>
						</p>
					</div>
				</div>
			</div>
		{/if}
		{#if pinBrazil}
			<div class="pinLayer">
				<!-- Header North America -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiology in South America
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("brazil")}>x</p>
					</div>
				</div>
				<!-- Body North America -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionSA.png"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">Equitable Healthcare in Latin America</p>

						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							Latin America's healthcare system faces significant challenges exacerbated by the pandemic, including systemic inequities, resource constraints, an aging population, climate change impacts, and rising noncommunicable diseases. Radiology automation could help address these issues by expanding diagnostic access to underserved areas, enabling remote interpretation to overcome specialist shortages, and providing cost-effective solutions that maximize limited healthcare resources. <a href="https://www.thinkglobalhealth.org/article/health-latin-america-and-promise-artificial-intelligence">Learn more</a>
						</p>
					</div>
				</div>
			</div>
		{/if}
		{#if pinEurope}

			<div class="pinLayer">
				<!-- Header - Europe -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiology in Europe
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("europe")}>x</p>
					</div>
				</div>
				<!-- Body - Europe -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionEurope.webp"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">Addressing Radiologist Shortages in England</p>
						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							Radiology in England struggles with growing radiologist shortages, increased scanner access, an aging population, and heightened service demands, prompting standardization efforts from the Royal College of Radiologists. Automation technologies could alleviate these pressures by handling routine scans, enabling AI-assisted diagnosis to extend radiologist capacity, and creating more efficient workflows that allow specialists to focus on complex cases requiring human expertise.<br><a href="https://about.cmrad.com/articles/the-growing-radiologist-shortage-a-critical-healthcare-crisis">Learn more</a>
						</p>
					</div>
				</div>
			</div>
		{/if}
		{#if pinAfrica}
			<div class="pinLayer">
				<!-- Header Africa -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiology in Africa
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("africa")}>x</p>
					</div>
				</div>
				<!-- Body - Africa -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionAfrica.jpg"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">Connecting Remote Areas</p>
						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							Radiology in Africa faces a triple challenge: severe specialist shortages, inadequate infrastructure, and limited access to advanced imaging technologies, resulting in delayed diagnoses and suboptimal care. Automation could transform these circumstances by providing AI-based diagnostic support for non-specialists, enabling telemedicine solutions that connect remote areas to expertise, and implementing low-resource adaptable technologies that require minimal maintenance while maximizing the utility of existing equipment. <a href="https://www.nature.com/articles/s41467-024-46567-3">Learn more</a>
						</p>
					</div>
				</div>
			</div>
		{/if}

		{#if pinChina}
			<div class="pinLayer">
				<!-- Header Africa -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiology in Asia
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("china")}>x</p>
					</div>
				</div>
				<!-- Body - Africa -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionAsia.png" class="imgLogo" alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">Supplementing Specialist Availability Across Asia</p>
						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							Radiology in Asia faces three key challenges: limited support for interventional radiology, insufficient subspecialization training, and shortages of qualified radiologists and equipment, with significant regional variation. Automation technologies could address these issues by offering AI-assisted diagnosis to supplement limited specialist availability, enabling knowledge transfer through virtual training platforms, and implementing scalable solutions that work across varying infrastructure levels. <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10550747/">Learn more</a>
						</p>
					</div>
				</div>

			</div>
		{/if}
		{#if pinaustralia}
			<div class="pinLayer">
				<!-- Header Africa -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiology in Australia
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("australia")}>x</p>
					</div>
				</div>
				<!-- Body - Africa -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/VisionAustralia.png"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">Addressing Urban-Rural Maldistribution</p>

						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							The radiology sector in Australia faces significant challenges, including severe urban-rural radiologist maldistribution, increasing workloads causing burnout, and pressure to meet growing demand from an aging population. Automation could address these issues by deploying teleradiology platforms with AI support to serve remote communities, implementing workflow optimization tools to reduce burnout, and utilizing computer-aided diagnosis to extend the reach of the limited specialist workforce across Australia's vast geography. <a href="https://pubmed.ncbi.nlm.nih.gov/37899512/">Learn more</a>
						</p>
					</div>
				</div>
			</div>
		{/if}
	
		<div class="mainSection">
			<!-- Desktop view for map and pins -->
			{#if !isMobile}
			<div class="mainLeftContentSection">
				<div class="mapSection">
						<img src="/blue2.png" class="map" alt="Logo" height="100%" width="100%"  />
					<div class="americaPoint">
						<div class="americaPin" on:click={() => handlePinState("america")}>

							<img src="LocationUSA.png"  class="pinpoint" alt="Logo" height="100%" width="100%"  />

						</div>
						
					</div>
					<div class="brazilPoint">
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="brazilpin"  on:click={() => handlePinState("brazil")}>
							<img src="LocationSA.png" class="pinpoint"  alt="Logo" height="100%" width="100%"  />

						</div>
					</div>
					<div class="africaPoint">
						<div class="africaPin"  on:click={() => handlePinState("africa")}>
							<img src="LocationAfrica.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

						</div>
					</div>
					<div class="europePoint">
						<div class="europePin"  on:click={() => handlePinState("europe")}>
							<img src="LocationEU.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

						</div>
					</div>
					<div class="chinaPoint">
						<div class="chinaPin"  on:click={() => handlePinState("china")}>
							<img src="LocationAsia.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

						</div>
					</div>
					<div class="australiaPoint">
						<div class="australiaPin"  on:click={() => handlePinState("australia")}>
							<img src="LocationAustralia.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

						</div>
					</div>
				</div>
				

				<div class="MapDefaultTEXT">
					<div class="placeholderObjecttext">Click on a Vision Pin</div>
				</div>
			</div>
			{:else}
			 <!-- Mobile view -->
			<div class="mobile-view">
				<div class="mobile-regions-grid">
				<!-- America Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'america'} on:click={() => setMobileRegion('america')}>
					<div class="mobile-region-header">
					<img src="LocationUSA.png" class="mobile-pin-icon" alt="USA" />
					<span>America</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionUSA.jpeg" alt="USA Radiology" />
					</div>
					<h3>The Pressures on US Radiology</h3>
					<p>
						Radiology in the US faces seven major challenges identified by 31 societies, including declining reimbursements, corporatization, staffing shortages, and imaging appropriateness issues, creating a complex and challenging business environment.
					</p>
					<a href="https://radiologybusiness.com/topics/healthcare-management/medical-practice-management/7-most-pressing-challenges-radiology-practice-perfect-storm-brewing" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				
				<!-- South America Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'brazil'} on:click={() => setMobileRegion('brazil')}>
					<div class="mobile-region-header">
					<img src="LocationSA.png" class="mobile-pin-icon" alt="South America" />
					<span>South America</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionSA.png" alt="South America Radiology" />
					</div>
					<h3>Equitable Healthcare in Latin America</h3>
					<p>
						Latin America's healthcare system faces significant challenges exacerbated by the pandemic, including systemic inequities, resource constraints, an aging population, climate change impacts, and rising noncommunicable diseases.
					</p>
					<a href="https://www.thinkglobalhealth.org/article/health-latin-america-and-promise-artificial-intelligence" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				
				<!-- Europe Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'europe'} on:click={() => setMobileRegion('europe')}>
					<div class="mobile-region-header">
					<img src="LocationEU.png" class="mobile-pin-icon" alt="Europe" />
					<span>Europe</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionEurope.webp" alt="Europe Radiology" />
					</div>
					<h3>Addressing Radiologist Shortages in England</h3>
					<p>
						Radiology in England struggles with growing radiologist shortages, increased scanner access, an aging population, and heightened service demands, prompting standardization efforts from the Royal College of Radiologists.
					</p>
					<a href="https://about.cmrad.com/articles/the-growing-radiologist-shortage-a-critical-healthcare-crisis" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				
				<!-- Africa Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'africa'} on:click={() => setMobileRegion('africa')}>
					<div class="mobile-region-header">
					<img src="LocationAfrica.png" class="mobile-pin-icon" alt="Africa" />
					<span>Africa</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionAfrica.jpg" alt="Africa Radiology" />
					</div>
					<h3>Connecting Remote Areas</h3>
					<p>
						Radiology in Africa faces a triple challenge: severe specialist shortages, inadequate infrastructure, and limited access to advanced imaging technologies, resulting in delayed diagnoses and suboptimal care.
					</p>
					<a href="https://www.nature.com/articles/s41467-024-46567-3" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				
				<!-- Asia Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'china'} on:click={() => setMobileRegion('china')}>
					<div class="mobile-region-header">
					<img src="LocationAsia.png" class="mobile-pin-icon" alt="Asia" />
					<span>Asia</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionAsia.png" alt="Asia Radiology" class="imgLogo" />
					</div>
					<h3>Supplementing Specialist Availability Across Asia</h3>
					<p>
						Radiology in Asia faces three key challenges: limited support for interventional radiology, insufficient subspecialization training, and shortages of qualified radiologists and equipment, with significant regional variation.
					</p>
					<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10550747/" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				
				<!-- Australia Region Box -->
				<div class="mobile-region-box" class:active={activeMobileRegion === 'australia'} on:click={() => setMobileRegion('australia')}>
					<div class="mobile-region-header">
					<img src="LocationAustralia.png" class="mobile-pin-icon" alt="Australia" />
					<span>Australia</span>
					</div>
					<div class="mobile-region-content">
					<div class="mobile-region-image">
						<img src="/VisionAustralia.png" alt="Australia Radiology" />
					</div>
					<h3>Addressing Urban-Rural Maldistribution</h3>
					<p>
						The radiology sector in Australia faces significant challenges, including severe urban-rural radiologist maldistribution, increasing workloads causing burnout, and pressure to meet growing demand from an aging population.
					</p>
					<a href="https://pubmed.ncbi.nlm.nih.gov/37899512/" class="mobile-learn-more">Learn more</a>
					</div>
				</div>
				</div>
			</div>
			
			{/if}
		</div>
	
		<Footer />
	</main>
	
<style>
	main {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		overflow: hidden;
	}

	a {
		text-decoration: none;
		color: rgb(77, 77, 77);
		font-weight: 500;
		font-family: system-ui;
	}
	
	.imgLogo{
		border-radius: 7px;
	}

	.mainSection {
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		/* background-color: rgb(227, 63, 63); */
		width: 100%;
		height: 100%;
		position: relative;
	}

	.mapSection{
		/* background-color: rgb(244, 190, 28); */
		width: 100%;
		height: 90%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.MapDefaultTEXT{
		/* background-color: red; */
		width: 100%;
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.placeholderObjecttext {
		font-size: 25px;
		font-weight: bold;
		font-family:Arial, Helvetica, sans-serif;
		color: rgb(255, 255, 255);
	}

	.map{
		height: 100%;
		width: 80%;
		opacity: 0.9;
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

	.americaPoint{
		/* border: 1px solid red; */
		height: 100px;
		width: 200px;
		position: absolute;
		top: 32%;
		left: 19%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.americaPin{	
		display: flex;
		justify-content: center;
		
	}

	.brazilPoint{
		/* border: 1px solid rgb(221, 255, 0); */
		height: 100px;
		width: 200px;
		position: absolute;
		top: 55%;
		left: 28%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.brazilpin{
		/* background-color: rgb(255, 68, 0); */
		/* width: 50px;
		height: 50px; */
	}

	.africaPoint{
		height: 100px;
		width: 200px;
		position: absolute;
		top: 50%;
		left: 49%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.africaPin{
		/* background-color: rgb(0, 255, 30); */
		/* width: 50px;
		height: 50px; */
	}

	.pinpoint{
		width: 80px;
		height: 80px;
		cursor: pointer;
	}

	.europePoint{
		/* border: 1px solid rgb(255, 178, 34); */
		height: 100px;
		width: 200px;
		position: absolute;
		top: 30%;
		left: 45%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chinaPoint{
		/* border: 1px solid rgb(53, 137, 22); */
		height: 100px;
		width: 200px;
		position: absolute;
		top: 35%;
		left: 67%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.australiaPoint{
		/* border: 1px solid rgb(179, 35, 35); */
		height: 100px;
		width: 200px;
		position: absolute;
		top: 55%;
		left: 75%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pinLayer{
		background-color: rgba(163, 163, 163, 0.725);
		width: 33%;
		height: 70%;
		position: absolute;
		top: 15%;
		left: 65%;
		z-index: 3;
		border-radius: 7px;
		border: 1px solid white;
	}

	.pinLayerHeader{
		width: 100%;
		height: 6%;
		display: flex;
	}

	.pinLayerBody{
		width: 100%;
		height: 96%;
		display: flex;
		flex-direction: column;

	}

	.pinLayerHeaderTitle{
		width: 90%;
		height: 100%;
		display: flex;
		align-items: center;
		padding-left: 1rem;
	}
	.pinLayerHeaderCloseBtn{
		width: 10%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pinBodyCover{
		width: 100%;
		height: 60%;
		display: flex;
		border-top: 1px solid white;
	}

	.coverButtom{
		width: 100%;
		height: 40%;
		display: flex;
		color: white;
		padding: 1rem;
		text-align: center;
	}

	.leftCoverSection{
		width: 55%;
		height: 100%;
		padding: 1rem;
	}

	.rightCoverSection{
		width: 45%;
		height: 100%;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.coverTitle{
		font-size: 30px;
		font-weight: 600;
		font-family: Arial, Helvetica, sans-serif;
		color: white;
	}

	.impressumCardBody{
		padding: 1rem;
	}

	.DatenSchutzCard{
		background-color: white;
		height: 70%;
		width: 40%;
		border-radius: 7px;
	}

	.DatenSchutzCardHead{
		height: 7%;
		width: 100%;
		display: flex;
		border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	}

		/* Mobile styles */
		.mobile-view {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		overflow-y: auto;
	}
	
	.mobile-regions-grid {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-bottom: 20px;
	}
	
	.mobile-region-box {
		background-color: rgba(255, 255, 255, 0.15);
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
	
	.mobile-region-box.active {
		background-color: rgba(255, 255, 255, 0.2);
	}
	
	.mobile-region-header {
		padding: 15px;
		display: flex;
		align-items: center;
		gap: 15px;
		cursor: pointer;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.mobile-region-header span {
		color: white;
		font-size: 18px;
		font-family: Arial, sans-serif;
		font-weight: 500;
	}
	
	.mobile-pin-icon {
		width: 40px;
		height: 40px;
	}
	
	.mobile-region-content {
		padding: 15px;
		color: white;
	}
	
	.mobile-region-image {
		width: 100%;
		height: 180px;
		margin-bottom: 15px;
		border-radius: 8px;
		overflow: hidden;
	}
	
	.mobile-region-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.mobile-region-content h3 {
		font-size: 20px;
		margin-bottom: 10px;
		font-family: Arial, sans-serif;
	}
	
	.mobile-region-content p {
		font-size: 14px;
		line-height: 1.5;
		margin-bottom: 15px;
		font-family: Arial, sans-serif;
	}
	
	.mobile-learn-more {
		display: inline-block;
		background-color: white;
		color: black !important;
		padding: 8px 15px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
		margin-top: 10px;
	}

	/* Media query for mobile view */
	@media (max-width: 768px) {
		main {
			overflow-y: auto;
			height: auto;
			min-height: 100vh;
		}
		
		.mainSection {
			height: auto;
			min-height: 70vh;
		}
	}
</style>
