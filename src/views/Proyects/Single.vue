<template>
<div>
    <Header />
    <div class="spacer-lg d-none d-md-block"></div>
    <div class="spacer-sm d-block d-md-none"></div>

    <div class="container width-800" v-if="p!=null">
        <div class="row">
            <Gallery :imgs="p.images" />
            

            <div class="col-12 col-md-4">
                <h2 class="h4">{{p.title}}</h2>
                <div class="btn mb-1 mt-2 status-button" :class="{'btn-primary' : p.status == 'Planificación', 'btn-info' : p.status == 'En progreso', 'btn-success' : p.status == 'Completado',}" >{{p.status}}</div>
                <div class="spacer-sm"></div>
                    <div>
                        <p>⚙️ Última modificación: <br>
                            {{p.lastModification | moment("from", "now") | capitalize}}
                        </p>
                    </div>
                    <div class="spacer-sm"></div>
                    <div>
                        <p>📅 Publicada: <br>
                            {{p.date | moment("LL") | capitalize}}
                        </p>
                    </div>

                    <div v-if="p.activeEndDate">
                        <hr>
                        <p>📅 Finaliza: <br>
                            {{p.date | moment("LL") | capitalize}}
                        </p>
                    </div>

                    <div class="spacer-sm"></div>
            </div>

            <div class="col-12 col-md-8">

                <h2 class="h4" v-if="p.description">Descripción</h2>
                <div v-html="p.description"></div>

                <div class="spacer"></div>

                <h2 class="h4" v-if="p.tasks.length>0">Tareas</h2>
                <ul class="list-group">
                    <li class="list-group-item d-flex align-items-center" v-for="(task, i) in p.tasks" :key="i">
                        <p class="w-100 mb-0">{{task.description}}</p>
                        <div class="ml-2">
                            <button type="button" class="btn btn-warning w-100" v-if="!task.status">Pendiente</button>
                            <button type="button" class="btn btn-success w-100" v-if="task.status">Completada</button>
                        </div>
                    </li>
                </ul>
                <div class="spacer"></div>



                <h2 class="h4">Chat</h2>
                <Chat :id="p.id" />
            </div>
        </div>

        <div class="spacer-lg"></div>
        <div class="spacer-lg"></div>
        <h2 class="font-weight-normal h4 pb-3">Nuestros últimos proyectos:</h2>
        <Grid :limit="6" />
        <div>
            <div class="spacer-sm"></div>
            <div class="text-center">
                <button type="button" class="btn btn-success">Ver todos los proyectos</button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Header from '../../components/header.vue'
import Chat from '../../components/proyects/chat.vue'
import Grid from '../../components/proyects/grid.vue'
import Gallery from '../../components/proyects/gallery.vue'
export default {
    async created(){
        this.p = await this.$store.dispatch('proyect/getById', this.$route.params.id)
    },
    data(){
        return {
            p: null
        }
    },
    components:{
        Header,
        Chat,
        Gallery,
        Grid
    },
    filters:{
        capitalize(a){
            return a.charAt(0).toUpperCase() + a.substring(1)

        }
    }
}
</script>

<style scoped>
.ql.video{
    width: 100%;
}


</style>}