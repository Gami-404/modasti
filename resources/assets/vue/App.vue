<template>
    <div>
        <app-navbar/>
        <div id="pageContent" >
        <transition name="paget" enter-active-class="animated fadeIn">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
        </div>
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
    console.log("Vue App Mounted 3!");
  }
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css";
#pageContent{
    min-width: 99vw;
    min-height: 100vh;
}
.productCard .avatar{
    height: 380px;
}
</style>
