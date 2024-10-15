<template>
    <section-template head-title="Archive" class="[&>.container]:px-0" id="archive">
        <template #section-body>
            <swiper
                :slides-per-view="5"
                :centered-slides="false"
                :space-between="30"
                loop
                class="w-full mb-4 archive-swiper article-swiper"
                :initial-slide="2"
                ref="swiperRef"
                @transitionEnd="transitionEnd"
                v-if="isMdAndUp"
            >
                <!-- :autoplay="{ delay: 2500 }"
                :modules="[Autoplay]" -->
                <swiper-slide
                    v-for="(article, index) in archiveArticles"
                    :key="index"
                    v-slot="{ isActive, isPrev, isNext }"
                >
                    <article-item :item="article" info-classes="opacity-down" class="small" />
                </swiper-slide>
            </swiper>

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
                v-else
            >
                <!-- :autoplay="{ delay: 2500 }"
                :modules="[Autoplay]" -->
                <swiper-slide v-for="(article, index) in archiveArticles" :key="index" v-slot="{ isActive }">
                    <article-item :item="article" info-classes="opacity-down" :class="{'small': !isActive}" />
                </swiper-slide>
            </swiper>
        </template>
    </section-template>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { Swiper, SwiperSlide } from 'swiper/vue';
// import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const swiperRef = ref();
const generalStore = useGeneralStore();
const { archiveArticles, isMdAndUp } = storeToRefs(generalStore);

const transitionEnd = (swiper) => {
    const prev = swiper.slides?.find(slide => slide.classList?.value?.includes("swiper-slide-prev"));
    const active = swiper.slides?.find(slide => slide.classList?.value?.includes("swiper-slide-active"));
    const activeIndex = swiper.slides?.findIndex(slide => slide.classList?.value?.includes("swiper-slide-active"));
    const containerWidth = swiper.el.clientWidth;
    const containerLeft = swiper.el.getBoundingClientRect()?.left || 0;
    const prevLeft = prev?.getBoundingClientRect()?.left || 0;
    const activeLeft = active?.getBoundingClientRect()?.left || 0;
    const distance = (activeIndex === 0 ? activeLeft : prevLeft) - containerLeft;
    const wrapperTransform = swiper.slidesEl?.style?.transform;
    const wrapperTranslateX = Number(wrapperTransform?.split(", ")?.[0]?.replace("translate3d(", "")?.replace("px", ""));
    let newTranslateX = wrapperTranslateX - distance + (containerWidth - 120) / 26 + 30;
    swiper.slidesEl.style.transform = `translate3d(${newTranslateX}px, 0px, 0px)`;
}
</script>

<style lang="scss">
.archive-swiper {
    @media (min-width: 920px) {
        .swiper-slide {
            // 1 small item = 6 cols, (1 + 12 + 6 + 6 + 1 = 26)
            // 30px * 4 = 120px
            width: calc((100% - 120px) / 26 * 6) !important;
            &.swiper-slide-prev {
                width: calc((100% - 120px) / 26 * 12) !important;
            }
            &:nth-of-type(1) {
                &.swiper-slide-active {
                    width: calc((100% - 120px) / 26 * 12) !important;
                }
            }
            &.swiper-slide-next {
                .article-item {
                    .image {
                        // padding-bottom: 100%;
                        aspect-ratio: 1 / 1;
                    }
                }
            }
        }
        .swiper-wrapper {
            margin-left: calc((100% - (100% - 120px) / 26 * 6 * 3) / 2);
        }
    }
}
</style>