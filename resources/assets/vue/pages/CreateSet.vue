<template>
    <div class="gridContainer">

        <div class="secPaddMd">
            <div class="myrow clearfix">
                <div @drop="drop" ref="droparea" @dragover.prevent="nothing" id="droparea" class="mycol-md-6" style="background:#fff"></div>
                <div  class="mycol-md-6">
                    <div class="listwrapper" >
                        <div v-for="(item,index) in items" :key='index' class="mycol-lg-4 mycol-sm-12">
                        <div class="itemCard">
                            <div  @dragstart="dragStart" draggable="true" :src="item.image" class="avatar">
                                <div class="verticalCentered">
                                    <div class="theCell"><img  :src="item.image" alt=""></div>
                                </div>
                            </div>

                            <div class="content">
                                <h3>
                                    <a href="#">{{item.title}}</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Knova from "konva";
export default {
  data() {
    return {
      stage: {},
      layer: {},
      images: ["images/1.jpg", "images/1.jpg", "images/1.jpg"]
    };
  },
  computed: {
    items() {
      return this.$store.getters.items;
    }
  },
  created() {
    this.$store.dispatch("items", "");
  },
  mounted() {
    var width = this.$refs.droparea.offsetWidth - 20;
    var height = 500;
    this.stage = new Konva.Stage({
      container: "droparea",
      width: width,
      height: height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    let drawImage = this.drawImage;

    this.stage.on("click", e => {
      // if click on empty area - remove all transformers
      if (e.target === this.stage) {
        this.stage.find("Transformer").destroy();
        this.layer.draw();
        return;
      }
      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName("img")) {
        return;
      }
      // remove old transformers
      // TODO: we can skip it if current rect is already selected
      this.stage.find("Transformer").destroy();

      // create new transformer
      var tr = new Konva.Transformer();
      this.layer.add(tr);
      tr.attachTo(e.target);
      this.layer.draw();
    });
  },
  methods: {
    nothing() {},
    dragStart(event) {
      event.dataTransfer.setData("image", event.target.src);
      console.log(event.target.src);
    },
    drop(event) {
      event.preventDefault();
      let img = new Image();
      img.onload = () => {
        this.drawImage(img);
      };
      img.src = event.dataTransfer.getData("image");
    },
    drawImage(imageObj) {
      // darth vader
      var darthVaderImg = new Konva.Image({
        image: imageObj,
        name: "img",
        x: this.stage.getWidth() / 2 - 200 / 2,
        y: this.stage.getHeight() / 2 - 137 / 2,
        draggable: true
      });

      // add cursor styling
      darthVaderImg.on("mouseover", function() {
        document.body.style.cursor = "pointer";
      });
      darthVaderImg.on("mouseout", function() {
        document.body.style.cursor = "default";
      });

      this.layer.add(darthVaderImg);
      this.layer.draw();
    }
  }
};
</script>


<style scoped>
.listwrapper{
    background: #fff;
    padding: 10px;
    height: 120vh;
}

.itemCard{
    border: solid rgb(212, 203, 203) 1px;
}
</style>
