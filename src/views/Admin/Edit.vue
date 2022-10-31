<template>
<div>
    <Header />
    <div class="spacer"></div>
    <div class="container width-800" v-if="proyect!=null">

      <h3>Editar proyecto</h3>
      <div class="spacer"></div>
      <Form @submit="update" :edit="proyect" />

        
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
  async created(){
    this.proyect = await this.$store.dispatch('proyect/getById', this.$route.params.id)
  },
  data(){
    return {
        proyect: null
    }
  },
  methods:{
    update(form){
      this.$store.dispatch('proyect/update', form)
    }
  }
}
</script>


