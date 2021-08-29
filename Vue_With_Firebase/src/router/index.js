import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import("../views/Blogs.vue"),
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "Register",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      title: "Profile",
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: () => import("../views/Admin.vue"),
  //   meta: {
  //     title: "Admin",
  //   },
  // },
  {
    path: "/create-post",
    name: "CreatePost",
    component: () => import("../views/CreatePost.vue"),
    meta: {
      title: "Create Post",
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: () => import("../views/BlogPreview.vue"),
    meta: {
      title: "Preview Blog Post",
    },
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: () => import("../views/ViewBlog.vue"),
    meta: {
      title: "View Blog Post",
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: () => import("../views/EditBlog.vue"),
    meta: {
      title: "Edit Blog Post",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Vue_Blog`;
  next();
});

export default router;
