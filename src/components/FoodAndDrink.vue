<template>
    <section-template head-title="Food & Drinks" class="[&>.container]:px-0" id="food-and-drink">
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
                :autoplay="{ delay: 2500 }"
                :modules="[Autoplay]"
            >
                <swiper-slide v-for="(article, index) in foodAndDrinksArticles" :key="index" v-slot="{ isActive }">
                    <article-item :item="article" info-classes="opacity-down" :class="{'small': !isActive}" />
                </swiper-slide>
            </swiper>
        </template>
    </section-template>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const generalStore = useGeneralStore();
const { foodAndDrinksArticles } = storeToRefs(generalStore);
</script>

<style lang="scss">
.article-swiper {
    --animate-image-duration: 0.3s;
    .swiper-slide {
        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -15px;
            height: 100%;
            width: 0;
            border-right: 1px solid #ddd;
        }
    }
    [class="swiper-slide"] {
        opacity: 0.5;
    }
}
</style>