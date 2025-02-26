<script lang="ts">


	let impressState: boolean = false;
	let DatenschutzState: boolean = false;
	let pinAmerica: boolean = false;
	let pinBrazil: boolean = false;
	let pinEurope: boolean = false;
	let pinAfrica: boolean = false
		function redirectUser(){ 
		window.location.href = 'https://calendly.com/tobias-wedel-code/30min';
	
		}
	
	
		const handleImpressumClick = () => { 
			impressState = !impressState
		}
	
		
		const handleDatenschutzClick = () => { 
			DatenschutzState = !DatenschutzState
		}

		const handlePinState = (event: string) => {

			if(event == "america"){
				pinAmerica = !pinAmerica
				pinBrazil = false
				pinEurope = false
				pinAfrica = false
				
			}else if(event == "brazil"){
				pinAmerica = false
				pinBrazil = !pinBrazil
				pinEurope = false
				pinAfrica = false
			}else if(event == "africa"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = false
				pinAfrica = !pinAfrica
			}else if( event == "europe"){
				pinAmerica = false
				pinBrazil = false
				pinEurope = !pinEurope
				pinAfrica = false

			}
		}
	
	
		
	
	</script>
	
	<main>
		{#if impressState}
			<div class="overlay">
				 <div class="Card">
						 <div class="impressumCardHead">
							<div class="impressumCardTitleSection">
									<p class="impressumCardTitle">Impressum</p>
							</div>
							<div class="impressumCloseBtn">
								<p class="closebtn" on:click={handleImpressumClick}>x</p>
							</div>
						 </div>
						 <div class="impressumCardBody">body</div>
				 </div>
			</div>
		{/if}
	
			{#if DatenschutzState}
			<div class="overlay">
				<div class="Card">
						<div class="impressumCardHead">
							<div class="impressumCardTitleSection">
									<p class="impressumCardTitle">DatenschutzState</p>
								</div>
							<div class="impressumCloseBtn">
								
								<p class="closebtn" on:click={handleDatenschutzClick}>x</p>
							</div>
						</div>
						<div class="impressumCardBody">body</div>
				</div>
			</div>
		{/if}

		{#if pinAmerica}
			<div class="pinLayer">

				<!-- Header -->
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle"> 
						<p class="impressumCardTitle">
							Radiologie in America
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("america")}>x</p>
					</div>
				</div>

				<!-- Body -->
				<div class="pinLayerBody">
					<div class="pinBodyCover">
						<img src="/am1.webp"  alt="Logo" height="40%" width="80%"  />

					</div>
					<div></div>
				</div>
			</div>
		{/if}
		{#if pinBrazil}
			<div class="pinLayer">
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiologie in North America
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("brazil")}>x</p>
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
							Radiologie in Europa
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
							<img src="/am1.webp"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">"Efficent Collobartion with AI"</p>

						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							The integration of AI into radiology is transforming the field, paving the way for a future where human expertise and artificial intelligence work in seamless harmony. AI-driven tools are enhancing efficiency by rapidly analyzing medical images, detecting abnormalities with remarkable precision, and streamlining workflows, allowing radiologists to focus on complex cases that require deep clinical insight. As demand for radiology services grows, AI stands as a vital collaborator, alleviating workforce shortages and reducing diagnostic delays.
						</p>
					</div>
				</div>
			</div>
		{/if}
		{#if pinAfrica}
			<div class="pinLayer">
				<div class="pinLayerHeader">
					<div class="pinLayerHeaderTitle">
						<p class="impressumCardTitle">
							Radiologie in Africa
						</p>
					</div>
					<div class="pinLayerHeaderCloseBtn">
						<p class="closebtn" on:click={() =>  handlePinState("africa")}>x</p>
					</div>
				</div>

				<div class="pinLayerBody">
					<div class="pinBodyCover">

						<div class="leftCoverSection">
							<img src="/africa.jpg"  alt="Logo" height="100%" width="100%"  />
						</div>
						<div class="rightCoverSection">
								<p class="coverTitle">"Automation"</p>

						</div>

					</div>
					<div class="coverButtom">
						<p class="overtext">
							The integration of AI into radiology is transforming the field, paving the way for a future where human expertise and artificial intelligence work in seamless harmony. AI-driven tools are enhancing efficiency by rapidly analyzing medical images, detecting abnormalities with remarkable precision, and streamlining workflows, allowing radiologists to focus on complex cases that require deep clinical insight. As demand for radiology services grows, AI stands as a vital collaborator, alleviating workforce shortages and reducing diagnostic delays.
						</p>
					</div>
				</div>

			</div>
		{/if}
	
	
		<nav>
			<div class="logoArea">
				<img src="/logow.jpg" alt="Logo" height="30" width="28" />
				<h2>Scanlytics</h2>
			</div>
			<div class="navbar">
				<a href="/">Home</a>
				<a href="/Vision/">Vision</a>
				<a href="/Technology/">Technology</a>
				<a href="/About/" class="aboutBtn">About</a>
				<button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
	
			</div>
		</nav>
	
		<div class="mainSection">
			<div class="mainLeftContentSection">

				<img src="/blue2.png" class="map" alt="Logo" height="100%" width="100%"  />
				<div class="americaPoint">
					<div class="americaPin" on:click={() => handlePinState("america")}>1</div>
				</div>
				<div class="brazilPoint">
					<div class="brazilpin"  on:click={() => handlePinState("brazil")}>
						<img src="Location.png" class="pinpoint"  alt="Logo" height="100%" width="100%"  />

					</div>
				</div>
				<div class="africaPoint">
					<div class="africaPin"  on:click={() => handlePinState("africa")}>
						<img src="Location.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

					</div>
				</div>
				<div class="europePoint">
					<div class="europePin"  on:click={() => handlePinState("europe")}>
						<img src="Location.png" class="pinpoint" alt="Logo" height="100%" width="100%"  />

					</div>
				</div>
				<div class="chinaPoint">
					<div class="chinaPin"  on:click={() => handlePinState("china")}>5</div>
				</div>
				<div class="australiaPoint">
					<div class="australiaPin"  on:click={() => handlePinState("australia")}>5</div>
				</div>
			</div>
		</div>
	
		<footer class="footerSection">
			<div class="footer-content">
				<div class="footer-left">
					<div class="footer-left-box">
						<p class="footer-left-text">© 2025 Scanlytics | Version 0,1</p>
	
					</div>
	
					<div class="footer-center-box">
						<p  class="footer-right-text" on:click={handleImpressumClick}>Impressum |</p> 
						<p  class="footer-right-text" on:click={handleDatenschutzClick}>Datenschutz</p>
				   </div>
				</div>
				
			</div>
		</footer>
	</main>
	
	<style>
		main {
			background-color: rgb(0, 0, 0);
			height: 100vh;
			overflow: hidden;
		}
	
		nav {
			display: flex;
			width: 100%;
			height: 5%;
			align-items: center;
			justify-content: space-between;
		}
	
		.logoArea {
			height: 100%;
			width: 8%;
			display: flex;
			align-items: center;
			gap: 8%;
			padding-left: 1%;
			font-family: system-ui;
			color: white;
		}
	
		.navbar {
			width: 27%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 1%;
		}
	
		a {
			text-decoration: none;
			color: rgb(77, 77, 77);
			font-weight: 500;
			font-family: system-ui;
		}
	
		.bookCallBtn {
			width: 20%;
			height: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid black;
			border-radius: 40px;
			color: rgb(10, 9, 9);
			font-family: system-ui;
			font-size: 12px;
			cursor: pointer;
		}
	
		.aboutBtn{
			color: white;
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
			border: 1px solid red;
			height: 100px;
			width: 200px;
			position: absolute;
			top: 35%;
			left: 19%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.americaPin{
			background-color: aqua;
			width: 50px;
			height: 50px;
		}

		.brazilPoint{
			/* border: 1px solid rgb(221, 255, 0); */
			height: 100px;
			width: 200px;
			position: absolute;
			top: 60%;
			left: 28%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.brazilpin{
			/* background-color: rgb(255, 68, 0); */
			width: 50px;
			height: 50px;
		}

		.africaPoint{
			/* border: 1px solid rgb(21, 0, 255); */
			height: 100px;
			width: 200px;
			position: absolute;
			top: 55%;
			left: 49%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.africaPin{
			/* background-color: rgb(0, 255, 30); */
			width: 50px;
			height: 50px;
		}
		.pinpoint{
			width: 200px;
			height: 80px;
			cursor: pointer;
		}
		.europePoint{
			/* border: 1px solid rgb(255, 178, 34); */
			height: 100px;
			width: 200px;
			position: absolute;
			top: 34%;
			left: 45%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.europePin{
			/* background-color: rgb(252, 58, 232); */
			width: 50px;
			height: 50px;
		}

		.chinaPoint{
			border: 1px solid rgb(53, 137, 22);
			height: 100px;
			width: 200px;
			position: absolute;
			top: 40%;
			left: 67%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.chinaPin{
			background-color: rgb(103, 58, 252);
			width: 50px;
			height: 50px;
		}

		.australiaPoint{
			border: 1px solid rgb(179, 35, 35);
			height: 100px;
			width: 200px;
			position: absolute;
			top: 65%;
			left: 75%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.australiaPin{
			background-color: rgb(252, 58, 171);
			width: 50px;
			height: 50px;
		}
	
		.footerSection {
			width: 100%;
			height: 13%;
			padding: 1em;
		}
	
		.footer-content {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: space-between;
			/* background-color: green; */
	
		}
	
		.footer-left {
			color: black;
			width: 100%;
			height: 100%;
			display: flex;
			/* flex-direction: column; */
			justify-content: space-between;
	
			/* background-color: orange; */
	
	
		}
	
		.footer-left-box{
			/* background-color: rgb(77, 76, 75); */
			display: flex;
			align-items: end;
			justify-content: flex-end;
	
		}
	
		.footer-left-text {
			color: white;
			font-family: system-ui;
			font-size: 12px;
			opacity: 0.4;
		}
	
		.footer-right-text {
			color: white;
			font-family: system-ui;
			font-size: 12px;
			opacity: 0.4;
			cursor: pointer;
		}
	
		
	
	
		.footer-center-box{
			/* background-color: green; */
			height: 100%;
			width: 25%;
			display: flex;
			align-items: end;
			justify-content: flex-end;
			/* padding-right: 2%; */
			gap: 1%;
		}
	
	
		.overlay{
			background-color: rgba(0, 0, 0, 0.664);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 100%;
			width: 100%;
			z-index: 3;
			display: flex;
			justify-content: center;
			align-items: center;
	
	
			
		}
	
		.Card{
			background-color: white;
			height: 50%;
			width: 50%;
			border-radius: 7px;
		}
	
		.impressumCardHead{
			height: 10%;
			width: 100%;
			display: flex;
			/* background-color: green; */
			border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	
		}
	
		.impressumCardTitleSection{
			height: 100%;
			width: 90%;
			/* background-color: orange; */
			display: flex;
			align-items: center;
			padding-left: 1rem;
			
		}
	
		.impressumCardTitle{
			font-size: 19px;
			font-weight: 700;
			font-family: system-ui;
			color: white;
	
	
		}
	
		.impressumCloseBtn{
			height: 100%;
			width: 10%;
			display: flex;
			justify-content: center;
			align-items: center;
	
		}
	
		.closebtn{
			font-size: 27px;
			font-weight: 700;
			font-family: system-ui;
			color: red;
			cursor: pointer;
			border-radius: 7px;
	
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
			/* background-color: orange; */
			display: flex;
		}
		.pinLayerBody{

			width: 100%;
			height: 96%;
			/* background-color: rgb(0, 255, 170); */
			display: flex;
			flex-direction: column;

		}

		.pinLayerHeaderTitle{
			width: 90%;
			height: 100%;
			/* background-color: rgb(255, 0, 72); */
			display: flex;
			align-items: center;
			padding-left: 1rem;
		}
		.pinLayerHeaderCloseBtn{
			width: 10%;
			height: 100%;
			/* background-color: rgb(255, 255, 0); */
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.pinBodyCover{
			width: 100%;
			height: 60%;
			/* background-color: grey; */
			display: flex;
			border-top: 1px solid white;
			/* border-bottom: 1px solid rgba(255, 255, 255, 0.214); */


		}

		.coverButtom{
			width: 100%;
			height: 40%;
			/* background-color: grey; */
			display: flex;
			/* justify-content: center; */
			/* align-items: center; */
			color: white;
			padding: 1rem;
			text-align: center;

			


		}

		.leftCoverSection{
			width: 55%;
			height: 100%;
			/* background-color: aqua; */
			padding: 1rem;
		}

		.rightCoverSection{
			width: 45%;
			height: 100%;
			/* background-color: rgb(94, 255, 0); */
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

	</style>
	