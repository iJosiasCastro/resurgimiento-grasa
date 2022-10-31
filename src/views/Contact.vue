<template>
<div>
    <Header />
    <div class="spacer"></div>
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSec9OEpFdLycDwb9Jfsd1zR4wGSmsMOMPd9UuPFY3kdfi3B0w/viewform?embedded=true"
      width="100%"
      height="1000px"
      frameborder="0"
      marginheight="0"
      marginwidth="0">
      Cargando…
    </iframe>
</div>
</template>
<script>
import Header from "../components/header.vue";
export default {
  components: {
    Header,
  },
};
</script>
