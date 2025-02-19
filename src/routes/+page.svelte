<script>
</script>

<head>
	<title>Scanlytics</title>
</head>

<body>
	<nav>
		<div class="logoArea">
			<img src="/logow.jpg" alt="Logo" height="30" width="28" />
			<h2 >Scanlytics</h2>
		</div>
		<div class="navbar">
			<a href="/" class="homeBtn">Home</a>
			<a href="/About/">About</a>
			<a href="/Demo/">Technology</a>
			<a href="/Services/">Services</a>

			<div class="bookCallBtn"><a href="/Booking /" class="bookCalllable">Book a Call</a></div>
		</div>
	</nav>

	<div class="mainSection">
		<div class="leftContentSection">
			<div class="leftContentHeader">
				<div class="leftContentHeaderArea">
					<p>Worlds most Adopted AI</p>
				</div>
			</div>

			<div class="middleContentSection">
				<div class="middleContentTitleArea">
					<div class="mainTitle">Revolutionizing Medical Reporting with AI</div>
				</div>

				<div class="middleContentSubTextArea">
					<div class="subtext">
						Scanlytics is an AI-powered solution designed to streamline medical reporting, enhance
						efficiency, and empower healthcare professionals to spend more time with patients.
					</div>
				</div>

				<div class="leftContentBtnArea">
					<div class="leftBtnSection">
						<div class="leftBtn_1"><a href="/Booking /" class="bookCalllable">Book a Call</a></div>

						<div class="leftBtn_2">
							<a href="/Booking /" class="leftappointmentbtn">Appointment</a>
						</div>
					</div>
				</div>
			</div>

			<div class="rightContentSecitonInLeft">
				<img src="me5.gif" alt="Brain GIF" width="70%"  height="700"/>
			</div>
		</div>
		 <div class="footerSection">	
		 footer
		 
		 </div>
	
	</div>
</body>

<style>
	body {
		background-color: rgb(0, 0, 0);
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
		overflow: hidden;
	}

	nav {
		display: flex;
		width: '100%';
		height: 35px;
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
		background-color: rgb(255, 255, 255);
		width: 20%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: white;
	}

	.homeBtn {
		color: white;
	}
	.mainSection {
		height: 690px;
		margin-top: 30px;
	}

	.leftContentSection {
		width: 70%;
		height: 100%;
	}

	.rightContentSecitonInLeft{
		width: 1200px;
		position: absolute; 
		top: 11%; 
		left: 50%;
		opacity: 0.8;
		zIndex: -3;
		

	}

	.leftContentHeader {
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

	.middleContentSection {
		width: 100%;
		height: 80%;
	}

	.middleContentTitleArea {
		width: 100%;
		height: 70%;
	}

	.middleContentSubTextArea {
		width: 70%;
		height: 24%;
		color: white;
		padding: 1%;
	}
	.mainTitle {
		width: 70%;
		height: 100%;
		padding-left: 1%;
		font-size: 100px;
		font-family: system-ui;
		color: white;
	}

	.leftContentBtnArea {
		width: 70%;
		height: 13%;
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
		height: 38%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid black;
		border-radius: 40px;
		color: black;
	}

	.leftBtn_2 {
		width: 30%;
		height: 38%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid white;
		border-radius: 40px;
		color: black;
	}
	.leftappointmentbtn {
		color: white;
	}
</style>
