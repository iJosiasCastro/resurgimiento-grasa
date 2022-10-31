<template>
<div>
    <Header />
    <div class="spacer-lg"></div>
    <div class="text-center width-600 container">
      <form @submit.prevent="loginWithEmail()">
        <h1 class="h3 mb-3 font-weight-normal">Ingresar</h1>
        <div>
          <div class="d-flex justify-content-center py-3">
              <div @click="loginWithGoogle()" type="button" class="align-items-center bg-primary border border-primary d-flex rounded text-center text-white" style="width: 280px !important">
                  <img src="@/assets/img//google.svg" height="40px" class="bg-white p-2 rounded"/> 
                  <span class="w-100">Ingresar con  <b>Google</b></span>
              </div>
          </div>
          <div class="spacer-sm"></div>
        </div>
        <div class="form-group text-left mb-4">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" placeholder="Escribí el email" required autofocus v-model="form.email">
        </div>
        <div class="form-group text-left">
          <label for="password">Contraseña</label>
          <input type="password" id="password" class="form-control" placeholder="Escribí la contraseña" required v-model="form.password">
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Ingresar</button>
        <p class="mt-5 mb-3 text-muted">Queremos verla cada día más gloriosa ❤️💚</p>
    </form>
    </div>
    
    <div class="spacer-lg"></div>
</div>
</template>

<script>
import Header from "../../components/header.vue";
export default {
  components: {
    Header,
  },
  data(){
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods:{
    loginWithEmail(){
      this.$store.dispatch('auth/loginWithEmail', this.form)
    },
    loginWithGoogle(){
      this.$store.dispatch('auth/loginWithGoogle')
    },
  }
};
</script>
