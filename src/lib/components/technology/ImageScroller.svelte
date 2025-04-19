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
    
    // Add touch event listeners
    const imageScroller = document.querySelector('.image-scroller');
    imageScroller.addEventListener('touchstart', handleTouchStart);
    imageScroller.addEventListener('touchmove', handleTouchMove);
    imageScroller.addEventListener('touchend', handleTouchEnd);
    
    // Cleanup the event listeners on component destroy
    return () => {
      window.removeEventListener('wheel', handleScroll);
      imageScroller.removeEventListener('touchstart', handleTouchStart);
      imageScroller.removeEventListener('touchmove', handleTouchMove);
      imageScroller.removeEventListener('touchend', handleTouchEnd);
    };
  });

  let startY = 0; // Starting Y position for touch
  let isDragging = false; // To track if the user is dragging

  function handleScroll(event) {
    if (event.deltaY > 0) {
      nextImage();
    } else {
      previousImage();
    }
  }

  function handleTouchStart(event) {
    startY = event.touches[0].clientY; // Get the initial touch position
    isDragging = true; // Set dragging flag
  }

  function handleTouchMove(event) {
    if (!isDragging) return; // If not dragging, do nothing

    const currentY = event.touches[0].clientY; // Get the current touch position
    const diffY = startY - currentY; // Calculate the difference

    // Determine if we should change the image based on the swipe direction
    if (diffY > 50) { // Swipe up
      nextImage();
      startY = currentY; // Reset start position
    } else if (diffY < -50) { // Swipe down
      previousImage();
      startY = currentY; // Reset start position
    }
  }

  function handleTouchEnd() {
    isDragging = false; // Reset dragging flag
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
