<script>
  import { onMount } from 'svelte';

  let currentIndex = 0;
  const totalImages = 25; // Total number of images
  let images = [];

  // Populate images array with image paths using Array.from
  onMount(() => {
    images = Array.from({ length: totalImages }, (_, i) => `scroll/${i + 1}.jpg`);
    
    // Add scroll event listener
    window.addEventListener('wheel', handleScroll);
    
    // Cleanup the event listener on component destroy
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  });

  function handleScroll(event) {
    if (event.deltaY > 0) {
      nextImage();
    } else {
      previousImage();
    }
  }

  function nextImage() {
    if (currentIndex < totalImages - 1) {
      currentIndex += 1;
    }
  }

  function previousImage() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    }
  }
</script>

<div class="image-scroller">
  <img src={images[currentIndex]} alt={`MRI Image ${currentIndex + 1}`} />
</div>

<style>
  .image-scroller {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh; /* Full height for better scrolling experience */
    overflow: hidden; /* Prevent scrollbars */
  }

  img {
    max-width: 100%;
    max-height: 80vh; /* Adjust based on your layout */
    margin: 20px 0;
  }
</style>
