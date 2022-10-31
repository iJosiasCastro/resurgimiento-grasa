import Vue from 'vue'
import router from '../router'
import {db, storage} from '../firebase'

export default {
    namespaced: true,
    actions:{
        submit(context, form){
            try{
                const id = db.collection('proyects').doc().id
                db.collection('proyects').doc(id).set({
                    ...form,
                    id,
                    date: Date.now(),
                    lastModification: Date.now()
                })
                router.push('/dashboard')
            }catch(error){
                console.error(error)
                Vue.$toast.error('Hubo un problema al subir el proyecto, vuelva a intetalo de nuevo')
            }
        },
        update(context, form){
            try{
                db.collection('proyects').doc(form.id).update({
                    ...form,
                    lastModification: Date.now()
                })
                router.push('/dashboard')
            }catch(error){
                console.error(error)
                Vue.$toast.error('Hubo un problema al actualizar el proyecto, vuelva a intetalo de nuevo')
            }
        },
        async delete({rootState}, id){
            if(window.confirm('¿Realmente querés eliminar el proyecto?')){
                try{
                    if(rootState.auth.user.uid.length){
                        const proyectRef = await db.collection('proyects').doc(id).get()
                        proyectRef.data().images.forEach( async (image) => {
                            const imageRef = await storage.refFromURL(image)
                            imageRef.delete()
                        })
                        await db.collection('proyects').doc(id).delete()
                        Vue.$toast.success('El proyecto fue eliminado')
                        router.push('/dashboard')
                    }
                }catch(error){
                    console.error(error)
                    Vue.$toast.error('Hubo un problema, vuelva a intentar de nuevo.')
                }
            }
        },
        async getById(context, id){
            const proyect = await db.collection('proyects').doc(id).get()
            if(proyect.data()==undefined){
                router.push('/')
            }else{
                return proyect.data()
            }
        },
        async get(context, limit){
            var query = db.collection('proyects').orderBy('lastModification', 'desc')
            if(limit){
                query = query.limit(limit)
            }
            const ref = await query.get()
            var proyects = []
            ref.forEach(e => {
                proyects.push(e.data())
            })
            return proyects
        },
        
    },
}