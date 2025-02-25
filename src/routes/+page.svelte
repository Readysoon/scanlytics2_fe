<script>
	import { redirect } from '@sveltejs/kit';

	function redirectUser(){ 
		window.location.href = 'https://calendly.com/tobias-wedel-code/30min';

	}

	function redirectTechnologyPage (){
		window.location.href = '/Technology/';


	}
	
</script>

<head>
	<title>Scanlytics</title>
</head>

<main>
	<nav>
		<div class="logoArea">
			<img src="/logow.jpg" alt="Logo" height="30" width="28" />
			<h2>Scanlytics</h2>
		</div>
		<div class="navbar">
			<a href="/" class="homeBtn">Home</a>
			<a href="/Vision/">Vision</a>
			<a href="/Technology/">Technology</a>
			<a href="/About/">About</a>


			<button class="bookCallBtn" on:click={redirectUser}>Book a Call</button>
		</div>
	</nav>

	

	<div class="mainSection">
		<div class="mainLeftContentSection">

			<!-- Header  -->
			<div class="headerMainContentSection">
				<div class="leftContentHeaderArea">
					<p>Worlds most Adopted AI</p>
				</div>
			</div>

			<!-- Middle Area -->
			<div class="middleMainContentSection">
				<div class="middleContentTitleArea">
					<div class="mainTitle">Revolutionizing Medical Reporting with AI</div>
				</div>

				<div class="middleContentSubTextArea">
					<div class="subtext">
						Scanlytics is an AI-powered solution designed to streamline medical reporting, enhance
						efficiency, and empower healthcare professionals to spend more time with patients.
					</div>
				</div>

			
			</div>

			<!-- Buttom Area of left main section -->
			<div class="ButtomMainContentSection">
				<div class="leftBtnSection">
					<button class="leftBtn_1" on:click={redirectUser}><a href="https://calendly.com/tobias-wedel-code/30min" class="bookCalllable">Book a Call</a></button>

					<button class="leftBtn_2" on:click={redirectTechnologyPage}>
						<a href="/Technology/" class="leftappointmentbtn">View Technology</a>
					</button>
				</div>
			</div>
			
			<!-- Gif Image -->
			<div class="rightContentSecitonInLeft">
				<img src="head-MRI-SCHWARZ.gif" alt="Brain GIF" width="70%" height="700" />
				<!-- <img src="LNz.gif" alt="Brain GIF" width="70%" height="700" /> -->

			</div>
		</div>
	</div>




	<footer class="footerSection">
		<div class="footer-content">
			<div class="footer-left">
				<p class="footer-left-text">© 2025 Scanlytics | Version 0.1</p>
			
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
    /* background-color: rgb(255, 254, 251); */
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* display: flex;
		flex-direction: column; */
		overflow: hidden;
	}

	nav {
		display: flex;
		width: '100%';
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

	.bookCalllable {
		color: black;
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
	}
	.bookCallBtn {
		/* background-color: rgb(255, 255, 255); */
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

	.homeBtn {
		color: white;
	}
	.mainSection {
		/* background-color: rgb(36, 34, 34); */
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		/* background-color: rgb(255, 23, 193); */
		width: 70%;
		height: 100%;
	}

	.rightContentSecitonInLeft {
		width: 1200px;
		position: absolute;
		top: 11%;
		left: 50%;
		opacity: 0.8;
		zindex: -3;
	}

	.headerMainContentSection {
		width: 100%;
		height: 7%;
		display: flex;
		align-items: center;
	}
	.leftContentHeaderArea {
		background-color: rgb(226, 241, 252);
		width: 20%;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		margin-left: 1%;
	}



	.middleMainContentSection{
		/* background-color: rgb(11, 139, 111); */

		width: 100%;
		height: 86%;
	}

	.middleContentTitleArea {
		/* background-color: rgb(139, 84, 11); */

		width: 100%;
		height: 80%;
	}

	.middleContentSubTextArea {
		/* background-color: rgb(29, 38, 44); */
		width: 70%;
		height: 20%;
		color: white;
		padding: 1%;
	}
	.mainTitle {
		/* background-color: rgb(37, 139, 11); */
		width: 70%;
		height: 100%;
		padding-left: 1%;
		font-size: 100px;
		font-family: system-ui;
		color: white;
	}

	.ButtomMainContentSection {
		/* background-color: rgb(139, 11, 11); */

		width: 70%;
		height: 7%;
		color: rgb(48, 48, 48);
		padding: 1%;
	}

	.leftBtnSection {
		width: 70%;
		height: 100%;
		color: rgb(48, 48, 48);
		display: flex;
		align-items: center;
		gap: 5%;
	}

	.leftBtn_1 {
		background-color: rgb(255, 255, 255);
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
		cursor: pointer;
	}

	.leftBtn_2 {
		background-color: black;
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid white;
		border-radius: 40px;
		color: black;
		cursor: pointer;

	}
	.leftappointmentbtn {
		color: white;
		font-size: 14px;
		font-weight: 400;
		font-family: system-ui;
	}
	.footerSection {
		width: 100%;
		height: 13%;
		/* background-color: rgba(209, 78, 78, 0.673); */

		padding: 1em;		
		/* margin-top: 5px; */


	}
	.footer-content{
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-between;


	}
	.footer-left{
		color: black;
		width: 40%;
		height: 100%;
		display: flex; 
		flex-direction: column; 
		justify-content: flex-end;
	}
	.footer-left-text{
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;

	
	}
	.footer-center{
		color: black;
		width: 30%;
		display: flex; 
		flex-direction: column; 
		justify-content: flex-end;
		align-items: end;


	}
	

	.footer-center-text{
		color: white;
		font-family: system-ui;
		font-size: 12px;
		opacity: 0.4;
		text-align: end;


	}


</style>
