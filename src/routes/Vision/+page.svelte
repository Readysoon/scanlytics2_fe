<script lang="ts">


	let impressState: boolean = false;
	let DatenschutzState: boolean = false;
	let pinAmerica: boolean = false;
	let pinBrazil: boolean = false;
	let pinEurope: boolean = false;
	let pinAfrica: boolean = false
	let pinChina: boolean = false; 
	let pinaustralia: boolean = false;
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
					 <div class="impressumCardBody">
						Name: Philipp Gallaschik
						<br>
						Adresse: Mierendorffstr. 12, c/o Zekl, 10589 Berlin
						<br>
						Telefon: 01739140346
						<br>
						E-Mail: philipp.gallaschik@code.berlin
					 </div>
			 </div>
		</div>
	{/if}

		{#if DatenschutzState}
		<div class="overlay">
			<div class="DatenSchutzCard">
					<div class="DatenSchutzCardHead">
						<div class="impressumCardTitleSection">
								<p class="impressumCardTitle">Datenschutz</p>
							</div>
						<div class="impressumCloseBtn">
							<p class="closebtn" on:click={handleDatenschutzClick}>x</p>
						</div>
					</div>
					<div class="impressumCardBody">
						**1. Datenschutz auf einen Blick**

### Allgemeine Hinweise

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Detaillierte Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.

### Datenerfassung auf unserer Website

**Wer ist verantwortlich für die Datenerfassung auf dieser Website?**
Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.

**Wie erfassen wir Ihre Daten?**
Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.

Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.

**Wofür nutzen wir Ihre Daten?**
Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.

### Ihre Rechte

Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.

**2. Hosting**
Unsere Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Dies kann insbesondere IP-Adressen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, umfassen.

**3. Allgemeine Hinweise und Pflichtinformationen**

**Datenschutz**
Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

**Speicherdauer**
Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.

**4. Datenerfassung auf dieser Website**

**Cookies**
Unsere Internetseiten verwenden sogenannte "Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.

**Server-Log-Dateien**
Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:

- Browsertyp und Browserversion
- Verwendetes Betriebssystem
- Referrer URL
- Hostname des zugreifenden Rechners
- Uhrzeit der Serveranfrage
- IP-Adresse

Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.

**5. Analyse-Tools und Werbung**
Wir nutzen auf unserer Website Analysetools, um das Nutzerverhalten besser zu verstehen. Hierfür setzen wir unter anderem **Mixpanel** ein. Die Verarbeitung der Daten erfolgt nur nach Ihrer ausdrücklichen Einwilligung.

**6. Plugins und Tools**
Auf unserer Website werden Dienste Dritter eingebunden, um Funktionen bereitzustellen oder das Nutzererlebnis zu verbessern. Dazu können z. B. Kartendienste oder externe Schriftarten gehören.

**7. Rechte der betroffenen Person**
Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:

- Auskunft über Ihre gespeicherten personenbezogenen Daten
- Berichtigung unrichtiger Daten
- Löschung Ihrer Daten, sofern keine gesetzliche Aufbewahrungspflicht besteht
- Einschränkung der Verarbeitung Ihrer Daten
- Widerspruch gegen die Verarbeitung Ihrer Daten
- Datenübertragbarkeit

**8. Kontakt** Falls Sie Fragen zum Datenschutz haben, können Sie uns unter folgender E-Mail-Adresse kontaktieren: [tobias.wedel@code.berlin](mailto:tobias.wedel@code.berlin).

---

Diese Datenschutzerklärung wurde zuletzt aktualisiert am 26.02.2024.
					</div>
			</div>
		</div>
	{/if}
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
	
	
		<nav>
			<div class="logoArea">
				<img src="/logow.jpg" alt="Logo" height="30" width="28" />
				<h2>Scanlytics</h2>
			</div>
			<div class="navbar">
				<a href="/">Home</a>
				<a href="/Vision/" class="visionBtn">Vision</a>
				<a href="/Technology/">Technology</a>
				<a href="/About/" >About</a>
				<button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
	
			</div>
		</nav>
	
		<div class="mainSection">
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

		
		.imgLogo{
			border-radius: 7px;
		}
		.visionBtn{
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
			/* border: 1px solid rgb(21, 0, 255); */
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
			height: 20%;
			width: 30%;
			border-radius: 7px;
		}
	
		.impressumCardHead{
			height: 20%;
			width: 100%;
			display: flex;
			/* background-color: green; */
			border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	
		}
	
		.impressumCardTitleSection{
			height: 100%;
			width: 90%;
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
		/* background-color: green; */
		border-bottom: 1px solid rgba(0, 0, 0, 0.259);
	}
	</style>
	