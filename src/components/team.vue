<template>
    <div class="bg-info py-5 text-light">
        <div class="text-center width-800 container ">
            <div class="mx-auto title-team">
                <h2 class="font-weight-bold h4 mb-0">Conocé a nuestro equipo
                    <div class="d-flex justify-content-md-end justify-content-center">
                        <div class="bg-white pb-1 mt-2">
                            <span class="h5 py-1 px-4 text-body font-weight-bold text-uppercase">de gestión</span>
                        </div>
                    </div>
                </h2>
            </div>

            <div class="spacer-sm"></div>
            <p>Si bien, dentro de nuestra lista hay más de 30 estudiantes, hemos formado un equipo de gestión para organización dinámica de la lista, donde estudiantes de cada tecnicatura de 6to forman parte.</p>
            <div class="spacer"></div>
        
            <div class="row">
                <div class="col-6 col-sm-4 mb-5" v-for="member in team" :key="member.id">
                    <img :src="require(`@/assets/img/team/${member.id}.png`)" class="rounded-circle" width="120px">
                    <h5 class="mb-0 mt-2">{{member.name}}</h5>
                    <span>{{member.course}}</span>
                    <div class="d-flex justify-content-center">
                        <div class="bg-danger mt-2">
                            <h6 class="mt-0 mb-0  pt-1 py-1 px-4">{{member.role}}</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            team: require('@/assets/json/team.json')
        }
    }
}
</script>

<style scoped>
.title-team {
    max-width: 300px;
}
.shape-1{
    width: 300px;
    position: absolute;
    right: -80px;
    top: 500px;
}
</style>


