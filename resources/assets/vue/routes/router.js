import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Contests from "./pages/Contests";
import Item from "./pages/Item";
import SearchItems from "./pages/SearchItems";
import SearchUsers from "./pages/SearchUsers";
import Single from "./pages/Single";
import Page404 from "./pages/404";
import Page500 from "./pages/500";
import About from "./pages/About";
import BrandRegister from './pages/brandRegister'

// Profile Router
import Profile from "./profile";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/contests",
      name: "contests",
      component: Contests
    },
    {
      path: "/item/:id",
      name: "item",
      component: Item
    },
    {
      path: "/search/items",
      name: "items",
      component: SearchItems
    },
    {
      path: "/search/users",
      name: "users",
      component: SearchUsers
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
      path: "/brand/register",
      name: "brandRegister",
      component: BrandRegister
    },
    { path: "/category", redirect: "/category/clothing" },
    Profile,
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
    { path: "**", redirect: "/404" }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
