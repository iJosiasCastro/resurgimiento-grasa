<template>
    <VueRecord class="record" :isAlreadyInitiated="true" @result="$emit('result', $event)">
        <i class="fa h3 text-success fa-microphone"></i>


        <template slot="isRecording">
            <i class="fa h3 text-danger fa-microphone"></i>
        </template>
    </VueRecord>
</template>

<script>
import VueRecord from "@loquiry/vue-record-audio";


export default {
    components:{
        VueRecord,
    },
}
</script>

<style>
.record{
    outline: hidden !important;
    background-color: #f5f5f5 !important;
    border: hidden;
}
.record:focus {
    outline: none;
}
</style>