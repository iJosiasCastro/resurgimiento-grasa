<template>
<div>

<Header />

<div v-if="user">
    

    <div class="container width-600">
        <div class="spacer-lg"></div>


       
        <div class="bg-light card p-4 shadow-sm">

            <form class="lead" @submit.prevent="updateUsername()">
                
                <div class="d-flex flex-column form-group pb-4"> 
                    <label>Email de la cuenta:</label>             
                    <span>{{user.email}}</span>
                </div>

                <div class="pb-3">
                    <div class="spacer-sm"></div>
                    <h5>Cambiar nombre de usuario</h5>
                </div>
                
                <div class="d-flex flex-column form-group pb-4"> 
                    <label class="pb-2" for="username">Nombre de usuario</label>             
                    <input type="text" minlength="4" maxlength="25" class="bg-light card form-input" id="username" @input="username = $event.target.value" :value="user.displayName" placeholder="Escribí un nombre de usuario"> 
                </div>

                <button type="submit" class="btn btn-success">Guardar cambios</button>
            </form>
        </div>







        <div class="spacer"></div>
    </div>


</div>
</div>
</template>

<script>
import Header from "../../components/header.vue";


export default {
    components:{
        Header,
    },
    data(){
        return {
            username: '',
        }
    },
    computed:{
        user(){
            return this.$store.state.auth.user
        }
    },
    methods:{
        async updateUsername(){
            if(this.username.length){
                if(this.username != this.currentUsername){
                    await this.$store.dispatch('auth/updateUsername', this.username)
                }
            }
        }
    }
}
</script>