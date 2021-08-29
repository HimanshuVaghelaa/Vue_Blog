<template>
  <div class="form-wrap">
    <Loading v-if="isLoading" />
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </p>
      <h2>Login to Vue_Blog</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link
      >
      <button @click.prevent="signIn">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  components: {
    Loading,
    email,
    password,
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("setLoading", true);
      this.errorMsg = "";

      if (this.email !== "" && this.password !== "") {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$store.dispatch("setLoading", false);
            this.$router.push({ name: "Home" });
            this.error = false;
            this.errorMsg = "";
          })
          .catch((error) => {
            this.$store.dispatch("setLoading", false);
            this.error = true;
            this.errorMsg = error.message;
          });
      } else {
        this.$store.dispatch("setLoading", false);
        this.error = true;
        this.errorMsg = "Please, Fill Out All The Fields !";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/Login.scss";
</style>
