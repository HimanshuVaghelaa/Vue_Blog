<template>
  <div class="blog-card">
    <div class="icons" v-show="editPost">
      <div class="icon" @click="editBlog">
        <Edit class="edit"></Edit>
      </div>
      <div class="icon" @click="deletePost">
        <Delete class="delete"></Delete>
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>
        Posted on:
        {{
          new Date(post.blogDate).toLocaleString("en-us", { dateStyle: "long" })
        }}
      </h6>
      <router-link
        class="link"
        :to="{ name: 'ViewBlog', params: { blogid: post.blogID } }"
      >
        View The Post <Arrow class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from "../assets/Icons/arrow-right-light.svg";
import Edit from "../assets/Icons/edit-regular.svg";
import Delete from "../assets/Icons/trash-regular.svg";

export default {
  name: "BlogCard",
  props: ["post"],
  components: {
    Arrow,
    Edit,
    Delete,
  },
  methods: {
    deletePost() {
      this.$store.dispatch("deletePost", this.post.blogID);
    },
    editBlog() {
      this.$router.push({
        name: "EditBlog",
        params: { blogid: this.post.blogID },
      });
    },
  },
  computed: {
    editPost() {
      return this.$store.state.editPost;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/BlogCard.scss";
</style>
