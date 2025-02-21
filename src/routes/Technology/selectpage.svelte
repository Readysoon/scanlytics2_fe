<script>
	import ImageUploader,{triggerclickEvent} from "./ImageUploader.svelte";

  //  let toggleupload = false 
   ImageUploader
</script>
  
<div class="boxSelectContentLayer">


  <div class="imgPreviewArea">


  <div class="boxSelectContent">
    <!-- <Selectpage /> -->
    <img src="/thoraxF.jpg" alt="Logo" height="100%" width="100%" />
    <div class="patientInfo">
      <div>15.07.2025</div>
    </div>

    <div class="patientInfoData">
      <div>Klaudia Wagner</div>
      <div class="patientB_Date">12.12.1999</div>

    </div>
  

  </div>
  <div class="boxSelectContent">
    <!-- <Selectpage /> -->
    <img src="/thoraxF.jpg" alt="Logo" height="100%" width="100%" />
    <div class="patientInfo">
      <div>15.07.2025</div>
    </div>

    <div class="patientInfoData">
      <div>Klaudia Wagner</div>
      <div class="patientB_Date">12.12.1999</div>

    </div>
  

  </div>
  <div class="boxSelectContent">
    <!-- <Selectpage /> -->
    <img src="/thoraxF.jpg" alt="Logo" height="100%" width="100%" />
    <div class="patientInfo">
      <div>15.07.2025</div>
    </div>

    <div class="patientInfoData">
      <div>Klaudia Wagner</div>
      <div class="patientB_Date">12.12.1999</div>

    </div>
  

  </div>
  <div class="boxSelectContent">
    <!-- <Selectpage /> -->
    <img src="/thoraxF.jpg" alt="Logo" height="100%" width="100%" />
    <div class="patientInfo">
      <div>15.07.2025</div>
    </div>

    <div class="patientInfoData">
      <div>Klaudia Wagner</div>
      <div class="patientB_Date">12.12.1999</div>

    </div>
  

  </div>
  <div class="boxSelectContent">
    <!-- <Selectpage /> -->
    <img src="/thoraxF.jpg" alt="Logo" height="100%" width="100%" />
    <div class="patientInfo">
      <div>15.07.2025</div>
    </div>

    <div class="patientInfoData">
      <div>Klaudia Wagner</div>
      <div class="patientB_Date">12.12.1999</div>

    </div>
  

  </div>

  </div>

  <div class="imgPreviewAddArea"> 
      <button class="read-btn" on:click={triggerclickEvent}>upload</button>

  </div>


  

  </div>
  
  <style>
  
    .boxSelectContentLayer{
		/* background-color: rgba(60, 60, 60, 0.753); */
		/* background-color: rgb(157, 157, 157); */

		height: 100%;
		width: 30%;
		display: flex;
		/* gap: 10%; */
		flex-direction: column;
		align-items: center;
		border-right: 1px solid rgb(175, 166, 166);

		/* padding-top: 5%; */
		/* justify-content: space-around; */
		/* overflow: auto; */
		/* border: 1px solid white; */
	}
  
	.imgPreviewArea{
		/* background-color: rgb(214, 12, 12); */
		padding-top: 15%;
		height: 90%;
		width: 100%;
		overflow: auto;
		display: flex;
		gap: 10%;
		flex-direction: column;
		align-items: center;
	}
	.imgPreviewAddArea{
		background-color: rgba(211, 210, 209, 0.64);
		height: 10%;
		width: 100%;
		border-top: 1px solid rgb(175, 166, 166);
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.boxSelectContent{
		/* flex: 1; */
		/* margin: 30px; */
		width: 80%;
		height: 25%;
		/* padding: 10px; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 5%;
		background-color: rgba(211, 210, 209, 0.64);
		border: 1px solid rgba(255, 255, 255, 0.066);
		position: relative;
	}
	.patientInfo{
		width: 97%;
		height: 10%;
		/* background-color: green; */
		/* padding: 0.2rem; */
		position: absolute;
		bottom: 1%;
		font-family: system-ui;
		color: white;
		font-size: 7px;
		font-weight: bold;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		opacity: 0.7;

	}
	.patientInfoData{
		width: 97%;
		height: 30%;
		/* background-color: green; */
		/* padding: 0.2rem; */
		position: absolute;
		top: 1%;
		font-family: system-ui;
		color: white;
		font-weight: bold;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: start;
		opacity: 0.8;
		font-size: 7px;
	}
	.patientB_Date{
		font-size: 7px;
	}

    
  </style>
  
  
  