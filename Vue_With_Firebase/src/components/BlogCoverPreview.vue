<template>
  <div class="modal" ref="modal">
    <div class="modal-content">
      <close @click="closePreview" class="icon" />
      <img :src="this.blogCoverPhoto" alt="" />
    </div>
  </div>
</template>

<script>
import close from "../assets/Icons/times-circle-light.svg";
export default {
  components: {
    close,
  },
  methods: {
    closePreview() {
      this.$store.commit("openPhotoPreview");
    },
  },
  computed: {
    blogCoverPhoto() {
      return this.$store.state.blogPhotoFileURL;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/BlogCoverPreview.scss";
</style>
