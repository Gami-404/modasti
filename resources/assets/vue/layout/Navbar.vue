<template>
    <div>
        <header id="header">

            <div class="top">
                <div class="gridContainer clearfix">

                    <h1 class="logo"><img src="images/logo.png" alt="Modacity"></h1>
                    <div class="rightArea">

                        <div class="userActions">
                            <a href="#" class="one">
                                <i class="icon-headicon"></i>
                            </a>
                            <span v-if="!isAuth">
                                <router-link to="?popup=signup" class="one">SIGNUP</router-link>
                                <router-link to="?popup=login" class="one">LOGIN</router-link>
                            </span>
                            <a href="#" class="one" v-if="isAuth" @click="logout">LOGOUT</a>

                        </div>
                        <div class="search">
                            <span class="icon">
                                <i class="fa fa-search"></i>
                            </span>
                            <form action="#">
                                <select>
                                    <option value="0">Items</option>
                                    <option value="1">Users</option>
                                    <option value="2">Group</option>
                                </select>
                                <input type="text">
                                <button type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

            <div class="bottom">
                <div class="gridContainer clearfix relative">
                    <nav id="nav">
                        <div class="icon">
                            <i class="fa fa-bars"></i>
                        </div>
                        <ul class="clearfix">
                            <li v-for="route of routes" :key="route.uri">
                                <router-link active-class="active-header" :to="route.uri" exact>
                                    <i :class="route.icon"></i>
                                    <span>{{route.name}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                    <a href="#" class="contest">
                        <img src="images/new.png" alt="">
                        <span>CONTESTS</span>
                    </a>
                </div>
            </div>

        </header>
        <div class="mobileMenu">
            <div class="in">
                <div class="nav">
                    <ul>
                        <li v-for="route of routes" :key="route.uri">
                            <router-link active-class="active-header" :to="route.uri" exact>
                                <i :class="route.icon"></i>
                                <span>{{route.name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="userArea">
                    <span v-if="!isAuth">
                        <router-link to="?popup=signup" class="one">SIGNUP</router-link>
                        <router-link to="?popup=login" class="one">LOGIN</router-link>
                    </span>
                    <a href="#" class="one" v-if="isAuth" @click="logout">LOGOUT</a>
                </div>
            </div>
        </div>
        <transition name="popups" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <WrapperPopups v-if="$route.query.popup">
                <Login v-if="$route.query.popup=='login'"></Login>
                <SignUp v-if="$route.query.popup=='signup'"></SignUp>
                <Forget v-if="$route.query.popup=='forget'"></Forget>
                <Reset v-if="$route.query.popup=='reset'"></Reset>
            </WrapperPopups>
        </transition>
    </div>
</template>

<script>
import Login from "../components/popups/Login";
import SignUp from "../components/popups/Signup";
import Forget from "../components/popups/Forget";
import Reset from "../components/popups/Reset";
import WrapperPopups from "../components/wrappers/WrapperPopups";

import routes from "./NavbarRoutes";
export default {
  components: {
    Login,
    SignUp,
    Forget,
    Reset,
    WrapperPopups
  },
  data() {
    return {
      routes
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  computed: {
    isAuth() {
      console.log(this.$store.getters.auth);
      return this.$store.getters.auth;
    }
  }
};
</script>

<style>
.active-header {
  border-bottom-color: #ffbeb8 !important;
}
</style>
