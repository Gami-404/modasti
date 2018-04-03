import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import Item from "@/pages/Item";
import Search from "@/pages/Search";
import Single from "@/pages/Single";
import Page404 from "@/pages/404";
import Page500 from "@/pages/500";
import About from "@/pages/About";
import BrandRegister from '@/pages/brandRegister'
import SetCreate from "@/pages/SetCreate";

// Nested Routers
import ProfileRouter from "./profile.router";
import ContestsRouter from "./contest.router";



Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/item/:itemId",
      name: "item",
      component: Item
    },
    {
      path: "/search/:searchIn/:searchString",
      name: "users",
      component: Search
    },
    {
      path: "/page/:slug",
      name: "page",
      component: Single
    },
    {
      path: "/category/:name",
      name: "category",
      component: Category
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/set/create",
      name:"set_create",
      component: SetCreate,
      meta: { requiresAuth: true }
    },
    {
      path: "/brand/register",
      name: "brandRegister",
      component: BrandRegister
    },
    { path: "/category", redirect: "/category/clothing" },    
    {
      path: "/404",
      name: "404",
      component: Page404
    },
    {
      path: "/500",
      name: "500",
      component: Page500
    },
    ...ProfileRouter, 
    ContestsRouter, 
    { path: "**", redirect: "/404" }
  ],
  scrollBehavior(to, from, savedPosition) {
    if( to.fullPath == '/contest/s/new' || to.fullPath == '/contest/s/old' ){
      return { x: 0, y: 150 };
    }
    return { x: 0, y: 0 };
  }
});

// Auth guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if ( window._store.getters.isAuth ) {
      next()
    } else {
      next({
        path: '/?popup=login',
        query: { popup:'login' , redirect: to.fullPath }
      });
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router;