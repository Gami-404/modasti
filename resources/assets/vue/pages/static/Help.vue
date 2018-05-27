<template>
    <div>
        <div class="secPaddLg whiteBg textCentered">
            <div class="gridContainer">
                <div class="sectionName">
                    <div class="theName">Help</div>
                </div>
            </div>
        </div>
        <div class="gridContainer">
            <div class="helpPage">

                <div class="oneQuestion" v-if="questions&&questions.length>0" v-for="question of questions"
                     :key="question.id" :class="{'opened':question.show}" @click="question.show=!question.show">
                    <div class="theQuestion">{{question.title}}
                        <span class="icon">
              <i class="fa fa-plus"></i>
            </span>
                    </div>
                    <transition name="fade">
                        <div class="theAnswer" v-html="question.answer">
                        </div>
                    </transition>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tip1: true,
                tip2: false,
                tip3: false,
                tip4: false,
                tip5: false,
                questions: [
                    {
                        id: 1,
                        title: 'FROM WHO YOU BUY?',
                        show: true,
                        answer: "  <p>Modasti is not involved in any transaction, we are a social commerce platform that advertise designer items to a global community of modest fashion shoppers.</p>\n" +
                        "            <p>All the items link back to the retailers and that`s who you buy from.</p>\n" +
                        "            <p>If you have a question regarding a purchase of an item please contact directly the retailer.</p>"
                    }, {
                        id: 2,
                        title: 'DO YOU OFFER INTERNATIONAL SHIPPING?',
                        show: false,
                        answer: "  <p>Modasti is not involved in any transaction, we are a social commerce platform that advertise designer items to a global community of modest fashion shoppers.</p>\n" +
                        "            <p>All the items link back to the retailers and that`s who you buy from.</p>\n" +
                        "            <p>If you have a question regarding a purchase of an item please contact directly the retailer.</p>"
                    }, {
                        id: 3,
                        title: 'CREATE AN ACCOUNT',
                        show: false,
                        answer: "  <p>Modasti is not involved in any transaction, we are a social commerce platform that advertise designer items to a global community of modest fashion shoppers.</p>\n" +
                        "            <p>All the items link back to the retailers and that`s who you buy from.</p>\n" +
                        "            <p>If you have a question regarding a purchase of an item please contact directly the retailer.</p>"
                    }, {
                        id: 4,
                        title: 'Edit ACCOUNT?',
                        show: false,
                        answer: "  <p>Modasti is not involved in any transaction, we are a social commerce platform that advertise designer items to a global community of modest fashion shoppers.</p>\n" +
                        "            <p>All the items link back to the retailers and that`s who you buy from.</p>\n" +
                        "            <p>If you have a question regarding a purchase of an item please contact directly the retailer.</p>"
                    }, {
                        id: 5,
                        title: 'CHANGE OR RESTORE YOUR PASSWORD?',
                        show: false,
                        answer: "  <p>Modasti is not involved in any transaction, we are a social commerce platform that advertise designer items to a global community of modest fashion shoppers.</p>\n" +
                        "            <p>All the items link back to the retailers and that`s who you buy from.</p>\n" +
                        "            <p>If you have a question regarding a purchase of an item please contact directly the retailer.</p>"
                    },

                ],
            }
        }
    };
</script>

<style>

</style>
