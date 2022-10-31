<template>
<div class="header-image">
    <nav class="navbar navbar-dark navbar-expand-lg pl-lg-5 pl-md-3 pr-lg-5 pr-md-3">
        <RouterLink to="/" class="align-items-center align-items-sm-center d-flex navbar-brand">
            <img src="@/assets/img/logo.png" height="50px" class="mr-2 rounded-circle shadow-sm"/>
            <div class="d-flex flex-column">
                <span class="font-weight-bold mb-n2">RESURGIMIENTO</span>
                <span class="font-weight-bold">GRASA</span>
            </div>
        </RouterLink>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse ml-auto navbar-collapse" id="navbarSupportedContent">
            <ul class="ml-auto navbar-nav text-center">
                <li class="active nav-item">
                    <RouterLink class="font-weight-bold nav-link" to="/">Inicio</RouterLink>
                </li>
                <li class="active nav-item">
                    <RouterLink class="font-weight-bold nav-link" to="/proyectos">Proyectos</RouterLink>
                </li>
                <li class="active nav-item" v-if="!$store.state.auth.admin">
                    <RouterLink to="/contacto">
                        <button type="button" class="btn btn-success ml-2">Contactá con nosotros</button>
                    </RouterLink>
                </li>
                <li class="active nav-item" v-if="$store.state.auth.admin">
                    <RouterLink class="font-weight-bold nav-link" to="/dashboard">Administrar</RouterLink>
                </li>
                <li class="active nav-item mt-2 mt-lg-0" v-if="$store.state.auth.user">
                        <button type="button" class="btn btn-danger ml-2" @click="logout()">Salir</button>
                        <RouterLink to="/perfil" class="h5">
                            <div class="fa-cog fa-fw fa-sm fas text-white mx-1"></div>
                        </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
    <slot></slot>
</div>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch('auth/logout')
        }
    }
}
</script>