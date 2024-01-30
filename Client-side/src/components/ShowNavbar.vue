<script>
import { mapActions, mapState } from 'pinia';
import { useUserStore } from '../stores/user';
export default {
  name: "ShowNavbar",
  computed: {
    ...mapState(useUserStore, ['logged', 'currentUsername'])
  },
  methods: {
    ...mapActions(useUserStore, ['logOutUser']),
    toNavigate(path) {
      this.$router.push(path)
    },
    HandleLogOut() {
      this.logOutUser()
    }
  }
}
</script>


<template>
  <nav class="navbar fixed-top navbar-expand-lg bg-body-color">
    <!-- <p>{{ logged }}</p> -->
    <div class="container-fluid">
      <a class="navbar-brand" style="font-family: concav;" href="#">Das Autos</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" @click.prevent="toNavigate('/')">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Locate</a>
          </li>
          <li class="nav-item" v-if="!logged">
            <a class="nav-link" @click.prevent="toNavigate('/login')">Login</a>
          </li>
          <li class="nav-item dropdown" v-if="logged">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            > 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              {{ currentUsername }}
            </a>
            <ul class="dropdown-menu dropdown-menu-color">
              <li><a class="dropdown-item" href="#">Myprofile</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Chats</a></li>
              <li><a class="dropdown-item" @click.prevent="HandleLogOut">Log Out</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2 form-outline" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  
</template>

<style>


.nav-item::after {
  content: '';
  display: block;
  width: 0px;
  height: 2px;
  background: #656565;
  transition: 0.2s
}

.nav-item:hover::after {
  width: 100%
}

.navbar-dark .navbar-nav .active>.nav-link,
.navbar-dark .navbar-nav .nav-link.active,
.navbar-dark .navbar-nav .nav-link.show,
.navbar-dark .navbar-nav .show>.nav-link,
.navbar-dark .navbar-nav .nav-link:focus,
.navbar-dark .navbar-nav .nav-link:hover {
  color: #f2eeee
}

.nav-link {
  transition: 0.2s
}
.dropdown-menu-color {
  --bs-dropdown-color: #dee2e6;
  --bs-dropdown-bg: #6a99ae;
  --bs-dropdown-border-color: var(--bs-border-color-translucent);
  --bs-dropdown-box-shadow: ;
  --bs-dropdown-link-color: #dee2e6;
  --bs-dropdown-link-hover-color: #fff;
  --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
  --bs-dropdown-link-hover-bg: rgba(7, 187, 219, 0.287);
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #0d6efd;
  --bs-dropdown-link-disabled-color: #adb5bd;
  --bs-dropdown-header-color: #adb5bd;
}

.bg-body-color {
  --bs-bg-opacity: 0;
  background-color: rgba(11, 202, 235, 0.232);
}
.btn-outline {
  --bs-btn-color: #1373d4;
  --bs-btn-border-color: #154784;
  --bs-btn-hover-color: #f9f9f9;
  --bs-btn-hover-bg: #2e87e0;
  --bs-btn-hover-border-color: #287ed4;
  --bs-btn-focus-shadow-rgb: 33, 37, 41;
  --bs-btn-active-color: #e33333;
  --bs-btn-active-bg: #3d91e6;
  --bs-btn-active-border-color: #4693df;
  --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #509ae4;
  --bs-btn-disabled-bg: transparent;
  --bs-btn-disabled-border-color: #5d9ad6;
  --bs-gradient: none;
}
</style>