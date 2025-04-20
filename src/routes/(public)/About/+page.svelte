<script>
	import Layout from '../../Layout.svelte';

	import Footer from '../../Footer.svelte';
	import Header from '../../Header.svelte';

	import { isMobile } from '../../../stores/device.js';
  </script>


<main>
	<Header />

	<div class="page_container">
		<div class="Above">
			<!-- <h2>Team</h2> -->
		</div>

		<div class="Vision">
			<div class="Text-container">
                
                
               
                <div class="Text-container-content">
                    <div class="Text-container-content-header">
                        <h2>Team</h2>
                    </div>
                    <div class="Text-container-content-Text">
                        <p>
                            In Scanlytics we want to create the Radiologist of the future. We want to transform their workflow from a monotonous and isolated environment to an intelligent and interactive one. In our first step we create a Conversational AI Assistant that helps Radiologists to create structured reports in a very efficient way. 
                        </p>
                    </div>
                 

                </div>
			
			</div>
			<div class= "image-container">
				<!-- <img src="/HighTechVision.png" alt="Group Image" /> -->
                <img src="/ScanlyticsGroupImage4.jpg" alt="Group Image" class="image-content" />

			</div>
		</div>


          <div class="AboveVision">
                <!-- <h2>Vision</h2> -->
            </div>
		<div class="GroupImage">
            <!-- <div class="Above">
                <h2>Team</h2>
            </div> -->
			<!-- <div class="vision-image-container">
                <img src="/HighTechVision.png" alt="Group Image" />

			</div>  -->
            <div class="Text-container">
                
                
               
                <div class="Text-container-content">
                    <div class="Text-container-content-header">
                        <h2>Vision</h2>
                    </div>
                    <div class="Text-container-content-Text">
                        <p>
                            In Scanlytics we want to create the Radiologist of the future. We want to transform their workflow from a monotonous and isolated environment to an intelligent and interactive one. In our first step we create a Conversational AI Assistant that helps Radiologists to create structured reports in a very efficient way. 
                        </p>
                    </div>
                 

                </div>
			
			</div>
            <div class="vision-image-container">
                <img src="/HighTechVision.png" alt="Group Image" />

			</div>
		</div>
	</div>
	<Footer />
</main>
  
  <style>
	main {
	background-color:	 rgb(0, 0, 0);
	height: 100vh;
	overflow: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE and Edge */
	}



.page_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100vh; Allow the content to grow */
    min-height: 100vh;
    /* flex-wrap: wrap; */
    overflow: auto;
    /* overflow: auto; Enable scrolling if content exceeds the viewport height */
	/* align-items: center; */
    
    gap: 40px;
    /* background-color: pink; */
}


.Above {
    /* background-color: orange; */
    width: 100%;
    height: 8vh;
    /* padding-top: 70px; */
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 29px;

}

.AboveVision{
    width: 100%;
    height: 8vh;
    padding-left: 2%;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 29px;
    /* background-color: orange; */
    /* border-top: 1px solid white ; */
    
}

.AboveVision h2 {
    color: white;
    font-family: system-ui;
}

.Vision {
    /* background-color: green; */
    flex-direction: row;
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    /* text-align: center; */
    height: 40vh;
    width: 100%;
    /* flex-grow: 1; */


}

.Above h2 {
    color: white;
    font-family: system-ui;
}

.Text-container {
    /* background-color: orangered; */
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    text-align: center;
    height: 100%;
    width: 59%;
}

.Text-container-content{
    /* background-color: #242121; */
    width: 80%;
    height: 100%;
    display: flex;
    /* justify-content: center; */
    /* align-items: center; */
    font-size: 27px;
    flex-direction: column;
    gap: 30px;

   


}

.Text-container-content-header{
    /* background-color: grey; */
    height: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    font-family: system-ui;
    width: 100%;

    
}
.Text-container-content-Text{
    /* background-color: rgb(234, 90, 90); */
    height: 87%;
    display: flex;
    justify-content: center;
    /* align-items: center;  */
    
}

.Text-container-content-Text p{
  
    color: white;
    width: 90%;
    /* padding-top: 15px; */
    text-align: center;
    font-family: system-ui;
    font-weight: 700;
    opacity: 0.8;
    font-size: 26px;

}


.image-container {
    /* background-color: pink; */
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
    /* position: relative; */
}

.image-content{
    background-color: green;

}




.GroupImage {
    /* background: pink; */
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    /* gap: 40px; */
    /* margin-top: 20px; Add some space above the group image */
	/* max-width: 80%; */
    width: 100%;
    padding-left: 2%;
    /* height: 40vh; */
}

.vision-image-container {
    min-width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    position: relative;
    margin-right: 50px;
}


.GroupImage h2 {
    padding-top: 20px;
    color: white;
    font-family: system-ui;
}

.GroupImage img {
    max-height: 100%; /* Make image only as high as the container */
    padding-top: 10px;
    width: auto; /* Maintain aspect ratio */
    object-fit: contain; /* Ensure the image fits within the container */
    position: relative; /* Change to relative for better flow */
    max-width: 100%; /* Ensure the image does not overflow the container */
}

@media (max-width: 1024px) {
    .image-container {
        margin-bottom: 50px;
    }

	.Vision {
		flex-direction: column !important;
	}

	.vision-image-container {
		margin-top: 50px;
		margin-left: 90px;
		margin-right: 90px;
}

}
  </style>