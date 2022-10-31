<template>
    <form @submit.prevent="$emit('submit', form)">

        <div class="form-group mb-5">
          <label for="title">Título del proyecto</label>
          <input type="text" class="form-control" required placeholder="Ingresá el título del proyecto" v-model="form.title" id="title">
        </div>

        <div class="form-group mb-5">
          <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" v-model="form.activeEndDate" id="activeEndDate">
              <label class="custom-control-label" for="activeEndDate">Fecha de finalización</label>
          </div>
          <div class="mt-3" v-if="form.activeEndDate">
            <label for="startDate" class="sr-only">Fecha de finalización</label>
            <input type="date" required v-model="form.endDate" class="form-control" id="endDate"
              value="2018-07-22"
              min="2020-01-01" max="2023-01-01">
          </div>
        </div>


        <div class="form-group mb-5">
          <label for="status">Estado</label>
          <select v-model="form.status" id="status" class="custom-select">
            <option value="Planificación">Planificación</option>
            <option value="En progreso">En progreso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>

        <div class="form-group mb-5">
          <label>Tareas</label>
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center flex-column flex-md-row justify-content-start" v-for="(task, i) in form.tasks" :key="i">
              <textarea class="form-control mr-md-3 mb-2 mb-md-0" placeholder="Ingresá la descripción de la tarea" required v-model="task.description"></textarea>

              <div class="d-flex ml-auto">
                <div class="ml-md-2 pr-1">
                  <button type="button" class="btn btn-warning w-100" v-if="!task.status" @click="task.status=true">Pendiente</button>
                  <button type="button" class="btn btn-success w-100" v-if="task.status" @click="task.status=false">Completada</button>
                </div>
                <button type="button" class="btn btn-danger" @click="form.tasks.splice(i, 1)">
                  <i class="fa-sm fa-trash fas pointer"></i>
                </button>
              </div>
            </li>
          </ul>
          <button type="button" class="w-100 btn btn-success mt-3" @click="form.tasks.push({description: '', status: ''})"><b>+</b> Agregar tarea</button>
        </div>

        <div class="form-group mb-5">
          <label>Imagenes</label>
          <ImageUploader :edit="edit" @input="({value}) => form.images = value" />
        </div>

        <div class="form-group mb-5 pb-5"> 
            <label>Descripción</label>             
            <quill-editor v-show="showQuill" :options="editorOption" class="editor" v-model="form.description " />
        </div>

        <div>
          <button v-if="!$store.state.utils.uploading" type="submit" class=" btn btn-success">
              {{edit ? 'Editar proyecto' : 'Publicar proyecto'}}
          </button> 

          <button type="button" v-else class="btn btn-success">
              <div class="spinner-border spinner-border-sm"></div>
              Subiendo imagenes
          </button>

        </div>
      </form>
</template>

<script>
import ImageUploader from '@/components/proyects/imageUploader.vue'
    
export default {
    components:{
        ImageUploader
    },
    props:['edit'],
    created(){
        if(this.edit!=null){
          this.form = this.edit
        }
    },
    mounted(){
        setTimeout(()=>{
            this.showQuill = true
        }, 200)
    },
    data(){
      return {
        form: {
            title: '',
            activeEndDate: false, 
            endDate: null,
            status: 'Planificación',
            images: [],
            tasks: [],
            description: '',
            comments: []
        },
        showQuill: false,
        editorOption: {
            placeholder: "",
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'header': [1, 2, false] }],
                    [{ 'color': [] }],
                    [{ 'align': [] }],
                    ['link', 'video'],
                ],
            }
        },
      }
    }
}
</script>


<style>
.editor {
  height: 300px;
}

.editor p {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
}

.editor strong {
    font-weight: bold;
}
</style>