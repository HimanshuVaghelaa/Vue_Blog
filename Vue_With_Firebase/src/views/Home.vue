<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" v-if="!user" />
    <BlogPost
      :post="post"
      v-for="(post, index) in blogPostsFeed"
      :key="index"
    />
    <div class="blog-card-wrap" v-show="showRecentBlogsSection">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in blogPostsCards"
            :key="index"
            :post="post"
          />
        </div>
        <button @click="$router.push({ name: 'Blogs' })">
          View All Blogs
        </button>
      </div>
    </div>
    <div class="updates" v-if="!user">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'Register' }">
          Register for Vue_Blog <Arrow class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost";
import BlogCard from "../components/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    },
    showRecentBlogsSection() {
      if (this.$store.state.blogPosts?.length > 3) return true;
      return false;
    },
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/styles/Home.scss";
</style>
