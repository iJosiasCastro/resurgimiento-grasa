<template>
  <div id="app">
    <div class="min-vh-100">
      <RouterView :key="$route.path" />
    </div>
    <Footer />
    <PortalTarget name="modal"></PortalTarget>
  </div>
</template>

<script>
  import Footer from './components/footer'
  export default {
    components:{
      Footer
    },
    created(){
      console.clear()
    }
  }
</script>

<style>
body{
  max-width: 100vw;
  overflow-x: hidden;
}
</style>