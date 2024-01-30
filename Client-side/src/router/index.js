import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Layout from '../components/ShowLayout.vue'
import Login from '../components/ShowLogin.vue'
import Register from '../components/ShowRegister.vue'
import Otp from '../components/ShowOTP.vue'
import OtpCode from '../components/showVerifiedCodeForm.vue'
import vehicleDetail from '../components/showVehicleDetail.vue'
import addFormVehicle from '../components/addFormVehicle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '',
          name: 'homeView',
          component: HomeView
        },
        {
          path: '/vehicle/:id',
          name: 'vehicleDetail',
          component: vehicleDetail
        },
        {
          path: '/vehicle/add',
          name: 'vehicleAddForm',
          component: addFormVehicle
        },
        {
          path: 'login',
          name: "LoginPage",
          component: Login
        },
        {
          path: 'register',
          name: "RegisterPage",
          component: Register
        },
        {
          path: 'otp',
          name: "Otp",
          component: Otp
        },
        {
          path: 'verify',
          name: "OtpCode",
          component: OtpCode
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) =>{
  const isAuthenticated = localStorage.getItem("access_token")

  if (!isAuthenticated && to.name === "vehicleAddForm") {
    next("/login")
  } else {
    next()
  }

})



export default router
