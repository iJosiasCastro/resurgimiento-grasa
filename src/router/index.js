import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // General
  {
    path: '/',
    component: ()=>import('../views/Home')
  },
  {
    path: '/proyectos',
    component: ()=>import('../views/Proyects/Archive')
  },
  {
    path: '/proyecto/:id',
    component: ()=>import('../views/Proyects/Single')
  },
  {
    path: '/contacto',
    component: ()=>import('../views/Contact')
  },

  // Admin
  {
    path: '/ingresar',
    component: ()=>import('../views/Admin/Login')
  },
  {
    path: '/perfil',
    component: ()=>import('../views/Admin/Profile'),
    meta:{
      auth: true,
    }
  },
  {
    path: '/dashboard',
    component: ()=>import('../views/Admin/Dashboard'),
    meta:{
      admin: true,
    }
  },
  {
    path: '/publicar',
    component: ()=>import('../views/Admin/Publish'),
    meta:{
      admin: true,
    }
  },
  {
    path: '/editar/:id',
    component: ()=>import('../views/Admin/Edit'),
    meta:{
      admin: true,
    }
  },

  // Catch
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition){
    if(savedPosition)
      return savedPosition

    return {x: 0, y: 0}
  },
  base: process.env.BASE_URL,
  routes
})

import {auth, db} from '../firebase'
router.beforeEach(async (to, from, next) => {
  if(to.meta.auth || to.meta.admin){
    auth.onAuthStateChanged(async user=>{
      if(user){
        if(to.meta.admin){
          const role = await db.collection('users').doc(user.uid).get()
          console.log(role)
          if(role.exists && role.data().role == 'admin'){
            next()
          }else{
            next('/')
          }
        }else{
          next()
        }
      }else{
        next('/ingresar')
      }
    })
  }else{
    next()
  }
})
export default router
