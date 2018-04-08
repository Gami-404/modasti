<template>
    <div>
        <div class="sectionTitle clearfix">
            <h2 class="theName">Clothing</h2>
            <div class="filters">
                <span class="icon">
                    <i class="fa fa-sliders"></i>
                </span>
                <div class="in">
                    <div class="one">
                        <div @click="showOptions('byColor')" class="title dropdownTitle">colors
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <div class="one">
                        <div class="title dropdownTitle">coverage
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <div class="one">
                        <div class="title dropdownTitle">Price
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <div class="one">
                        <div class="title dropdownTitle">size
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <div class="one">
                        <div class="title dropdownTitle">brand
                            <i class="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <a href="#" class="theBtn">Apply</a>
                </div>
            </div>
        </div>
        <transition name="filter-ops">
            <div v-if="filter" class="topCategories whiteBg filterops">
                <div class="gridContainer">
                    <a v-for="val of vals" :key="val" @click.prevent="toggleFilter(val)" :class="{ 'selected' : filters[filter][val] }" href="#">{{val}}</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      filter: ""
    };
  },
  computed: {
    byColor() {
      return this.$store.getters.filterOptions.byColor;
    },
    byBrand() {
      return this.$store.getters.filterOptions.byBrand;
    },
    vals() {
      return this[this.filter];
    },
    filters() {
      return this.$store.getters.filters;
    }
  },
  methods: {
    showOptions(filter) {
      if (this.filter == filter) this.filter = "";
      else this.filter = filter;
    },
    toggleFilter(val) {
      if (this.filters[this.filter][val]) this.remove(val);
      else this.add(val);
    },
    add(val) {
      this.$store.commit("ADD_FILTER", {
        filter: this.filter,
        val
      });
    },
    remove(val) {
      this.$store.commit("REMOVE_FILTER", {
        filter: this.filter,
        val
      });
    }
  }
};
</script>

<style scoped>

.filter-ops-enter,
.filter-ops-leave-to {
  max-height: 0px;
}

.filter-ops-leave,
.filter-ops-enter-to {
  max-height: 800px;
}

.filter-ops-enter-active{
  transition: 800ms cubic-bezier(0.17, 0.04, 0.03, 0.94);
}
.filter-ops-leave-active{
  transition: 300ms cubic-bezier(0.17, 0.14, 0.73, 0.94);    
}

.selected{
    color: #f3887f;
    opacity: 1;
}
</style>
