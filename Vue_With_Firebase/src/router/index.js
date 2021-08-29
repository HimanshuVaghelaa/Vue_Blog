import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: false,
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: () => import("../views/Blogs.vue"),
    meta: {
      title: "Blogs",
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "Register",
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: () => import("../views/Admin.vue"),
  //   meta: {
  //     title: "Admin",
  //     requiresAuth: false,
  //     requiresAdmin: false,
  //   },
  // },
  {
    path: "/create-post",
    name: "CreatePost",
    component: () => import("../views/CreatePost.vue"),
    meta: {
      title: "Create Post",
      requiresAuth: true,
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: () => import("../views/BlogPreview.vue"),
    meta: {
      title: "Preview Blog Post",
      requiresAuth: true,
    },
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: () => import("../views/ViewBlog.vue"),
    meta: {
      title: "View Blog Post",
      requiresAuth: false,
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: () => import("../views/EditBlog.vue"),
    meta: {
      title: "Edit Blog Post",
      requiresAuth: true,
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

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser;
  // let admin = null;
  // if (user) {
  //   let token = await user.getIdTokenResult();
  //   admin = token.claims.admin;
  // }
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      // if (to.matched.some((res) => res.meta.requiresAdmin)) {
      //   if (admin) {
      //     return next();
      //   }
      //   return next({ name: "Home" });
      // }
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
});

export default router;
