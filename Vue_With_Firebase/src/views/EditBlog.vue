<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="isLoading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            @change="fileChange"
            accept=".png, .jpg, ,jpeg"
          />
          <button
            @click="openPreview"
            class="preview"
            :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
      </div>
      <div class="blog-actions">
        <button @click="updateBlog">Save Changes</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }"
          >Preview Changes</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "CreatePost",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      routeID: null,
      currentBlog: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    BlogCoverPreview,
    Loading,
  },
  computed: {
    isLoading() {
      return this.$store.state.loading;
    },
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
  async mounted() {
    this.routeID = this.$route.params.blogid;
    this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.routeID;
    });
    this.$store.commit("setBlogState", this.currentBlog[0]);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit("openPhotoPreview");
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },

    async updateBlog() {
      const dataBase = await db.collection("blogPosts").doc(this.routeID);
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.$store.dispatch("setLoading", true);
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`
          );
          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.$store.dispatch("setLoading", false);
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();

              await dataBase.update({
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
              });
              await this.$store.dispatch("updatePost", this.routeID);
              this.$store.dispatch("setLoading", false);
              this.$router.push({
                name: "ViewBlog",
                params: { blogid: dataBase.id },
              });
            }
          );
          return;
        }
        this.$store.dispatch("setLoading", true);
        await dataBase.update({
          blogHTML: this.blogHTML,
          blogTitle: this.blogTitle,
        });
        await this.$store.dispatch("updatePost", this.routeID);
        this.$store.dispatch("setLoading", false);
        this.$router.push({
          name: "ViewBlog",
          params: { blogid: dataBase.id },
        });
        return;
      }
      this.$store.dispatch("setLoading", true);
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
      setTimeout(() => {
        this.$store.dispatch("setLoading", false);
      }, 5000);
      return;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/CreatePost.scss";
@import "../assets/styles/BlogPreview.scss";
@import "../assets/styles/EditBlog.scss";
</style>
