x<script>
import { mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
export default {
  name: 'RegisterPage',
  data() {
    return {
      formRegister: {
        firstName: '',
        lastName: '', 
        email: '', 
        password: '', 
        phoneNumber: '', 
        address: ''
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['registerUser']),
    toLogin() {
      this.$router.push('/login')
    },
    registerForUser() {
      console.log(this.formRegister);
      this.registerUser(this.formRegister)
    }
  },
}
</script>

<template>
  <form class="container" @submit.prevent="registerForUser">
    <div class="d-flex justify-content-center" id="login-form">
      <div class="form shadow rounded">
        <div class="rounded w-75 p-4" style="background-color: rgb(185, 250, 245)">
          <h1 class="font">
            Register<br />
            Das Autos
          </h1>
          <div class="input-form border-top">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com" v-model="formRegister.firstName"
              />
              <!-- <p>{{ formRegister.firsName }}</p> -->
              <label for="FirstName">FirstName</label>
            </div>
            <div class="form-floating">
              <input
                type=" text"
                class="form-control mt-1"
                id="floatingInput"
                placeholder="name@example.com" v-model="formRegister.lastName"
              />
              <label for="FirstName">LastName</label>
            </div>
            <div class="form-floating">
              <input
                type="email"
                class="form-control mt-1"
                id="floatingInput"
                placeholder="name@example.com" v-model="formRegister.email"
              />
              <label for="email">Email address</label>
            </div>
            <div class="form-floating mt-1">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"  v-model="formRegister.password"
              />
              <label for="password">Password</label>
            </div>
            <div class="form-floating mt-1">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password" v-model="formRegister.phoneNumber"
              />
              <label for="Phone Number">Phone Number</label>
            </div>
            <div class="form-floating mt-1">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password" v-model="formRegister.address"
              />
              <label for="password">Address</label>
            </div>
            <button type="submit" class="button mt-3">Sign Up</button>
            <button @click.prevent="toLogin" class="button">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>

</style>