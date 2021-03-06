import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : null,
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.jwt,
  },
  actions: {
    signIn(payload) {
      const { email, password } = payload;
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/local", {
            identifier: email,
            password: password,
          })
          .then((response) => {
            this.jwt = response.data.jwt;
            this.user = response.data.user;
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            sessionStorage.setItem("jwt", response.data.jwt);
            resolve(response.data);
          })
          .catch((error) => {
            reject("An error occurred:", error.response);
          });
      });
    },

    signUp(payload) {
      const { email, password } = payload;
      return new Promise((resolve, reject) => {
        axios
          .post("/auth/local/register", {
            username: email,
            email: email,
            password: password,
          })
          .then((response) => {
            this.jwt = response.data.jwt;
            this.user = response.data.user;
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            sessionStorage.setItem("jwt", response.data.jwt);
            resolve(response.data);
          })
          .catch((error) => {
            reject("An error occurred:", error.response);
          });
      });
    },
    signOut() {
      this.jwt = null;
      this.user = null;
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("jwt");
    },
  },
});
