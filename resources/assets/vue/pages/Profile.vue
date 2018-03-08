<template>
    <div id="profile">
        <ProfileNav/>
        <router-view></router-view>
    </div>
</template>

<script>
import ProfileNav from '../components/profile/ProfileNav';
export default {
  components: {
      ProfileNav
  }
}
</script>
