<script>
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
			<a href="/Vision/">Vision</a>
			<a href="/Technology/">Technology</a>
			<a href="/About/" class="aboutBtn">About</a>
			<button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>

		</div>
	</nav>

	<div class="mainSection">
		<div class="mainLeftContentSection">
			<img src="/team.png" alt="About" class="mainImage"/>
		</div>
	</div>

	<footer class="footerSection">
		<div class="footer-content">
			<div class="footer-left">
				<p class="footer-left-text">© 2025 Scanlytics | Version 0,1</p>
			</div>
			<div class="footer-center">
				<div class="footer-center-box">
					<p class="footer-center-text">
						For clinical usage, appropriate clinical qualification is required, <br /> and users must
						ensure they have the necessary credentials and permissions <br />to access and interpret
						medical images.
					</p>
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
		justify-content: center;
		align-items: center;
		background-color: rgb(0, 0, 0);
		width: 100%;
		height: 100%;
		position: relative;
	}

	.mainImage {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain; /* Ensures the image scales while maintaining aspect ratio */
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

	.footer-center {
		color: black;
		width: 30%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: end;
	}

	.footer-center-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		text-align: end;
	}
</style>
