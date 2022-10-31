<template>
<Portal to="modal" v-if="open">

    <div class="modal show d-block" @click="hover ?  '' : close()">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" @mouseover="hover=true" @mouseleave="hover=false">
            <div class="modal-header border-0">
                <button type="button" @click="close" class="close">
                    <span>&times;</span>
                </button>
            </div>
            <slot>

            </slot>
            </div>
        </div>
    </div>

    <div class="modal-backdrop" style="opacity: 0.5;" @click="close"></div>

</Portal>
</template>

<script>
export default {
    props:['name'],
    data(){
        return{
            hover: false
        }
    },
    computed:{
        open(){
            if(this.$route.hash){
                return JSON.parse(decodeURI(this.$route.hash).substring(1)).modal == this.name
            }
            return undefined
        }
    },
    methods:{
        close(){
            this.$router.back()
        }
    },
}
</script>
