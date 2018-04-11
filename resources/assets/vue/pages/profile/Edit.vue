<template>
  <div>
    <div class="secPaddLg whiteBg">
      <div class="gridContainer">
        <div class="top_userProfile clearfix">
          <div class="avatar"><img src="images/img2.jpg" alt=""></div>
          <div class="content">
            <div class="info">
              <div class="name">{{form.firstName}}</div>
              <div class="other">test</div>
            </div>
            <div class="top_message">
              <div>Create 15 sets to become a STYLIST!</div>
              <hr>
              <div>0 / 15 Sets</div>
            </div>
          </div>
        </div>
        <button :disabled="btnText==='Saving..'" @click="saveEdits" class="topHeadBtn">{{btnText}}</button>
      </div>
    </div>
    <div class="gridContainer">
      <div class="secPaddLg">
        <div class="myrow clearfix">

          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Edit name</div>
              <input v-model="form.firstName" type="text" class="inputEle" required>
            </div>
          </div>

          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Edit Email</div>
              <input v-model="form.email" type="email" class="inputEle" required>
            </div>
          </div>

          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Your Current Password</div>
              <input v-model="form.currentPassword" type="password" class="inputEle" required>
            </div>
          </div>
          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Edit Password</div>
              <input v-model="form.password" type="password" class="inputEle" required>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: this.$store.getters.user.name,
        lastName: "",
        userName: "",
        email: this.$store.getters.user.email,
        currencyId: 0,
        currentPassword: "",
        password: ""
      },
      btnText:"Save Edits"
    };
  },
  computed: {
    user() {
      return this.$store.getters.userProfile;
    }
  },
  methods:{
    saveEdits(){
      this.btnText = "Saving.."
      this.$store.dispatch("update_user",this.form).then( () =>{
        this.btnText = "Save Edits";
      });
    }
  }
};
</script>
