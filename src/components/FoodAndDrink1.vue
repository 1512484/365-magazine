<template>
    <section-template head-title="Food & Drinks">
        <template #section-body>
            <!-- <swiper
                :slides-per-view="3.2"
                :space-between="0"
                centered-slides
                loop
                class="w-full mb-4 article-swiper"
                :autoplay="{ delay: 2500 }"
                :modules="[Autoplay]"
            > -->
            <swiper
                :slides-per-view="3.2"
                centered-slides
                loop
                :grabCursor="true"
                :effect="'creative'"
                :creativeEffect="{
                    prev: {
                        translate: ['-130%', 0, 0],
                    },
                    next: {
                        translate: ['130%', 0, 0],
                    },
                }"
                :modules="[Autoplay, EffectCreative]"
                class="w-full article-swiper-list"
                @sliderMove="handleSliderMove"
                @transitionEnd="handleSlideChangeTransitionEnd"
                @transitionStart="handleSlideChangeTransitionStart"
                @progress="handleProgress"
                @beforeTransitionStart="handleBeforeTransitionStart"
                ref="swiperRef"
            >
                <swiper-slide
                    v-for="(article, index) in foodAndDrinksArticles"
                    :key="index"
                    v-slot="{ isActive }"
                >
                    <article-item :item="article" :class="{'small': !isActive}" />
                </swiper-slide>
            </swiper>
        </template>
    </section-template>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-creative';
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const generalStore = useGeneralStore();
const { foodAndDrinksArticles } = storeToRefs(generalStore);

const swiperRef = ref();

// elems[0].style.transform = arr[0] +  " - 100% - 20px)" + arr.slice(1)?.join(")");
// elems[1].style.transform = arr[0] +  " + 100% - 20px * 3)" + arr.slice(1)?.join(")");

// elems[0].style.transform = arr[0] +  " - 110%)" + arr.slice(1)?.join(")");
// elems[1].style.transform = arr[0] +  " + 70%)" + arr.slice(1)?.join(")");

const handleSliderMove = (swiper) => {
    // console.log({ swiper });
}

const handleSlideChangeTransitionEnd = async (swiper) => {
    await nextTick();
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log({swiper});
    // console.log({ endswiper: swiper });
    if(!swiper?.slides?.length) return;
    const elems = swiper.slides.filter(slide => 
        // slide.classList?.value?.includes("swiper-slide-visible") &&
        // !slide.classList?.value?.includes("swiper-slide-fully-visible") && 
        !slide.classList?.value?.includes("swiper-slide-prev") && 
        !slide.classList?.value?.includes("swiper-slide-active") && 
        !slide.classList?.value?.includes("swiper-slide-next")
    );
    // const swiperSlides = swiper.slides.filter(slide => 
    //     !slide.classList?.value?.includes("swiper-slide-visible") && 
    //     !slide.classList?.value?.includes("swiper-slide-prev") && 
    //     !slide.classList?.value?.includes("swiper-slide-active") && 
    //     !slide.classList?.value?.includes("swiper-slide-next")
    // );
    // swiperSlides.forEach(slide => slide.style.opacity = 0);
    // if(elems[0]) {
    //     let arr = elems[0].style.transform.split(")");
    //     if(elems[0].style.opacity != 0.5) {
    //         if(!elems[0].style.transform?.includes("scale(1.00001)")) {
    //             elems[0].style.transform = (arr[0] +  " - 110%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
    //         }
    //         elems[0].style.opacity = 0.5;
    //     }
    // }
    // if(elems[1]) {
    //     let arr = elems[1].style.transform.split(")");
    //     if(elems[1].style.opacity != 0.5) {
    //         if(!elems[1].style.transform?.includes("scale(1.00001)")) {
    //             elems[1].style.transform = (arr[0] +  " + 70%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
    //         }
    //         elems[1].style.opacity = 0.5;
    //     }
    // }

    if(!elems?.length) return;

    elems.forEach(elem => {
        if(elem.style.transform?.includes("scale(1.00001)")) return;

        const arr = elem.style.transform.split(")");

        if(!arr?.length) return;

        let percentage = Number(arr[0].split(" ")?.[0].replace("translate3d(calc(", "")?.replace('%', ""));

        if(percentage < 0) {
            elem.style.transform = (arr[0] +  " - 110%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
        } else if (percentage > 0) {
            elem.style.transform = (arr[0] +  " + 70%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
        }

        elem.style.opacity = 0.5;
    });

    setTimeout(() => {
        // if(!elems[0].style.transform?.includes("scale(1.00001)")) {
        //     let arr = elems[0].style.transform.split(")");
        //     elems[0].style.transform = (arr[0] +  " - 110%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
        //     elems[0].style.opacity = 0.5;
        // }
        // if(!elems[1].style.transform?.includes("scale(1.00001)")) {
        //     let arr = elems[1].style.transform.split(")");
        //     elems[1].style.transform = (arr[0] +  " + 70%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
        //     elems[1].style.opacity = 0.5;
        // }
        // swiperSlides.forEach(slide => slide.style.opacity = 0);
        elems.forEach(elem => {

            if(elem.style.transform?.includes("scale(1.00001)")) return;

            const arr = elem.style.transform.split(")");

            if(!arr?.length) return;

            let percentage = Number(arr[0].split(" ")?.[0].replace("translate3d(calc(", "")?.replace('%', ""));

            if(percentage < 0) {
                elem.style.transform = (arr[0] +  " - 110%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
            } else if (percentage > 0) {
                elem.style.transform = (arr[0] +  " + 70%)" + arr.slice(1)?.join(")"))?.replace("scale(1)", "scale(1.00001)");
            }

            elem.style.opacity = 0.5;
        });
    }, 200);
}

const handleSlideChangeTransitionStart = (swiper) => {
    // console.log({ startswiper: swiper });
}

const handleProgress = (swiper, progress) => {
    // console.log({ swiper, progress });
}

const handleBeforeTransitionStart = (swiper, speed, internal) => {
    // if(!swiper?.slides?.length) return;
    // swiper.slides.forEach((slide) => {
    //     if(slide.classList?.value?.split(" ")?.includes("swiper-slide-prev")) {
    //         console.log(slide);
    //         if(slide.swiperSlideSize) {
    //             slide.style.width = slide.swiperSlideSize * 1.42;
    //         }
    //     }
    // });
}

onMounted(() => {
    console.log(swiperRef.value);
});
</script>

<style lang="scss">
// .article-swiper {  
//     margin-right: -1.4rem;
//     min-height: 289px;

//     .swiper-slide {
//         transition: 0.5s;

//         &:not(.swiper-slide-active) {
//             opacity: 0.7;
//             transform: scale(0.8) translate(-10px);
//             margin-top: -0.8rem;
//         }

//         &.swiper-slide-active {
//             margin-left: 1.3rem;
//         }

//         &.swiper-slide-prev {
//             margin-right: -2rem;
//         }

//         &.swiper-slide-next {
//             margin-left: 0.3rem;
//         }
//     }
// }
.article-swiper-list {
    &.swiper {
        // padding-left: 70px;
        padding-left: 11.5%;
    }
    .swiper-slide {
        &-active {
            // margin-inline: -30px;
            margin-inline: -4.8%;
        }
    }
}
</style>