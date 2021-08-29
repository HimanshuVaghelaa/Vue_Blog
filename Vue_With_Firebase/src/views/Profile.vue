<template>
  <div class="profile">
    <Loading v-if="isLoading" />
    <Modal
      v-if="modalActive"
      :modalMessage="modalMessage"
      v-on:close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.profileInitials }}</div>
        <!-- <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div> -->
        <div class="input">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../components/Loading";
import Modal from "../components/Modal";
// import adminIcon from "../assets/Icons/user-crown-light.svg";

export default {
  name: "Profile",
  components: {
    Loading,
    Modal,
    // adminIcon,
  },
  data() {
    return {
      modalMessage: "Changes were saved!",
      modalActive: null,
    };
  },
  methods: {
    async updateProfile() {
      this.$store.dispatch("setLoading", true);
      await this.$store.dispatch("updateUserSettings");
      this.$store.dispatch("setLoading", false);
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    firstName: {
      get() {
        return this.$store.state.profileFirstName;
      },
      set(payload) {
        this.$store.commit("changeFirstName", payload);
      },
    },
    lastName: {
      get() {
        return this.$store.state.profileLastName;
      },
      set(payload) {
        this.$store.commit("changeLastName", payload);
      },
    },
    username: {
      get() {
        return this.$store.state.profileUserName;
      },
      set(payload) {
        this.$store.commit("changeUserName", payload);
      },
    },
    email() {
      return this.$store.state.profileEmail;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/Profile.scss";
</style>
