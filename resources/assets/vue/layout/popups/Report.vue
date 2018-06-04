<template>
    <transition name="popups" enter-active-class="animated bounceIn">
        <div>
            <div class="head">
                <span>REPORT ABUSE</span>
                <router-link class="head" to="?popup=">
					<span class="icon">
						<i class="fa fa-close"></i>
					</span>
                </router-link>
            </div>
            <div class="content">
                <div v-if="!upload">
                    <h2 class="report-title">SELECT A REASON FROM THE ONES LISTED BELOW</h2>
                    <ul class="report-reasons" >
                        <li><a href="javascript:void(0)" :class="{'active':title==='Copyright Violations'}"
                               @click="title='Copyright Violations';others=false">Copyright Violations.</a>
                        </li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Copying other sets'}" @click="title='Copying other sets';others=false">Copying
                            other sets</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Privacy Violation'}" @click="title='Privacy Violation';others=false">Privacy
                            Violation</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Adult content'}" @click="title='Adult content';others=false">Adult
                            content</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Violation of community rules'}"
                               @click="title='Violation of community rules';others=false">Violation of
                            community rules.</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Racist and hate speech'}" @click="title='Racist and hate speech';others=false">Racist
                            and hate speech.</a>
                        </li>
                        <li><a href="javascript:void(0)" :class="{'active':title==='Using photos of others.'}" @click="title='Using photos of others.';others=false">Using
                            photos of
                            others.</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':others}" @click="title='';others=true">Others.</a></li>
                    </ul>
                    <br>
                    <br>
                    <br>
                    <form @submit="send" class="theForm" v-if="!upload">
                        <input type="text" ref="title" placeholder="Enter you own reason" class="formEle" v-model="title" v-show="others"/>
                        <textarea placeholder="Enter you report message" cols="30" class="formEle" rows="5"
                                  v-model="message"></textarea>
                        <div v-for="(error,i) in errors" :key="i">
                            <h4 class="errors">
                                {{error}}
                            </h4>
                            <br/>
                        </div>
                        <input type="submit" :disabled="loading" class="formEle btn" :value="isLoading">
                    </form>
                </div>

                <p style="color: green" v-if="upload">You report Submit</p>
            </div>
        </div>
    </transition>
</template>


<script>
    import API from "@/store/API";

    export default {
        props: ['url'],
        data() {
            return {
                title: "",
                loading: false,
                errors: [],
                upload: false,
                message: "",
                others:false,
            };
        },
        methods: {
            send(e) {
                e.preventDefault();
                if(this.title.length==0){
                    this.errors=['Please Select Reason form list']
                }
                this.loading = true;
                API.post('/pushReport', {
                    title: this.title,
                    message: this.message,
                    url: this.url,
                }).then((res) => {
                    this.loading = false;
                    this.upload = true;
                }).catch((err) => {
                    this.loading = false;
                    this.errors=err.response.data.errors;
                });
            }
        },
        computed: {
            isLoading() {
                return this.loading ? "Loading.." : "Submit";
            }
        }
    };
</script>


<style scoped>
    input:invalid {
        background-color: #fff;
    }

    .errors {
        font-family: "Cheque-Black";
        color: RED;
    }
    textarea{
        height: auto !important;
    }
</style>
