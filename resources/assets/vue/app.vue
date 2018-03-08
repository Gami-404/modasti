<template>
    <div>
        <app-navbar/>
        <router-view/>
        <app-footer/>
    </div>
</template>

<script>
    import Navbar from './layout/navbar.vue';
    import Footer from './layout/footer.vue';
    export default {
        components:{
            'app-navbar': Navbar,
            'app-footer': Footer
        },
        mounted() {
            console.log('Vue App Mounted !')
        }
    }
</script>
