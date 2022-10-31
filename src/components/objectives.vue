<template>
    <div class="text-center">
        <h2 class="font-weight-normal h4 pb-3">¿Cuales son nuestros objetivos?</h2>
        <LottiePlayer class="mt-n5 mx-auto w-100"
            style="width: 100%; height:350px"
            :options="{ animationData: require('@/assets/lotties/online.json') }"
        />
        <div class="row">
            <div class="align-items-center col-12 col-sm-4 d-flex flex-column">
                <div class="green-1 mb-3 number rounded-circle d-flex justify-content-center align-items-center">
                    <span class="h1 text-light mb-1">1</span>
                </div>
                <p>Tomar iniciativas que ayuden y aporten a la <b>cultura </b>de los estudiantes</p>
            </div>  
            <div class="align-items-center col-12 col-sm-4 d-flex flex-column">
                <div class="green-2 mb-3 number rounded-circle d-flex justify-content-center align-items-center">
                    <span class="h1 text-light mb-1">2</span>
                </div>
                <p>Tener una fuerte <b>comunicación </b>con los alumnos y los equipos escolares</p>
            </div>
            <div class="align-items-center col-12 col-sm-4 d-flex flex-column">
                <div class="green-2 mb-3 number rounded-circle d-flex justify-content-center align-items-center">
                    <span class="h1 text-light mb-1">3</span>
                </div>
                <p>Trabajar para mejorar el <b>mantenimiento </b>de la escuela</p>
            </div>
        </div>
    </div>
</template>

<script>
import LottiePlayer from 'vue-lottie/src/lottie.vue'

export default {
    components:{
        LottiePlayer,
    }
}

</script>


<style scoped>
.number {
    width: 50px;
    height: 50px;
}

.green-1 {
    background-color: #229F70;
}

.green-2 {
    background-color: #1D825C;
}

.green-3 {
    background-color: #18694A;
}
</style>