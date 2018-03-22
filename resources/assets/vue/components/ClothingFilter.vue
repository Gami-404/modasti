<template>
    <div class="sectionTitle clearfix">
        <h2 class="theName">Clothing</h2>
        <div class="filters">
            <span class="icon">
                <i class="fa fa-sliders"></i>
            </span>
            <div class="in">

                <div class="one">
                    <div class="title">colors
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="selectios">
                        <a href="#">color 1</a>
                        <a href="#">color 2</a>
                        <a href="#">color 3</a>
                        <a href="#">color 4</a>
                    </div>
                </div>

                <div class="one">
                    <div class="title">coverage
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="selectios">
                        <a href="#">color 1</a>
                        <a href="#">color 2</a>
                        <a href="#">color 3</a>
                        <a href="#">color 4</a>
                    </div>
                </div>

                <div class="one">
                    <div class="title">Price
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="selectios">
                        <a href="#">color 1</a>
                        <a href="#">color 2</a>
                        <a href="#">color 3</a>
                        <a href="#">color 4</a>
                    </div>
                </div>

                <div class="one">
                    <div class="title">size
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <div class="selectios">
                        <a href="#">color 1</a>
                        <a href="#">color 2</a>
                        <a href="#">color 3</a>
                        <a href="#">color 4</a>
                    </div>
                </div>

                <div class="one">
                    <div @click="toggle" class="title">brand
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <transition name="togle" enter-active-class="animated fadeIn" >
                        <div  class="selectios" >
                            <a href="#">color 1</a>
                            <a href="#">color 2</a>
                            <a href="#">color 3</a>
                            <a href="#">color 4</a>
                        </div>
                    </transition>
                </div>

                <a href="#" class="theBtn">Apply</a>

            </div>

        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show:false
        }
    },
    methods: {
        toggle(){
            this.show = true;
        }
    }
}
</script>


<style scoped>
    .selectios  {
    display: block;
    max-height: 0;
    transition: max-height 0.55s ease-out;
    overflow: hidden;
    background: #d5d5d5;
    }

    .title:hover ~ .selectios, .selectios:hover{
        max-height: 500px;
        transition: max-height 0.65s ease-in;
    }
</style>
