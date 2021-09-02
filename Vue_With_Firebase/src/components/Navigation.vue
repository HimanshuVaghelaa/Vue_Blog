<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          >Vue_Blog</router-link
        >
      </div>
      <div class="nav-links" v-show="!mobile">
        <ul>
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
          <router-link class="link" :to="{ name: 'CreatePost' }" v-if="user"
            >Create Post</router-link
          >
          <router-link class="link" :to="{ name: 'Login' }" v-if="!user"
            >Login/Register</router-link
          >
        </ul>
        <div
          class="profile"
          ref="profile"
          @click="toggleProfileMenu"
          v-if="user"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div class="profile-menu" v-show="profileMenu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUsername }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <!-- <div class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div> -->
              <div class="option">
                <div class="option-sign-out" @click="signOut">
                  <signOutIcon class="icon" />
                  <p>Sign Out</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon
      class="menu-icon"
      @click="toggleMobileNav"
      v-show="mobile && !mobileNav"
    />
    <menuCloseIcon
      class="menu-icon menu-icon-close"
      @click="toggleMobileNav"
      v-show="mobile && mobileNav"
    />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
        <router-link class="link" :to="{ name: 'CreatePost' }" v-if="user"
          >Create Post</router-link
        >
        <router-link class="link" :to="{ name: 'Login' }" v-if="!user"
          >Login/Register</router-link
        >
        <router-link class="link" :to="{ name: 'Profile' }" v-if="user">
          <p>Profile</p>
        </router-link>
        <div class="link" @click="signOut" v-if="user">
          <p>Sign Out</p>
        </div>
      </ul>
    </transition>
  </header>
</template>
<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import menuCloseIcon from "../assets/Icons/cross-icon.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
// import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Navigation",
  components: {
    menuIcon,
    menuCloseIcon,
    userIcon,
    // adminIcon,
    signOutIcon,
  },
  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;

      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/Navigation.scss";

.option-sign-out {
  display: flex;
  cursor: pointer;
}

.menu-icon-close {
  top: 34px !important;
  right: 27px !important;
}
</style>
