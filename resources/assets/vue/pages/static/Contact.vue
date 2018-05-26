<template>
    <div>
        <div class="secPaddLg whiteBg textCentered">
            <div class="gridContainer">
                <div class="sectionName">
                    <div class="theName">Contact us</div>
                </div>
            </div>
        </div>

        <div class="gridContainer">
            <div class="termsPage secPaddLg">
                <div class="content">
                    <p>If you want to give us a feedback or If you have a question and you didn`t find the answer in the
                        FAQ`s page feel free to contact us at <a href="#">help@modasti.com</a></p>
                    <p><span class="brandColor fontLarger mrgRightMd"><i class="fa fa-map-marker"></i></span>123 Second
                        Street Fifth Avenue, Manhattan, New York</p>
                </div>
                <div class="mainTitle second">PRESS INQUIRIES</div>
                <div class="content">
                    <p>For press inquiries contact us at <a href="#">press@modasti.com.</a></p>
                </div>
                <div class="mainTitle second">BUSINESS INQUIRIES</div>
                <div class="content">
                    <p>For business inquiries please visit the <a href="#">BUSINESS WITH US PAGE.</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import API from "@/store/API";

    export default {
        created() {
            // API.post();
        },
        data() {
            return {
                pageContent: '',
                pageTitle: '',
            }
        }
    };
</script>