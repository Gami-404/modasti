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
                    <ul class="report-reasons">
                        <li><a href="javascript:void(0)" :class="{'active':format===1}"
                               @click="title='Copyright Violations';format=1;">Copyright Violations.</a>
                        </li>
                        <li><a href="javascript:void(0)" :class="{'active':format===2}"
                               @click="title='Copying other sets';format=2">Copying other sets</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':format===3}"
                               @click="title='Privacy Violation';format=3">Privacy
                            Violation</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':format===4}"
                               @click="title='Adult content';format=4">Adult
                            content</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':format===5}"
                               @click="title='Violation of community rules';format=5">Violation of
                            community rules.</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':format===6}"
                               @click="title='Racist and hate speech';format=6">Racist
                            and hate speech.</a>
                        </li>
                        <li><a href="javascript:void(0)" :class="{'active':format===7}"
                               @click="title='Using photos of others.';format=7">Using
                            photos of
                            others.</a></li>
                        <li><a href="javascript:void(0)" :class="{'active':format===8}" @click="title='';format=8">Others.</a>
                        </li>
                    </ul>
                    <br>
                    <br>
                    <br>
                    <form @submit="send" class="theForm" v-if="!upload">
                        <input type="text" ref="title" placeholder="Enter you own reason" class="formEle"
                               v-model="title" v-show="format===8"/>
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
        props: ['url', 'type', 'objectId'],
        data() {
            return {
                title: "",
                format: 0,
                loading: false,
                errors: [],
                upload: false,
                message: "",
                others: false,
            };
        },
        methods: {
            send(e) {
                e.preventDefault();
                if (this.title.length == 0) {
                    this.errors = ['Please Select Reason form list']
                }
                this.loading = true;
                API.post('/pushReport', {
                    title: this.title,
                    message: this.message,
                    url: this.url,
                    type: this.type,
                    object_id: this.objectId,
                    format:this.format
                }).then((res) => {
                    this.loading = false;
                    this.upload = true;
                }).catch((err) => {
                    this.loading = false;
                    this.errors = err.response.data.errors;
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

    textarea {
        height: auto !important;
    }
</style>
