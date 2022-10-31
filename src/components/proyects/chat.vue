<template>
    <div class="bg-light border p-3">
        <div id="messages" class="messages pb-2 border-bottom">
            <div v-if="messages.length == 0">
                <span class="text-muted">
                    Aun no hay mensajes
                </span>
            </div>
            <div v-for="(m, i) in messages" :key="i"
                class="message p-2 rounded"
                :class="isAuthor(m) ? 'bg-success message-send text-light' : 'bg-white message' ">

                <!-- Trash button -->
                <div style="height: 0px;" :class="isAuthor(m) ? 'text-left' : 'text-right' ">
                    <i class="mb-n3 fa fa-trash h5 text-danger pointer"
                    v-if="$store.state.auth.admin"
                    @click="deleteMessage(m.id)"
                    style="position: relative;"
                    :style="isAuthor(m) ? 'right: 45px;' : 'left: 45px;' "
                    ></i>
                </div>

                <h6 class="h6 text-success mb-1 font-weight-bold" v-show="!isAuthor(m)">{{m.userName}}</h6>
                <div>
                    <template v-if="m.type=='message'">
                        <!-- Message -->
                        <p>{{m.content}}</p>
                    </template>

                    <template v-if="m.type=='audio'">
                        <!-- Audio -->
                        <audio id="audio1" class="w-100 mt-2" controls>
                            <source :src="m.content" type="audio/wav">
                        </audio>
                    </template>

                    <template v-if="m.type=='image'">
                        <!-- Image -->
                        <div class="w-100 text-center">
                            <img class="image mx-auto pointer" width="100%" :src="m.content" @click="showPhotoSwipe(m.content)" alt="">
                        </div>
                    </template>
                </div>


            </div>
            <div id="scroll"></div>

        </div>
        <div class="mt-2">

            <div v-show="$store.state.auth.user==null" class="text-center w-100">
                Para chatear primero tenés que <b><RouterLink to="/ingresar">Ingresar</RouterLink></b>
            </div>

            <div v-show="$store.state.auth.user!=null">
                <div class="align-items-center d-flex flex-row">
                    <template v-if="audio==null && image==null">
                        <!-- Message -->
                        <textarea v-model="message" class="textarea resize-ta bg-white card form-input pr-5 w-100" id="formInput27" placeholder="Escribe un mensaje" rows="1"></textarea>
                        <i v-if="message.length==0" @click="$refs.inputImage.click()" class="fa fa-image h2 mb-0 pointer" style="width: 0; position: relative; left: -42px;"></i>
                        <input
                            class="d-none"
                            type="file"
                            style="z-index: 1"
                            accept="image/png, image/jpeg"
                            ref="inputImage"
                            @input="loadImage($event)"
                        />
                    </template>
                    
                    <template  v-if="audio">
                        <!-- Audio -->
                        <div class="bg-white card form-input pr-5 w-100">
                            <audio id="audio1" class="w-100" controls>
                                <source :src="previewAudio" type="audio/wav">
                            </audio>
                        </div>
                        <i class="fa fa-trash h3 text-danger mb-0 pointer" @click="audio = null" style="width: 0; position: relative; left: -42px;"></i>
                    </template>

                    <template  v-if="image">
                        <!-- Image -->
                        <div class="bg-white card form-input pr-5 w-100">
                            <img class="preview-image mx-auto" :src="previewImage" alt="">
                        </div>
                        <i class="fa fa-trash h3 text-danger mb-0 pointer" @click="image = null" style="width: 0; position: relative; left: -42px;"></i>
                    </template>

                    <div>
                        <div class="align-items-center d-flex justify-content-center mb-0 ml-1 text-success user-icon">
                            <div v-if="audio==null && image==null && message.length==0">
                                
                                <!-- <VueRecordAudio ref="recorder" @result="recordAudio" >
                                </VueRecordAudio>                 -->
                                <RecordAudio @result="recordAudio"/>
                                 
	
                                

                            </div>
                            <i v-else @click="sendMessage()" class="fa h3 fa-send pointer"></i>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <Modal name="Info">
            <div class="pb-5 pt-3 text-center d-flex flex-column">
                <div class="text-center">

                </div>
            </div>
        </Modal>

        <v-photoswipe class="viewer" :isOpen="isOpen" :items="viewImage" :options="{index: 0,shareEl: false,}" @close="hidePhotoSwipe"></v-photoswipe>

    </div>
