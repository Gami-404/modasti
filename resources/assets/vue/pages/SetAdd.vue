<template>
  <div class="gridContainer">
    <div class="createSetPage secPaddLg clearfix">
      <div class="leftArea">
        <div class="areaToDrop">
          <div class="intialText" v-if="itemsCounter == 0">Drag sets or items here</div>
          <div @drop="drop" ref="droparea" @dragover.prevent="nothing" id="droparea" style="background:#fff; height:100%; width:100%;"></div>
        </div>
        <div class="actionBtns">
          <a href="#" @click.prevent="publish" class="publishBtn">Publish</a>
          <div class="otherBtns">
            <div class="oneBtn">
              <a @click.prevent="forward" href="#">
                <i class="fa fa-arrow-circle-up"></i>
              </a>
            </div>
            <div class="oneBtn">
              <a @click.prevent="backward" href="#">
                <i class="fa fa-arrow-circle-down"></i>
              </a>
            </div>
            <div class="oneBtn">
              <a @click.prevent="flip" href="#">
                <i class="icon-flip"></i>
              </a>
            </div>
            <div class="oneBtn">
              <a @click.prevent="copy" href="#">
                <i class="icon-changeindex"></i>
              </a>
            </div>
            <div class="oneBtn">
              <a @click.prevent="remove" href="#">
                <i class="fa fa-trash"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="rightArea">
        <div class="theTabs">
          <a href="#" @click.prevent="view=0" :class="{'active':view==0}">Liked Items</a>
          <a href="#" @click.prevent="view=1" :class="{'active':view==1}">clothing</a>
          <a href="#" @click.prevent="view=2" :class="{'active':view==2}">shoes</a>
          <a href="#" @click.prevent="view=3" :class="{'active':view==3}">beauty</a>
        </div>
        <div class="theProducts">
          <div class="myrow clearfix">
            <div v-for="(item,i) of items" :key="i" class="mycol-sm-4">
              <div @dragstart="dragStart" draggable="true" :src="item['photos'][0]['photo_name']" :data-id="item.id" class="one">
                <div class="avatar">
                  <div class="verticalCentered">
                    <div class="theCell"><img :src="item['photos'][0]['photo_name']" :data-id="item.id" alt=""></div>
                  </div>
                </div>
                <div class="name">{{item.title_en}}</div>
              </div>
            </div>
            <div v-if="canloadmore" class="getMore">
              <a @click.prevent="loadmore" href="#"> {{ loadMoreLoading ? 'Loading' : 'More' }} </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="popups" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <WrapperPopups v-if="$route.query.popup && $store.getters.isAuth">
        <SetCollectionAddPopup v-if="$route.query.popup=='create_set'" submit-type="set" :base64-img="base64Img" :items="setItems"></SetCollectionAddPopup>
      </WrapperPopups>
    </transition>
    <Loading v-if="loading" />
  </div>
</template>
<script>
import Knova from "konva";
import Loading from "@/components/Loading";
import WrapperPopups from "@/wrappers/WrapperPopups";
import SetCollectionAddPopup from "@/layout/popups/SetCollectionAddPopup";
import { mapGetters } from "vuex";

