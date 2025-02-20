<script>
</script>

<head>
	<title>Scanlytics</title>
</head>

<body>
	<nav>
		<div class="logoArea">
			<img src="/logow.jpg" alt="Logo" height="30" width="28" />
			<h2>Scanlytics</h2>
		</div>
		<div class="navbar">
			<a href="/" >Home</a>
			<a href="/About/">About</a>
			<a href="/Technology/" class="TechnologyBtn">Technology</a>
			<a href="/Services/">Services</a>

			<div class="bookCallBtn"><a href="/Booking /" class="bookCalllable">Book a Call</a></div>
		</div>
	</nav>

	<div class="mainSection">
		
	</div>
</body>
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

<style>
	html, body {
		background-color: rgb(0, 0, 0);
		height: 100vh;
		display: flex;
		flex-direction: column;
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

	
  .TechnologyBtn{
    color: white;
  }
	.mainSection {
    background-color: rgb(190, 39, 39);
		height: 80%;
		margin-top: 30px;
	}


	.footerSection {
		width: 100%;
		height: 10%;
		margin-top: 5px;


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
