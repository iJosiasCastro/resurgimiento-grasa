<template>
<div>
    <Header>
        <div class="width-600">
            <div class="spacer"></div>
            <div class="text-center width-400">
                <h2 class="h4 text-white">Nuestros proyectos</h2>
            </div>
            <div class="spacer"></div>
        </div>
    </Header>
    <div class="width-800 container">
        <div class="spacer"></div>

        <Grid />
        <div class="spacer"></div>
        <RouterLink to="/contacto" class="hover">
            <div class="bg-success p-2 rounded text-center text-light">
                <div class="pb-2 pt-1 width-400">
                    <h4 class="h5 mb-0">¿Tenés un proyecto o propuesta nueva?</h4>
                    <h4 class="font-weight-normal h5">Queremos conocerla</h4>
                </div>
                <div class="bg-white py-2 rounded text-body">
                    <h4 class="align-items-center d-flex h5 justify-content-center mb-0"><i class="fa fa-2x fa-fw fa-plus"></i>Enviar proyecto</h4>
                </div>
            </div>
        </RouterLink>
        <div class="spacer-lg"></div>
        <div class="spacer-lg"></div>
    </div>
    <Contact />

</div>
</template>
<script>
import Header from '../../components/header.vue'
import Grid from '../../components/proyects/grid.vue'
import Contact from '../../components/contact'
export default {
    components:{
        Header,
        Grid,
        Contact
    }
}
</script>
