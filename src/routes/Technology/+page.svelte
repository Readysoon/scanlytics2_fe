<script>
  import ImageUploader from './ImageUploader.svelte';
  import TextList from './TextList.svelte';
  import Guide from './Guide.svelte';
  import Footer from './Footer.svelte';
  import { onMount } from 'svelte';
  import TextEditor from './TextEditor.svelte';

  let texts = [];
  let selectedText = '';
  let isMobile = false;

  if (typeof window !== 'undefined') {
    isMobile = window.innerWidth <= 600;
    window.addEventListener('resize', () => {
      isMobile = window.innerWidth <= 600;
    });
  }

 

  onMount(async () => {
    try {
      const response = await fetch('https://scanlytics2-ml.fly.dev/', {
        method: 'GET'
      });
      console.log('Pinging ml server... ');
      if (response.ok) {
        console.log('Ml server started successfully');
      } else {
        console.error('Failed to start server', response.status);
      }
    } catch (error) {
      console.error('Error starting server', error);
    }
  });

 

  onMount(async () => {
    try {
      console.log('Pinging whisper server... ');
      const response = await fetch('https://scanlytics2-whisper.fly.dev/', {
        method: 'GET'
      });
      if (response.ok) {
        console.log('Whisper server started successfully');
      } else {
        console.error('Failed to start server', response.status);
      }
    } catch (error) {
      console.error('Error starting server', error);
    }
  });

  function handleSelect(text) {
    selectedText += (selectedText ? '\n' : '') + text;
    texts = texts.filter(t => t !== text);
  }


//   function handleUploadSuccess(parsedTexts) {
//     texts = parsedTexts;
//   }
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
			<a href="/" >Home</a>
			<a href="/Vision/">Vision</a>
			<a href="/Technology/" class="technologyBtn">Technology</a>
			<a href="/Services/">Services</a>


			<button class="bookCallBtn" on:click={() => console.log('in btn')}>Book a Call</button>
		</div>
	</nav>

	

	<div class="mainSection">
		<div class="mainLeftContentSection">

			<div class="boxArea">

				<div class="box">
				  <!-- <ImageUploader onUploadSuccess={handleUploadSuccess} /> -->
				</div>

				<div class="box">
				  <TextEditor bind:text={selectedText} />
				</div>

				<div class="box">
				  <TextList {texts} onSelect={handleSelect} />
				</div>
			</div>


			 
		  <div class="explainArea">
			<Guide {isMobile} />

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
		background-color: rgb(0, 0, 0);
		height: 100vh;
		/* display: flex;
		flex-direction: column; */
		overflow: hidden;
	}

	.boxArea{
		/* background-color: rgb(65, 167, 47); */

		display: flex;
		height: 88%;
	}
	.box {
    flex: 1;
    margin: 80px;
	height: 89%;
    /* padding: 10px; */
	width: 5px;
	background-color: rgb(211, 210, 209);

    border: 1px solid #ccc;
  }

  .explainArea{
	/* background-color: rgba(87, 167, 47, 0.421); */
	height: 25%;

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

	}

	.technologyBtn {
		color: white;
	}
	.mainSection {
		/* background-color: rgb(36, 34, 34); */
		height: 77%;
		margin-top: 30px;
	}

	.mainLeftContentSection {
		/* background-color: rgb(255, 23, 193); */
		width: 100%;
		height: 100%;
		position: relative;
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
