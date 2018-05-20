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
              <div class="mrgBtmMd">First name</div>
              <input v-model="form.firstName" type="text" class="inputEle" required>
            </div>
          </div>
          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Last name</div>
              <input v-model="form.lastName" type="text" class="inputEle" required>
            </div>
          </div>
          <div class="mycol-md-4">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd">Edit Email</div>
              <input v-model="form.email" type="email" class="inputEle" required>
            </div>
          </div>
          <div class="mycol-md-6">
            <div class="mrgBtmLg">
              <div class="mrgBtmMd fontLarger">Currency :</div>
              <select required v-model="form.currency" class="inputEle">
                <option hidden value="">...</option>
                <option v-for="curr of currency" :key="curr" :value="curr">{{curr}}</option>
              </select>
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
        <div v-for="(error,i) in errors" :key="i">
          <h4 class="errors">
            {{error}}
          </h4>
          <br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { currency } from "@/pages/retailer/sub/currency";
export default {
  data() {
    return {
      form: {
        firstName: this.$store.getters.user.name.split(" ")[0],
        lastName: this.$store.getters.user.name.split(" ")[1],
        // userName: "",
        email: this.$store.getters.user.email,
        currentPassword: "",
        password: "",
          currency:"",
      },
      btnText: "Save Edits",
      errors: [],
        currency
    };
  },
  computed: {
    user() {
      return this.$store.getters.userProfile;
    }
  },
  methods: {
    saveEdits() {
      this.btnText = "Saving..";
      this.$store
        .dispatch("update_user", this.form)
        .then(() => {
          this.btnText = "Saved";
          if (this.form.password) {
            setTimeout(() => {
              this.$store.dispatch("logout");
              this.$router.push({ query: { popup: "login" } });
            }, 500);
          } else {
            let user = { ...this.$store.getters.user };
            user.name = this.form.firstName + " " + this.form.lastName;
            user.email = this.form.email;
            this.$store.commit("EDIT_USER", user);
          }
        })
        .catch(err => {
          this.btnText = "Saved";
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
.errors {
  color: red;
}
</style>
