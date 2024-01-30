<script>
import { mapActions } from 'pinia';
import { useUserStore } from '../stores/user';
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loginByGoogle: '',
      callback: (response) => {
        console.log("logged in", response);
        this.handleLoginGoogle(response.credential)
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['loginUser', 'handleLoginGoogle']),
    HandleloginUser() {
      this.loginUser(this.form)
    }
  }
}
</script>

<template>
  <form action="" class="container" @submit.prevent="HandleloginUser">
    <div class="d-flex justify-content-center" id="login-form">
      <div class="form shadow rounded">
        <div class="rounded w-75 p-4" style="background-color: rgb(185, 250, 245)">
          <h1 class="font">
            Login<br />
            Das Autos
          </h1>
          <div class="input-form border-top">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                v-model="form.email"
              />
              <label for="email">Email address</label>
            </div>
            <div class="form-floating mt-4">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="form.password"
              />
              <label for="password">Password</label>
            </div>
            <button type="submit" class="button mt-3">Login</button>
            <h5 class="mb-1 mt-2 opacity-50 text-center">or</h5>
        <div class="d-flex flex-column ">
          <h5 class=" opacity-50 align-self-center">login with:</h5>
            <GoogleLogin :callback="callback" class="align-self-center"/>
        </div>
        <div class="d-flex flex-column align-items-center mt-3">
          <p>doesn't have account?</p>
          <router-link to="/register">Register here</router-link>
          </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style>

.button{
  background-color: white;
  border-radius: 17px; 
  width: 100%;
  height: 42px;
  color: black; 
  border: 2px solid RGB(165, 227, 224);
}
.button:hover {
  background-color: rgb(0, 171, 218);
  color: white;
}

.form {
  padding-top: 2%;
  padding-bottom: 3%;
  background-color: RGB(165, 227, 224);
  display: flex;
  justify-content: center;
  margin-top: 8%;
  width: 45%;
  border-bottom: 1px;
}

.input-form {
  margin-top: 11%;
}

.font {
  font-family: 'Montserrat', sans-serif;
  color: rgb(86, 90, 91);
}

@media screen and (max-width: 980px) {
  .form {
    margin-top: 16%;
    font-size-adjust: smaller;
    padding-top: 2%;
    padding-bottom: 3%;
    display: flex;
    justify-content: center;
    width: 70%;
  }
}
@media screen and (max-width: 580px) {
  .form {
    margin-top: 20%;
    font-size: smaller;
    padding-top: 2%;
    padding-bottom: 3%;
    display: flex;
    justify-content: center;
    width: 80%;
  }
}
</style>
