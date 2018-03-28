<template>
    <div>
        <app-navbar/>
        <transition name="paget" enter-active-class="animated fadeIn">
            <keep-alive :exclude="['item']" >
                <router-view/>
            </keep-alive>
        </transition>
        <app-footer/>
    </div>
</template>

<script>
import Navbar from "./layout/Navbar.vue";
import Footer from "./layout/Footer.vue";
export default {
  components: {
    "app-navbar": Navbar,
    "app-footer": Footer
  },
  mounted() {
    console.log("Vue App Mounted !");
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css";
</style>
