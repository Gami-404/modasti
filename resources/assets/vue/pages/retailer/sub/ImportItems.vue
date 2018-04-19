<template>
  <div class="gridContainer">
    <div class="secPaddLg">
      <div class="importItemsForm clearfix">
        <div class="title">Import</div>
        <div class="clearfix">
          <label for="importItems">Choose File </label>
          <input @change="setFile($event)" type="file" id="importItems" name="importItems" required class="disNone">
          <span class="uploadedFileDisplay grayColor">{{file ?'File Selected': 'no file chosen'}} </span>
          <input @click.prevent="sendFile" type="submit" :value="sending?'uploading...':'upload'">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      sending: false
    };
  },
  methods: {
    sendFile() {
      this.sending = true;
      this.$store
        .dispatch("import_items", this.file)
        .then(() =>
          setTimeout(() => {
            this.$router.push("allitems");
            window.location.reload();
          }, 2000)
        )
        .catch(err => {
          console.error(err);
          this.$router.push("/500");
        });
    },
    setFile(e) {
      this.file = e.target.files[0];
    }
  }
};
</script>
