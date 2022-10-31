import Vue from "vue"
import { fb, auth, db } from "../firebase"
import router from "../router"

export default {
    namespaced: true,
    state: {
        user: null,
        admin: false
    },
    mutations: {
        setUser(state, user){
            state.user = user
        },
        isAdmin(state){
            state.admin = true
        }
    },
    actions: {
        checkAuth({commit}){
            auth.onAuthStateChanged(async (auth)=>{
                commit('setUser', auth)
                if(auth){
                    const role = await db.collection('users').doc(auth.uid).get()
                    if(role.exists){
                        commit('isAdmin')
                    }
                }
            })
        },
        async loginWithGoogle(){
            try{
                const provider = new fb.auth.GoogleAuthProvider()
                await auth.signInWithPopup(provider)
                router.push('/dashboard')
            }catch(error){
                Vue.$toast.error(error)
            }
        },
        logout(){
            auth.signOut()
            router.push('/')
        },
        async loginWithEmail(context, {email, password}){
            try{
                await auth.signInWithEmailAndPassword(email, password)
                router.push('/dashboard')
            }catch(error){
                Vue.$toast.error(error)
            }

        },
        async updateUsername({rootState}, userName){
            try{
                await auth.currentUser.updateProfile({displayName: userName})
                db.runTransaction(async transaction => {
                    const query = await db.collectionGroup('messages').where('userId', '==', rootState.auth.user.uid).get()
                    query.forEach(doc => {
                        transaction.update(doc.ref, { userName })
                    })
                })
                Vue.$toast.success('Tu nombre de usuario fue cambiado correctamente')
            }catch(error){
                Vue.$toast.error(error)
            }
        },
    },
}