<template>
    <div class="align-self-start col-12 col-md-8">
        <div id="carrousel" class="pointer carousel slide" data-interval="false" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item" :class="{'active' : i == 0}" v-for="(img, i) in imgs" :key="i">
                    <div @click="showPhotoSwipe(i)" :style="{'background-image': `url(${img})`}">
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carrousel" role="button" data-slide="prev"> <span class="carousel-control-prev-icon"></span> <span class="sr-only">Anterior</span> </a>
            <a class="carousel-control-next" href="#carrousel" role="button" data-slide="next"> <span class="carousel-control-next-icon"></span> <span class="sr-only">Siguiente</span> </a>
        </div>
        
        <v-photoswipe class="viewer" :isOpen="isOpen" :items="items" :options="options" @close="hidePhotoSwipe"></v-photoswipe>
        <div class="spacer-sm"></div>
    </div>
</template>

<script>
import { PhotoSwipe } from 'v-photoswipe'
export default {
    name: 'carrousel',
    props: ['imgs'],
    components: {
        'v-photoswipe': PhotoSwipe,
    },
    created(){
        var items = []
        this.imgs.forEach(img => {
                items.push({
                w: 1920,
                h: 1920,
                src: img,
            })
        })
        this.items = items
    },
    data() {
        return {
            isOpen: false,
            isOpenGallery: false,
            options: {
                index: 0,
                shareEl: false,
            },
            optionsGallery: {},
            items: []
        }
    },
    methods: {
        showPhotoSwipe (index) {
            this.isOpen = true
            this.$set(this.options, 'index', index)
        },
        hidePhotoSwipe () {
            this.isOpen = false
        }
    },
}  
</script>

<style>
.pswp img {
    max-width: none;
    object-fit: contain;
}

.carousel-item div {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    padding: 70.37% 0 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.viewer {
    z-index: 30000;
    position: fixed;
}
</style>
