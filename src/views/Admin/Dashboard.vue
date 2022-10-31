<template>
<div>
    <Header>
        <div class="width-600">
            <div class="spacer"></div>
            <div class="text-center width-400">
                <h2 class="h4 text-white">Administrar proyectos</h2>
            </div>
            <div class="spacer"></div>
        </div>
    </Header>
    <div class="width-800 container">
        <div class="spacer"></div>
        <RouterLink to="/publicar" class="hover">
            <div class="bg-success p-2 rounded text-center text-light">
                <div class="bg-white py-2 rounded text-body">
                    <h4 class="align-items-center d-flex h5 justify-content-center mb-0"><i class="fa fa-2x fa-fw fa-plus"></i>Crear un nuevo proyecto</h4>
                </div>
            </div>
        </RouterLink>
        <div class="spacer-sm"></div>

        <Grid :edit="true" />
        
        <div class="spacer-lg"></div>
    </div>

</div>
</template>

<script>
import Header from "../../components/header.vue";
import Grid from "../../components/proyects/grid.vue";
export default {
  components: {
    Header,
    Grid
  },
}
</script>
