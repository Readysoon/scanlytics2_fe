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
      min-height: 100vh;
    }

    .slot-container {
      display: flex;
      flex-direction: column;
      flex: 1;
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
  