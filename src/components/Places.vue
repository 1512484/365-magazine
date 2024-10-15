<template>
    <section-template head-title="Places" class="[&>.container]:px-0" id="places">
        <template #section-body>
            <swiper
                :slides-per-view="1.3"
                :space-between="30"
                :breakpoints="{
                    640: {
                        slidesPerView: 2.3,
                    },
                    920: {
                        slidesPerView: 3.3,
                    }
                }"
                centered-slides
                loop
                class="w-full mb-4 article-swiper"
            >
                <!-- :autoplay="{ delay: 2500 }"
                :modules="[Autoplay]" -->
                <swiper-slide v-for="(article, index) in placesArticles" :key="index" v-slot="{ isActive }">
                    <article-item :item="article" info-classes="opacity-down" :class="{'small': isActive}" />
                </swiper-slide>
            </swiper>
        </template>
    </section-template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const generalStore = useGeneralStore();
const { placesArticles } = storeToRefs(generalStore);
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
</style>