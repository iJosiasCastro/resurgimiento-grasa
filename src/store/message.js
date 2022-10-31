import {db, storage} from '../firebase'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
    },
    actions: {
        send({rootState}, {content, type, proyectId}){
            const id = db.collection('proyects').doc(proyectId).collection('messages').doc().id
            db.collection('proyects').doc(proyectId).collection('messages').doc(id).set({
                date: Date.now(),
                userId: rootState.auth.user.uid,
                userName: rootState.auth.user.displayName,
                id,
                type,
                content
            })
        },
        async delete({rootState}, {proyectId, id}){
            if(window.confirm('¿Realmente querés eliminar el mensaje?')){
                try{
                    if(rootState.auth.admin){
                        const messageRef = await db.collection('proyects').doc(proyectId).collection('messages').doc(id).get()
                        if(messageRef.data().type=='image'){
                            const imageRef = await storage.refFromURL(messageRef.data().content)
                            imageRef.delete()
                        }
                        await await db.collection('proyects').doc(proyectId).collection('messages').doc(id).delete()
                        Vue.$toast.success('El mensaje fue eliminado')
                    }
                }catch(error){
                    console.error(error)
                    Vue.$toast.error('Hubo un problema, vuelva a intentar de nuevo.')
                }
            }
        }
    },
}