export default {
  components: {
    Loading,
    SetCollectionAddPopup,
    WrapperPopups
  },

  data() {
    return {
      view: 0,
      stage: {},
      layer: {},
      selected: null,
      itemsCounter: 0,
      flipBit: -1,
      base64Img: "",
      setItems: [],
      loading: true,
      loadMoreLoading: false
    };
  },
  computed: {
    items() {
      return this.$store.getters.itemsToAdd(this.view);
    },
    canloadmore() {
      return this.items && this.items.length % 6 === 0;
    }
  },
  created() {
    this.$store.dispatch("get_items_for_add_set", this.view).then(() => {
      this.loading = false;
    });
  },
  mounted() {
    var width = this.$refs.droparea.offsetWidth - 20;
    var height = this.$refs.droparea.offsetHeight - 20;
    this.stage = new Konva.Stage({
      container: "droparea",
      width: width,
      height: height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    let drawImage = this.drawImage;
    let transformerFunction = e => {
      if (e.target === this.stage) {
        this.stage.find("Transformer").destroy();
        this.layer.draw();
        this.selected = null;
        this.stage.container().style.cursor = "default";
        return;
      } else if (e.target.hasName("img") && e.target !== this.selected) {
        this.stage.find("Transformer").destroy();
        var tr = new Konva.Transformer();
        this.layer.add(tr);
        tr.attachTo(e.target);
        this.selected = e.target;
        this.layer.draw();
      }
    };

    this.stage.on("click", transformerFunction);
    this.stage.on("dragstart", transformerFunction);
  },
  methods: {
    loadmore() {
      this.loadMoreLoading = true;
      this.$store.dispatch("set_load_more_to_add", this.view).then(() => {
        this.loadMoreLoading = false;
      });
    },
    nothing() {},
    dragStart(event) {
      event.dataTransfer.setData(
        "item",
        JSON.stringify({
          src: event.target.src,
          id: event.target.getAttribute("data-id")
        })
      );
    },
    drop(event) {
      event.preventDefault();
      this.itemsCounter++;
      let item = JSON.parse(event.dataTransfer.getData("item"));
      this.setItems.indexOf(item.id) === -1
        ? this.setItems.push(item.id)
        : null;
      let img = new Image();
      img.onload = () => {
        this.drawImage(img, item.id, event.offsetX, event.offsetY);
      };
      img.src = item.src;
    },
    drawImage(imageObj, id, x, y) {
      // darth vader
      var darthVaderImg = new Konva.Image({
        image: imageObj,
        name: "img",
        id,
        x: x - imageObj.width / 8,
        y: y - imageObj.height / 8,
        draggable: true,
          width:imageObj.width / 4,
          height:imageObj.height / 4,
      });

      // add cursor styling
      darthVaderImg.on("mouseover", function() {
        document.body.style.cursor = "pointer";
      });
      darthVaderImg.on("mouseout", function() {
        document.body.style.cursor = "default";
      });

      this.stage.find("Transformer").destroy();

      var tr = new Konva.Transformer();
      this.layer.add(darthVaderImg);
      this.layer.add(tr);
      tr.attachTo(darthVaderImg);
      this.selected = darthVaderImg;
      this.layer.draw();
    },
    remove() {
      if (!this.selected) return;
      this.itemsCounter--;
      let index = this.setItems.indexOf(this.selected.getId());
      this.setItems.splice(index, 1);
      this.selected.destroy();
      this.stage.find("Transformer").destroy();
      this.layer.draw();
    },
    forward() {
      this.stage.find("Transformer").destroy();
      this.selected.moveUp();
      this.selected = null;
      this.layer.draw();
    },
    backward() {
      this.stage.find("Transformer").destroy();
      this.selected.moveDown();
      this.selected = null;
      this.layer.draw();
    },
    flip() {
      this.selected.scaleX(this.flipBit);
      this.selected.x(
        this.selected.x() + this.selected.width() * this.flipBit * -1
      );
      this.flipBit *= -1;

      this.stage.find("Transformer").destroy();

      var tr = new Konva.Transformer();
      this.layer.add(tr);

      tr.attachTo(this.selected);

      this.layer.draw();
    },
    copy() {
      let cloned = this.selected.clone();
      cloned.x(cloned.x() - 50);
      cloned.y(cloned.y() - 50);
      this.selected = cloned;
      this.layer.add(cloned);
      this.stage.find("Transformer").destroy();
      var tr = new Konva.Transformer();
      this.layer.add(tr);
      tr.attachTo(cloned);
      this.layer.draw();
      this.itemsCounter++;
    },
    publish() {
      this.stage.find("Transformer").destroy();
      this.layer.draw();
      this.selected = null;
      this.$router.push({ query: { popup: "create_set" } });
      this.base64Img = this.stage.toDataURL();
    }
  }
};
</script>