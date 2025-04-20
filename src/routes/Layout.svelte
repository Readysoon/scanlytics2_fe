<script>
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
  </script>
  
  <main>
    <Header />
      <div class="slot-container">
        <slot></slot>
      </div>
    <Footer />
  </main>
  
  <style>
    main {
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* Ensure the main takes at least full viewport height */
    }

    .slot-container {
        display: flex;
        flex-direction: column;
        flex: 1; /* Allow the slot container to grow */
        overflow: auto; /* Enable scrolling if the content exceeds the height */
    }
</style>

  <!--
Layout Template Below

<script>
  import Layout from '../Layout.svelte';
</script>

<Layout>

</Layout>

<style>

</style>
  

  -->
  