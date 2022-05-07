import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
const app = createApp(App);

app.use(createPinia());
app.use(router);

axios.defaults.baseURL = "https://polar-citadel-83159.herokuapp.com/api";
axios.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

app.mount("#app");
