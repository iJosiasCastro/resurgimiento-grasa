<template>
<div>
    <div class="spacer-lg"></div>
    <nav class="bg-dark d-flex d-sm-flex flex-column flex-sm-row navbar navbar-dark pl-lg-5 pl-md-3 pr-lg-5 pr-md-3" data-pgc-define="footer" data-pgc-define-name="footer">
        <RouterLink to="/" class="align-items-center align-items-sm-center d-flex navbar-brand">
            <img src="@/assets/img/logo-solid-transp.png" height="50px" class="mr-2 rounded-circle shadow-sm"/>
            <div class="d-flex flex-column">
                <span class="font-weight-bold mb-n2">RESURGIMIENTO</span>
                <span class="font-weight-bold">GRASA</span>
            </div>
        </RouterLink>
        <div id="navbarSupportedContent" class="ml-0 ml-sm-auto">
            <ul class="ml-auto navbar-nav text-center">
                <li class="active nav-item">
                    <RouterLink class="font-weight-bold nav-link" to="/ingresar" v-if="!$store.state.auth.user">Ingresar</RouterLink>
                </li>
            </ul>
        </div>
        <div class="w-100 mt-2">
            <a class="text-white d-flex justify-content-center align-items-center small" href="https://halconweb.com.ar/">
                Desarrollado por &nbsp;<img height="35px" class="pb-1 pt-1" src="@/assets/img/logo-halconweb-horizontal-1024x287.png" alt="">
            </a>
        </div>
    </nav>
</div>
</template>