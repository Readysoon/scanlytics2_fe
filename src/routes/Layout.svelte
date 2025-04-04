<script>
    import Footer from './Footer.svelte';
    import Header from './Header.svelte';
  </script>
  
  <main>
    <div class="content-wrap">
      <Header />
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
    
    .content-wrap {
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
  