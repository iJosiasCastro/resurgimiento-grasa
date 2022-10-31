import imageCompression from 'browser-image-compression'
import {storage, db} from '../firebase'

export default {
    state:{
        cancelUploadId: '',
        uploading: false,
    },
    mutations:{
        SET_CANCEL_UPLOAD(state, id){
            state.cancelUploadId = id
        },
        SET_UPLOADING_STATUS(state, value){
            state.uploading = value
        },
    },
    actions: {
        uid(){
            return db.collection('uid').doc().id
        },
        openModal(context, name){
            if(window.location.hash){
                const hash = window.location.hash
                const res = {...{modal: name}, ...JSON.parse(decodeURI(hash.substring(1)))}
                window.location.hash = JSON.stringify(res)
            }else{
                window.location.hash = JSON.stringify({modal: name})
            }
        },
        async uploadImageAndGetUrl({state, commit}, {route, img, size, id}){
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: size,
                useWebWorker: true
            }
            const imgCompress = await imageCompression(img, options)
            
            const ref = storage.ref(route)
            const upload = ref.put(imgCompress)
            
            return new Promise((resolve) => {
                upload.on('state_changed', ()=>{
                    commit('SET_UPLOADING_STATUS', true)
                    if(state.cancelUploadId == id){
                        upload.cancel()
                        commit('SET_CANCEL_UPLOAD', null)
                    }
                },()=>{},async ()=>{
                    commit('SET_UPLOADING_STATUS', false)
                    resolve(ref.getDownloadURL())
                })
            })
        },
        async uploadAudioAndGetUrl(context, {route, audio}){
            const ref = storage.ref(route)
            const upload = ref.put(audio)
            
            return new Promise((resolve) => {
                upload.on('state_changed',
                ()=>{},
                ()=>{},
                async ()=>{
                    resolve(ref.getDownloadURL())
                })
            })
        },
        deleteFileFromUrl(context, url){
            const ref = storage.refFromURL(url)
            ref.delete()
        },
    },
    getters:{
        stringSearcher: () => (string, query) => {
            query = query.trim().toLowerCase().split(' ')
            var result = false
            for(var index in query){
                if(string.toLowerCase().includes(query[index])){
                    result = true                    
                }
            }
            return result
        },
    }
}
