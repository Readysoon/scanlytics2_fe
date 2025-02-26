<script>
    let currentSlide = 0;

    const slides = [
        { image: 'radiologist_worldmap.png', subtitle: 'In developed countries there is a decent availability of radiologists for the population. A range from 186 in Denmark over 87 in the US to 23 in Poland per million inhabitants can be observed. Contrary to that is the the rest of the world with 14.3 per million for China, 10 for India and only 3.6 on average for the African continent. We aim to provide basic radiologic diagnostics not only to developed countries - but also to the people in need. The following examples apply to most countries, with the different factors being more or less pronounced:' },
        { image: 'radiologist-russiamap.png', subtitle: 'Subtitle 2' },
        { image: 'image3.jpg', subtitle: 'Subtitle 3' }
    ];

	function redirectUser(){ 
	window.location.href = 'https://calendly.com/philipp-gallaschik-code/30min';
	}

</script>

<main>
	<nav>
		<div class="logoArea">
			<img src="/logow.jpg" alt="Logo" height="30" width="28" />
			<h2>Scanlytics</h2>
		</div>
		<div class="navbar">
			<a href="/">Home</a>
			<a href="/Vision/" class="visonBtn">Vision</a>
			<a href="/Technology/">Technology</a>
			<a href="/About/">About</a>
			<button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
		</div>
	</nav>

	<div class="mainSection">
		<div class="mainLeftContentSection">
			<img src="/vision.png" alt="Vision" class="mainImage"/>
			<p class="subtitle">Scanlytics aims to automate medical Reporting in two steps: <br> 1. Utilizing our proprietary classifier, we accurately categorize the input image into one of approximately 30 prevalent X-Ray categories, achieving an accuracy rate of 99,98%. <br> 2.	After the body part is identified, image segmentation algorithms are applied to delineate and analyze specific regions of interest within the X-Ray. This enables precise identification of anomalies or conditions, facilitating detailed and automated medical reporting. </p>
		</div>
	</div>
	<footer class="footerSection"> 
		<div class="footer-content">
			<div class="footer-left">
				<p class="footer-left-text">© 2025 Scanlytics | Version 0.1</p>
			</div>
		</div>
	</footer>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: rgb(0, 0, 0);
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

	.visonBtn {
		color: white;
	}

	.mainSection {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		box-sizing: border-box;
	}

	.mainLeftContentSection {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: black;
		width: 100%;
		height: 100%;
		position: relative;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.mainImage {
		max-width: 100%;
		height: auto;
		max-height: calc(100vh - 20%); /* Adjust the height to ensure footer and subtitle are visible */
		object-fit: contain;
	}

	.subtitle {
		color: white;
		font-family: system-ui;
		font-size: 15px;
		opacity: 0.4;
		text-align: center;
		padding: 1em;
		width: 90%; /* Adjust this value to control the width */
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.6);
		margin: 0 auto; /* Center the subtitle */
	}


	.footerSection {
		width: 100%;
		height: 13%;
		padding: 1em;
		box-sizing: border-box;
	}

	.footer-content {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-between;
	}

	.footer-left {
		color: black;
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.footer-left-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
	}
</style>
