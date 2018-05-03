<template>
  <div>
    <div class="fixHeaderSpace"></div>
    <header id="header">
      <div class="top">
        <div class="gridContainer clearfix">
          <router-link to="/" class="logo"><img src="images/logo.png" alt="Modacity"></router-link>
          <div class="rightArea">
            <div class="userActions">
              <span v-if="!isAuth">
                <router-link to="?popup=signup" class="one">SIGNUP</router-link>
                <router-link to="?popup=login" class="one">LOGIN</router-link>
              </span>
              <span v-if="isAuth">
                <UserActions/>
              </span>
            </div>
            <div class="search">
              <span class="icon">
                <i class="fa fa-search"></i>
              </span>
              <form @submit.prevent="search" action="#">
                <select v-model="area">
                  <option value="item">Items</option>
                  <option value="user">Users</option>
                  <!-- <option value="2">Group</option> -->
                </select>
                <input v-model="searchString" maxlength="500" type="text">
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
            <div @click="navOpend=!navOpend" class="icon">
              <i class="fa fa-bars"></i>
            </div>
            <ul class="clearfix">
              <li v-for="route of routes" v-if="!route.auth || isAuth " :key="route.uri">
                <router-link active-class="active-header" :to="route.uri" exact>
                  <i :class="route.icon"></i>
                  <span>{{route.name}}</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <router-link to="/contest" class="contest">
            <img src="images/new.png" alt="">
            <span>CONTESTS</span>
          </router-link>
        </div>
      </div>
    </header>
    <div class="mobileMenu" @click="navOpend=false" :style="'display: '+( navOpend?'block':'none')">
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
          <router-link to="/profile/me/" class="one" v-if="isAuth">MY PROFILE</router-link>
          <a href="#" class="one" v-if="isAuth" @click="logout">LOGOUT</a>
        </div>
      </div>
    </div>
    <transition name="popups" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <WrapperPopups v-if="$route.query.popup && !$store.getters.isAuth">
        <Login v-if="$route.query.popup=='login'"></Login>
        <SignUp v-if="$route.query.popup=='signup'"></SignUp>
        <Forget v-if="$route.query.popup=='forget'"></Forget>
      </WrapperPopups>
      <WrapperPopups v-if="$route.query.popup && $store.getters.isAuth && $route.query.popup=='edit_set'">
        <SetCollectionEditPopup v-if="$route.query.popup=='edit_set'" submitType="set"></SetCollectionEditPopup>
      </WrapperPopups>
    </transition>
  </div>
</template>

<script>
import Login from "./popups/Login";
import SignUp from "./popups/Signup";
import Forget from "./popups/Forget";
import SetCollectionEditPopup from "./popups/SetCollectionEditPopup";
import UserActions from "./UserActions";
import WrapperPopups from "@/wrappers/WrapperPopups";
import routes from "./NavbarRoutes";

export default {
  components: {
    Login,
    SignUp,
    Forget,
    WrapperPopups,
    UserActions,
    SetCollectionEditPopup
  },
  data() {
    return {
      navOpend: false,
      routes,
      area: "item",
      searchString: ""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    search() {
      if (this.searchString)
        this.$router.push(`/search/${this.area}/${this.searchString}`);
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

<style>
.active-header {
  border-bottom-color: #ffbeb8 !important;
}
.popupPage {
  z-index: 50;
}

.mobileMenu .in {
  overflow: scroll;
}
#header .top .rightArea .search form select {
  text-transform: uppercase;
}
#header .top .rightArea .search form select:hover {
  color: #df6262;
  cursor: pointer;
}
</style>
