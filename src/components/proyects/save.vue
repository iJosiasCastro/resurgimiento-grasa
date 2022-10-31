<template>
    <div class="bg-light border p-3">
        <div class="messages pb-2 border-bottom">
            <div v-if="messages.length == 0">
                <span class="text-muted">
                    Aun no hay mensajes
                </span>
            </div>
            <div v-for="(m, i) in messages" :key="i"
                class="message p-2 rounded"
                :class="isAuthor(m) ? 'bg-success message-send text-light' : 'bg-white message' ">

                <h6 class="h6 text-success" v-show="!isAuthor(m)">{{m.userName}}</h6>
                <p class="mb-1">{{m.content}}</p>
            </div>

        </div>
        <div class="mt-2">

            <div v-show="$store.state.auth.user==null" class="text-center w-100">
                Para chatear primero tenés que <b><RouterLink to="/ingresar">Ingresar</RouterLink></b>
            </div>

            <div v-show="$store.state.auth.user!=null">
                <div class="align-items-center d-flex flex-row">
                    <template v-if="audio==null">
                        <textarea v-model="message" class="textarea resize-ta bg-white card form-input pr-5 w-100" id="formInput27" placeholder="Escribe un mensaje" rows="1"></textarea>
                        <i v-if="message.length==0" class="fa fa-image h2 mb-0 pointer" style="width: 0; position: relative; left: -42px;"></i>
                    </template>
                    <template v-else>
                        <div class="bg-white card form-input pr-5 w-100">
                            <audio id="audio1" class="w-100" controls="">
                                <source :src="previewAudio" type="audio/mpeg">
                            </audio>
                        </div>
                        <i class="fa fa-trash h3 text-danger mb-0 pointer" @click="audio = null" style="width: 0; position: relative; left: -42px;"></i>
                    </template>
                    <div>
                        <div class="align-items-center d-flex justify-content-center mb-0 ml-1 text-success user-icon">
                            <div v-if="audio==null && message.length==0" class="mt-1">
                                <template>
                                    <VueRecord class="record" :isAlreadyInitiated="true" @result="recordAudio">
                                        <i class="fa h3 text-success fa-microphone"></i>
                                        <template slot="isRecording">
                                        <i class="fa h3 text-danger fa-microphone"></i>
                                        </template>
                                    </VueRecord>
                                </template>

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
                    <VueRecordAudio @result="recordAudio" />                
                    <div v-if="audio">
                        adsa
                        
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import {db} from '../../firebase'
import Modal from '../../components/modal.vue'
import VueRecord from "@loquiry/vue-record-audio";

export default {
    props:['id'],
    components:{
        Modal,
        VueRecord
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
        db.collection('proyects').doc(this.id).collection('messages').orderBy('date')
        .onSnapshot((querySnapshot) => {
            var messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            this.messages = messages
        });  
    },
    data(){
        return {
            message: '',
            audio: null,
            image: null,
            messages: []
        }
    },
    computed:{
        previewAudio(){
            return URL.createObjectURL(this.audio)
        }
    },
    methods:{
        async sendMessage(){
            if(this.message.length){
                this.$store.dispatch('message/sendMessage', {type: 'message', content: this.message, id: this.id})
            }
            if(this.audio != null){
                const link = await this.$store.dispatch('uploadAudioAndGetUrl', {route: `proyects/chat/${this.id}/${Date.now()}-${Math.floor(Math.random() * 1000)}.wav`})
                console.log(link)
                this.$store.dispatch('message/sendMessage', {type: 'audio', content: this.audio, id: this.id})
            }
            if(this.image != null){
                this.$store.dispatch('message/sendMessage', {type: 'message', content: this.message, id: this.id})
            }

        },
        recordAudio(data){
            this.message = ''
            this.audio = data.blob
        },
        isAuthor(m){
            if(this.$store.state.auth.user){
                return this.$store.state.auth.user.uid == m.userId
            }else{
                return false
            }
        }
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
    height: 300px;
    overflow-y: scroll;
}

</style>

<style>
.record{
    outline: hidden !important;
    background-color: white;
    border: hidden;
}
.record:focus {
    outline: none;
}
</style>