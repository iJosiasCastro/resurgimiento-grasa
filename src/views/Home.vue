<template>
  <div>
    <Header class="">
      <div class="width-600">
        <div class="spacer"></div>
        <div class="row m-0">
            <div class="col-4 "> 
              <div class="text-center">
                <LottiePlayer class="d-none d-sm-block mt-n5 mx-auto w-100"
                  style="width: 80%; height:200px"
                  :options="{ animationData: require('@/assets/lotties/books.json') }"
                />
              </div>
            </div>
            <div class="col-12 col-sm-8">
                <div class="m-2 text-center text-sm-left">
                    <h2 class="h4 pb-3 text-white">Trabajamos por una escuela mas unida y alumnos comprometidos</h2>
                    <RouterLink to="/proyecto/gbDz78gOEct5eTkrNzUR">
                      <button class="btn btn-success">Ver proyectos</button>
                    </RouterLink>
                </div>             
            </div>
        </div>
        <div class="spacer"></div>
      </div>
    </Header>
    <div class="container width-800">
      <div class="spacer"></div>
      <div class="lead text-center width-400">
        <p>Somos el centro de estudiantes de la <b>Escuela Secundaria Técnica N°2 Luciano Fortabat (ex industrial)</b> de Olavarría.</p>
        <p>Trabajamos juntos para conseguir la escuela que todos queremos. Estamos abiertos a toda sugerencia y aporte para seguir mejorando 💪.</p>
      </div>

      <div class="spacer-sm"></div>
      <div class="width-600">
        <div class="text-center video-responsive"> 

          <iframe
            src="https://www.youtube.com/embed/zs71ds4N6Mw"
            frameborder="0"
            >
          </iframe>
          <!-- Video -->


        </div>
      </div>

      <div class="spacer-lg"></div>
      <h2 class="font-weight-normal h4 pb-3">Nuestros últimos proyectos:</h2>
      <Grid :limit="6" />
      <div>
        <div class="spacer-sm"></div>
        <div class="text-center">
          <button type="button" class="btn btn-success">Ver todos los proyectos</button>
        </div>
      </div>


      <div class="spacer-lg"></div>
      
    </div>
    <Team />

    <div class="width-800 container">
      <div class="spacer-lg">
      </div>
      <Objectives />
    </div>

      <div class="spacer-lg"></div>
      <Contact />
      <div class="spacer"></div>



      
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Team from '../components/team.vue'
import Objectives from '../components/objectives.vue'
import Grid from '../components/proyects/grid.vue'
import LottiePlayer from 'vue-lottie/src/lottie.vue'
import Contact from '../components/contact'


export default {
  components:{
    Header,
    LottiePlayer,
    Team,
    Objectives,
    Grid,
    Contact
  }
}
</script>

<style scoped>
.video-responsive {
	height: 0;
	overflow: hidden;
	padding-bottom: 56.25%;
	padding-top: 30px;
	position: relative;
	}
.video-responsive iframe, .video-responsive object, .video-responsive embed {
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	}
</style>