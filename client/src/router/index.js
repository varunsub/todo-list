import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Verify from "@/views/Verify";
import awaitVer from "@/views/awaitVer";
import listApp from "@/views/listApp";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: "/ver/:uuid",
      name: "verify",
      component: Verify,
      meta: {
        guest: true
      }
    },
    {
      path: "/awaitVerification",
      name: "awaitVerification",
      component: awaitVer,
      meta: {
        guest: true
      }
    },
    {
      path: "/listApp",
      name: "listApp",
      component: listApp,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

//Checks to make sure user is authorized to access each page
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("user") == null
    ) {
      next({
        path: "/login"
      });
    } else next();
  } else if (to.matched.some(record => record.meta.guest)) {
    if (
      localStorage.getItem("token") == null ||
      localStorage.getItem("user") == null
    ) {
      next();
    } else {
      next({ name: "listApp" });
    }
  } else {
    next();
  }
});

export default router;
