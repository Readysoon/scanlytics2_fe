<script>
    export let currentSlide;
    export let slides;

    function showUsaImage() {
        // Assuming the USA image is at index 1
        currentSlide = 1;
    }
  </script>
  
  <style>
    .imageContainer {
      position: relative;
      display: inline-block; /* Ensure the container sizes to the image */
    }
  
    .imageContainer img {
      width: 100%;
      height: auto;
      display: block; /* Remove any space below the image */
    }
  
    .box {
      position: absolute;
      border: 2px solid red;
      background-color: rgba(255, 0, 0, 0.3);
    }
  
    .usa {
      top: 10%; /* Adjust these values based on your image */
      left: 5%;
      width: 35%;
      height: 45%;
    }
  
    .europe {
      top: 20%;
      left: 44%;
      width: 15%;
      height: 27%;
    }
  
    .africa {
      top: 47%;
      left: 44%;
      width: 20%;
      height: 41%;
    }

    .china {
      top: 62%;
      left: 76%;
      width: 22%;
      height: 32%;
    }

    .australia {
      top: 62%;
      left: 76%;
      width: 22%;
      height: 32%;
    }

  </style>
  
  <div class="imageContainer">
    <img src={slides[currentSlide].image} alt/>

    {#if currentSlide === 0}
        <div class="box usa" on:click={showUsaImage}></div>
        <div class="box europe"></div>
        <div class="box china"></div>
        <div class="box africa"></div>
        <div class="box australia"></div>
    {/if}
  </div>
  