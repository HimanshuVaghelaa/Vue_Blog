<template>
  <div class="app-wrapper">
    <div class="app">
      <Loading v-if="isLoading" />
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "app",
  components: {
    Loading,
    Navigation,
    Footer,
  },
  data() {
    return {
      navigation: false,
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
      }
    });
    this.checkRoute();
    await this.$store.dispatch("getPost");

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  mounted() {},
  methods: {
    checkRoute() {
      if (
        this.$route.name === "Login" ||
        this.$route.name === "Register" ||
        this.$route.name === "ForgotPassword"
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import "./assets/styles/App.scss";
</style>
