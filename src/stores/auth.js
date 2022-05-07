import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: sessionStorage.getItem("jwt") ? sessionStorage.getItem("jwt") : null,
    user: sessionStorage.getItem("user")
      ? sessionStorage.getItem("user")
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
          .post("https://polar-citadel-83159.herokuapp.com/api/auth/local", {
            identifier: email._value,
            password: password._value,
          })
          .then((response) => {
            this.jwt = response.data.jwt;
            this.user = response.data.user;
            sessionStorage.setItem("user", response.data.user);
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
          .post(
            "https://polar-citadel-83159.herokuapp.com/api/auth/local/register",
            {
              username: email._value,
              email: email._value,
              password: password._value,
            }
          )
          .then((response) => {
            this.jwt = response.data.jwt;
            this.user = response.data.user;
            sessionStorage.setItem("user", response.data.user);
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
