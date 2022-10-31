<template>
    <div>
        <!-- Image uploader -->
        <div class="form-group" @dragover.prevent="dragOver" @dragleave.prevent="dragLeave" @drop.prevent="submit($event)">

            <div :style="{'opacity' : dropped == 2 ? '50%' : '100%' }">

            <div>
                <div class="w-100 align-items-center border-info d-flex flex-column image-uploader justify-content-center m-1 pointer text-info"> 
                    <input
                        type="file"
                        style="z-index: 1"
                        accept="image/png, image/jpeg"
                        ref="uploadInput"
                        @input="submit($event)"
                        multiple
                        :required="!files.length"
                    />
                    <i class="fa-camera fa-lg fas"></i> 
                    <span class="small">Agregar fotos</span>
                </div>
            </div>

            <draggable class="d-flex flex-wrap" v-model="files">
                <div v-for="(file, i) in files" :key="i" class="align-items-center border d-flex flex-column image-preview-div position-relative justify-content-center m-1 shadow-sm text-danger"> 
                    <div class="image-preview" :style="{'background-image' : `url(${file.image!=undefined ? ObjectURL(file.image) : file.url})`}"></div>
                    <span class="text-info isThumbnail pb-2 bg-light w-100 text-center">Principal</span>
                    <div class="trash">
                    <i @click="deleteFile(i)" class="bg-white fa-sm fa-trash fas p-2 pointer rounded-circle"></i>
                    </div>
                </div>
            </draggable>
            </div>      

        </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'Images',
    props:['edit'],
    components:{
        draggable
    },
    created(){
        if(this.edit!=null){
            this.edit.images.forEach(e => {
                this.files.push({url: e})
            })
        }
    },
    data() {
        return {
            files: [],
            dropped: 0,
            maxError: 'Se pueden subir hasta 5 imagenes',
            fileError: 'Solo se pueden subir imagenes',  
            max: 100,
        }
    },  
    watch:{
        files(){
            const f = this.files
            this.$emit('input', {name: 'images', value: f.map((f)=>{return f.url})})
        }
    },
    methods: {
        upload(){
            this.files.forEach(async (file, i) => {
                if(typeof file == 'object'){
                if(file.url == ''){
                    const f = this.files[i]
                    const url = await this.$store.dispatch('uploadImageAndGetUrl', {route: `proyects/${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`, img: file.image, id: file.id, size: 1920})
                    this.files.splice(this.files.findIndex(a=>a.id==f.id), 1, {...f, url})
                }
                }
            })

            
        },
        dragOver() {
        this.dropped = 2
        },
        dragLeave() {
        this.dropped = 0
        },
        submit(e) {
        let status = true
        let files = []
        e.type=='drop' ?
            files = Array.from(e.dataTransfer.files) :
            files = Array.from(e.target.files)

        if (e && files) {
            files.forEach((file) => {
            if (file.type.startsWith("image") == false) status = false
            })
            if (status == true) {
            if (
                this.max &&
                files.length + this.files.length > this.max
            ) {
                this.$toast.error(this.maxError)
            } else {
                files.forEach(async file => {
                if(typeof file != 'string'){
                    this.files.push({image: file, url: '', id: await this.$store.dispatch('uid')})
                    this.upload()
                }
                })
                this.$emit("changed", this.files)
            }
            } else {
                this.$toast.error(this.fileError)
            }
        }
        this.dropped = 0
        },
        append() {
        this.$refs.uploadInput.click()
        },
        deleteFile(index) {
        const file = this.files.splice(index, 1)[0]
        if(typeof file == 'string'){
            return this.$store.dispatch('deleteFileFromUrl', file)
        }else{
            file.url == '' ? 
            this.$store.commit('SET_CANCEL_UPLOAD', file.id)
            : this.$store.dispatch('deleteFileFromUrl', file.url)
            this.$emit("changed", this.files)
            this.$refs.uploadInput.value = null
        }

        },
        ObjectURL(image){
            return URL.createObjectURL(image)
        },
    },
}
</script>

<style scoped>
.isThumbnail{
  display: none;
  cursor: move;
}

.image-preview-div:first-of-type .isThumbnail{
  display: block !important;
}

input {
    width: 90%;
    height: 100px;
    opacity: 0;
    position: absolute;
    background: red;
    display: block;
}
input:hover {
    cursor: pointer;
}

.image-uploader {
    height: 120px;
    font-size: 16px;
    border-width: 1px;
    border-style: dashed;
}

.image-uploader:hover {
    opacity: 60%;
}

.image-preview-div {
    width: 170px;
    height: 170px;   
}

.image-preview {
    width: 170px;
    height: 170px;
    /* background-image: url(''); */
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
}

.image-preview:hover {
    cursor: move;
}

.trash {
  position: absolute;
  top: 10px;
  right: 10px;
}



</style>