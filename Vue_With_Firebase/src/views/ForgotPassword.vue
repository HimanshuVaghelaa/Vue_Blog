<template>
  <div class="reset-password">
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <Loading v-if="isLoading" />
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link class="router-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </p>
        <h2>Reset Password</h2>
        <p>Forgot your passowrd? Enter your email to reset it</p>
        <div class="inputs">
          <div class="input">
            <input type="text" placeholder="Email" v-model="email" />
            <email class="icon" />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      modalActive: false,
      modalMessage: "",
    };
  },
  components: {
    email,
    Modal,
    Loading,
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    resetPassword() {
      this.$store.dispatch("setLoading", true);

      if (this.email !== "") {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.$store.dispatch("setLoading", false);
            this.modalMessage = "Please Check Your Inbox to Reset Password !";
            this.modalActive = true;
          })
          .catch((error) => {
            this.$store.dispatch("setLoading", false);
            this.modalMessage = error.message;
            this.modalActive = true;
          });
      } else {
        this.$store.dispatch("setLoading", false);
        this.modalMessage = "Please, Fill Out The Field !";
        this.modalActive = true;
      }
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/Login.scss";

.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>