</template>

<script>
import {db} from '../../firebase'
import Modal from '../../components/modal.vue'
import { PhotoSwipe } from 'v-photoswipe'
import RecordAudio from './recordAudio.vue'



export default {
    props:['id'],
    components:{
        Modal,
        RecordAudio,
        'v-photoswipe': PhotoSwipe,
    },
    mounted(){
        // Hacer que el textarea se adapte al texto
            // Dealing with Textarea Height
            function calcHeight(value) {
                let numberOfLineBreaks = (value.match(/\n/g) || []).length;
                // min-height + lines x line-height + padding + border
                let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
                return newHeight;
            }

            let textarea = document.querySelector(".resize-ta");
                textarea.addEventListener("keyup", () => {
                
                textarea.style.height = calcHeight(textarea.value) + "px";
                if(Number(textarea.style.height.substring(0, textarea.style.height.length - 2)) > 150){
                    textarea.style.overflowY = 'scroll'
                }else{
                    textarea.style.overflowY = 'hidden'
                }
            });  
    },
    created(){
        // Get proyects
        db.collection('proyects').doc(this.id).collection('messages').orderBy('date')
        .onSnapshot((querySnapshot) => {
            var messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            this.messages = messages
            setTimeout(()=>{
                const el = document.getElementById('messages')
                el.scroll(0, el.scrollHeight)

            }, 60)
        });  


    },
    data(){
        return {
            message: '',
            audio: null,
            sending: false,
            image: null,
            messages: [],
            isOpen: false,
            viewImage: [],
            options: {
                index: 0,
                shareEl: false,
            },
        }
    },
    computed:{
        previewAudio(){
            return URL.createObjectURL(this.audio)
        },
        previewImage(){
            return URL.createObjectURL(this.image)
        }
    },
    methods:{
        async sendMessage(){
            if(this.message.length){
                this.$store.dispatch('message/send', {type: 'message', content: this.message, proyectId: this.id})
                this.message = ''
            }
            if(this.audio != null){
                if(!this.sending){
                    this.sending = true
                    const link = await this.$store.dispatch('uploadAudioAndGetUrl', {
                        route: `proyects/chat/${this.id}/${Date.now()}-${Math.floor(Math.random() * 1000)}.wav`,
                        audio: this.audio
                    })
                    this.$store.dispatch('message/send', {type: 'audio', content: link, proyectId: this.id})

                    this.sending = false
                    this.audio = null
                }
            }
            if(this.image != null){
                if(!this.sending){
                    this.sending = true
                    const link = await this.$store.dispatch('uploadImageAndGetUrl', {
                        route: `proyects/chat/${this.id}/${Date.now()}-${Math.floor(Math.random() * 1000)}.wav`,
                        img: this.image,
                        size: 1080,
                        id: 'upload'
                    })
                    this.$store.dispatch('message/send', {type: 'image', content: link, proyectId: this.id})

                    this.sending = false
                    this.image = null
                }
            }

        },
        recordAudio(data){
            this.message = ''
            this.audio = data.blob
        },
        loadImage(data){
            this.message = ''
            this.image = data.target.files[0]
        },
        isAuthor(m){
            if(this.$store.state.auth.user){
                return this.$store.state.auth.user.uid == m.userId
            }else{
                return false
            }
        },
        deleteMessage(id){
            this.$store.dispatch('message/delete', {proyectId: this.id, id})
        },

        showPhotoSwipe(img){
            this.isOpen = true
            this.viewImage = [{
                w: 1920,
                h: 1920,
                src: img
            }]
        },
        hidePhotoSwipe () {
            this.isOpen = false
        },
    }
}
</script>

<style scoped>
.textarea {
    display: block;
    width: 100%;
    overflow-y: hidden;
    resize: both;
    min-height: 40px;
    max-height: 150px;
    line-height: 20px;
    resize: none;
}

.message {
    border: 2px solid #D9D9D9;
    max-width: 75% !important;
    margin-bottom: 10px;
}

.message-send {
    margin-left: auto;
    border: 0px;
}
.messages {
    height: 500px;
    overflow-y: scroll;
}
.preview-image{
    max-width: 200px;
    max-height: 200px;
}

.image {
    max-width: 320px;
    max-height: 200px;
}
</style>

