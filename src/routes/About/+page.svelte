<script>
	function redirectUser(){ 
	window.location.href = 'https://calendly.com/tobias-wedel-code/30min';

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
			<div class="profileCard">
				<di class="profileImageCardSection" >
					<img src="/profil.jpg"  class="userProfileImg" height="100" width="100" />

				</di>
				<div class="profileCardNameSection">
					 <p class="profileNameContent">
					 Simon Bender
					 </p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Bachelor of Medicine(2013 - 2023)
					</p>
					<br>
					<p class="knowHowContent">
						Bachelor of Science(2023 - Heute)
					</p>
				
				</div>
			</div>
			<div  class="profileCard">
				<div class="profileImageCardSection" >
					<img src="/profil.jpg"  class="userProfileImg" height="100" width="100" />

				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Simon Bender
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Bachelor of Medicine(2013 - 2023)
					</p>
					<br>
					<p class="knowHowContent">
						Bachelor of Science(2023 - Heute)
					</p>
				
				</div>
			</div>
			<div  class="profileCard">
				<div class="profileImageCardSection" >
					<img src="/profil.jpg"  class="userProfileImg" height="100" width="100" />

				</div>
				<div class="profileCardNameSection">
					<p class="profileNameContent">
						Simon Bender 
					</p>
				</div>
				<div class="profileCardKnowHowSection">
					<p class="knowHowContent">
						Bachelor of Medicine(2013 - 2023)
					</p>
					<br>
					<p class="knowHowContent">
						Bachelor of Science(2023 - Heute)
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
					<p class="knowHowContent">
						Depute Innovation & Fashion GmbH(2021 - 2023)
					</p>
					<br>
					<p class="knowHowContent">
						Bachelor of Science(2023 - Heute)
					</p>
				</div>
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
					<p  class="footer-right-text">Impressum |</p> 
					<p  class="footer-right-text">Datenschutz</p>
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


	.profileCard{
		width: 20%;
		height: 50%;
		/* background-color: pink; */
		display: flex;
		border: 1px solid white; 
		border-radius: 7px;
		flex-direction: column;
	}

	.profileImageCardSection{

		/* background-color: rgb(196, 135, 12); */
		height: 45%;
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
		height: 15%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid white;

		border-bottom: 1px solid white;






	}

	.profileCardKnowHowSection{
		/* background-color: rgb(194, 144, 255); */
		height: 45%;
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

	

	.footer-center {
		color: black;
		/* width: 30%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: end; */
		color: black;
		width: 40%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		/* background-color: red; */
	}

	.footer-center-text {
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		text-align: end;
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
</style>
