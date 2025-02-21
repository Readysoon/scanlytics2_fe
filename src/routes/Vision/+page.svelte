<script>
	function redirectUser(){ 
	window.location.href = 'https://calendly.com/philipp-gallaschik-code/30min';

	}
	let currentSlide = 0;
	const slides = [
		{ image: 'radiologist_worldmap.png', subtitle: 'Subtitle 1' },
		{ image: 'radiologist-russiamap.png', subtitle: 'Subtitle 2' },
		{ image: 'image3.jpg', subtitle: 'Subtitle 3' }
	];

	function updateSlide(index) {
		currentSlide = (index + slides.length) % slides.length;
	}

	function printprompt() {
		console.log('hello in pro');
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
			<div class="slider">
				<span class="arrow" on:click={() => updateSlide(currentSlide - 1)}>&#9664;</span>
				<img src={slides[currentSlide].image} alt="Slide Image">
				<span class="arrow" on:click={() => updateSlide(currentSlide + 1)}>&#9654;</span>
				<div class="subtitle">{slides[currentSlide].subtitle}</div>
			</div>
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

	.visonBtn {
		color: white;
	}

	.mainSection {
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: black;
		width: 100%;
		height: 100%;
		position: relative;
	}

	.slider {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.slider img {
		max-width: 80%;
		max-height: 80%;
	}

	.slider .arrow {
		cursor: pointer;
		font-size: 2em;
		color: rgb(0, 0, 0);
		user-select: none;
		margin: 0 10px;
	}

	.slider .subtitle {
		position: absolute;
		bottom: 20px;
		color: white;
		font-family: system-ui;
		font-size: 1.2em;
		text-align: center;
		width: 100%;
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
