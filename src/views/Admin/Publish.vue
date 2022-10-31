<template>
<div>
    <Header />
    <div class="spacer"></div>
    <div class="container width-800">

      <h3>Agregar nuevo proyecto</h3>
      <div class="spacer"></div>
      <Form @submit="submit"/>

        
      <div class="spacer-lg"></div>
    </div>
</div>
</template>

<script>
import Header from '../../components/header.vue'
import Form from '../../components/proyects/form.vue'

export default {
  name: 'Publish',
  components: {
    Header,
    Form
  },
  methods:{
    submit(form){
      this.$store.dispatch('proyect/submit', form)
    }
  }
}
</script>


