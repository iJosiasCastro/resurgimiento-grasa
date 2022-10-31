<template>
    <div class="row">
        <template v-if="proyects.length">
            <div class="col-6 col-lg-4 col-md-4 p-2 p-md-3" v-for="(p, i) in proyects" :key="i">
                <RouterLink :to="`/proyecto/${p.id}`" class="bg-light card">
                    <button type="button" v-if="edit" class="delete-button btn btn-danger" @click="$store.dispatch('proyect/delete', p.id)">Eliminar</button>
                    <RouterLink :to="`/editar/${p.id}`" v-if="edit" class="edit-button btn btn-warning">Editar</RouterLink>
                    <div :style="{'background-image': `url(${p.images[0]}})`}" class="align-items-start card-img d-flex flex-column justify-content-end">
                        <div class="card-gradient p-2 w-100">
                            <div class="btn mb-1 mt-2 status-button" :class="{'btn-primary' : p.status == 'Planificación', 'btn-info' : p.status == 'En progreso', 'btn-success' : p.status == 'Completado',}" >{{p.status}}</div>
                            <h5 class="mb-0 text-light">{{p.title}}</h5>
                            <small class="text-white">Modificado {{p.lastModification | moment("from", "now")}}</small>
                        </div>
                    </div>
                    <div class="bg-success card-line-bottom"></div>
                </RouterLink>
            </div>
        </template>

        
        <!-- Skeletor -->
        <div v-else class="col-6 col-lg-4 col-md-4 p-2 p-md-3" v-for="i in 6" :key="i">
            <div class="bg-light card">
                <div :style="{'background-color': `#ddd`}" class="align-items-start card-img d-flex flex-column justify-content-end">
                    <div class="card-gradient p-2 w-100">
                        <div class="btn mb-1 mt-2 status-button">&nbsp;</div>
                        <h5 class="mb-0 text-light">&nbsp;</h5>
                    </div>
                </div>
                <div class="bg-success card-line-bottom"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props:['edit', 'limit'],
    async created(){
        this.proyects = await this.$store.dispatch('proyect/get', this.limit)
    },
    data(){
        return{
          proyects: []  
        }
    }
}
</script>


<style scoped>
.delete-button {
    position: absolute;
    right: 5px;
    top: 45px;
}
.edit-button {
    position: absolute;
    right: 5px;
    top: 5px;
}

.card-img {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center center;
}

.card-line-bottom {
    height: 10px;
}

.card-gradient {
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(0,0,0,0.8));
}

</style>
