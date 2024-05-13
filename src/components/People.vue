<template>
    <section-template head-title="People" no-view-more class="people-section" id="people" :class="{'animate': isAnimationActive}">
        <template #section-body>
            <div class="absolute inset-0 overflow-hidden rounded-2xl" ref="peopleImageRef">
                <img
                    :src="getImageUrl(peopleArticles[activeIndex]?.thumbnail)"
                    class="w-full h-full object-cover z-[-1] animate-scale-image"
                    :key="activeIndex"
                />
                <img
                    :src="getImageUrl(peopleArticles[direction > 0 ? (prevActiveIndex) : (prevActiveIndex)]?.thumbnail)"
                    class="absolute inset-0 w-full h-full object-cover z-[0]"
                    :class="`
                        ${direction > 0 ? 'animate-clip-image-right' : 'animate-clip-image-left'}
                        ${activeIndex === prevActiveIndex && 'hidden'}
                    `"
                    :key="activeIndex"
                />
                <div class="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.4)] z-[2]"></div>
            </div>
            <div class="toggle-list md:flex-row flex-col z-[3]">
                <div
                    v-for="(article, index) in peopleArticles"
                    :key="index"
                    class="toggle-item md:!flex-row w-full"
                    :class="{'active md:w-1/2': activeIndex === index, 'md:w-1/4': activeIndex !== index}"
                >
                    <div class="md:border-r md:border-b-0 border-b border-white md:w-[auto] w-full md:h-full z-[1] mb-6 md:mx-2.5" v-if="index !== 0"></div>
                    <div class="flex md:flex-col" :class="{'md:pl-1.5': index !== 0, 'md:pr-1.5': index !== peopleArticles?.length - 1}">
                        <article-item
                            class="self-control"
                            :item="article"
                            image-classes="opacity-0"
                            :clip-title="activeIndex === index && isFirst"
                            :info-classes="`
                                ${isFirst && activeIndex !== index && 'opacity-down'}
                                ${!isFirst && opacityToggle && direction > 0 && (prevActiveIndex === index || activeIndex === index) && 'opacity-toggle-right'}
                                ${!isFirst && opacityToggle && direction < 0 && (prevActiveIndex === index || activeIndex === index) && 'opacity-toggle-left'}
                            `"
                            :title-classes="`
                                max-w-[400px] 
                                ${activeIndex === index ? 'sm:text-[40px] text-[30px]' : 'duration-0'}
                                ${!(!isFirst && opacityToggle && (direction > 0 && prevActiveIndex === index || direction < 0 && prevActiveIndex === index || activeIndex === index)) && 'opacity-100'}
                            `"
                            :bottom-info-classes="`
                                max-w-[272px] text-[rgba(255,255,255,0.8)] 
                                ${activeIndex === index && bottomContentVisible ? 'opacity-100 h-auto' : 'opacity-0 h-0 pb-0'}
                                ${activeIndex === index && isFirst && 'opacity-down'}
                            `"
                            tag-classes="opacity-80"
                        />
                        <div class="md:mt-4 toggle-btn" @click="handleToggleItem(index)"></div>
                    </div>
                </div>
            </div>
        </template>
    </section-template>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { getImageUrl } from '@/utils/url';
import { isInViewport } from "@/utils/dom";
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const generalStore = useGeneralStore();
const { peopleArticles } = storeToRefs(generalStore);
const activeIndex = ref(0);
const prevActiveIndex = ref(0);
const direction = ref(1);
const isFirst = ref(true);
const opacityToggle = ref(false);
const bottomContentVisible = ref(true);
const isAnimationActive = ref(false);
const peopleImageRef = ref();

const handleToggleItem = (index) => {
    isFirst.value = false;
    opacityToggle.value = false;
    bottomContentVisible.value = false;
    setTimeout(() => {
        opacityToggle.value = true;
    }, 10);
    setTimeout(() => {
        bottomContentVisible.value = true;
    }, 300);
    prevActiveIndex.value = activeIndex.value;
    if(peopleArticles.value?.length <= 1) return;
    if(activeIndex.value !== index) {
        direction.value = index > activeIndex.value ? 1 : -1;
        activeIndex.value = index;
        return;
    }
    if(activeIndex.value < peopleArticles.value?.length - 1 && direction.value > 0) {
        return activeIndex.value++;
    }
    if(activeIndex.value > 0 && direction.value < 0) {
        return activeIndex.value--;
    }
    direction.value = direction.value * (-1);
    handleToggleItem(index);
}

const startAnimation = () => {
    isFirst.value = true;
    isAnimationActive.value = false;
    prevActiveIndex.value = activeIndex.value;
    setTimeout(() => {
        isAnimationActive.value = true;
    }, 100);
}

// onMounted(() => {
//     setInterval(() => {
//         startAnimation();
//     }, 3000);
// });

const isAnimated = ref(false);
const handleScroll = () => {
    if(!peopleImageRef.value) return;

    if(isInViewport(peopleImageRef.value)) {
        if(!isAnimated.value) {
            startAnimation();
        }
        isAnimated.value = true;
    } else {
        isAnimated.value = false;
        prevActiveIndex.value = activeIndex.value;
    }
}

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
.people-section {
    .container {
        padding-block: 0;
    }
    .section-content {
        position: relative;
        padding-block: 20px;
    }
    .toggle-list {
        display: flex;
        padding: 0px 32px 32px;
    }
    .toggle-item {
        display: flex;
        flex-direction: column;
        // width: 25%;
        z-index: 3;
        transition: 0.8s ease;
        &:first-child {
            padding-left: 0;
            border-left: none;
        }
        &:last-child {
            padding-right: 0;
        }
        .toggle-btn {
            --btn-size: 30px;
            position: relative;
            width: var(--btn-size);
            min-width: var(--btn-size);
            height: var(--btn-size);
            min-height: var(--btn-size);
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            cursor: pointer;
            &::after, &::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                transition: 0.6s ease;
            }
            &::after {
                width: 60%;
                height: 1px;
            }
            &::before {
                width: 1px;
                height: 60%;
            }
        }
        .image {
            &:not(.animate-clip-image, .active) {
                opacity: 0;
                transition: 0s;
            }
            &.animate-clip-image {
                z-index: 1;
            }
        }
        &.active {
            // width: 50%;
            z-index: 0;
            .toggle-btn {
                &::before {
                    opacity: 0;
                }
            }
        }
    }
    .section-head {
        position: relative;
        z-index: 3;
        color: white;
    }
    .article-item {
        flex-grow: 1;
        .image {
            position: absolute;
            inset: 0;
            aspect-ratio: unset;
            pointer-events: none;
            &::after {
                content: "";
                position: absolute;
                inset: 0;
                background: rgba(0, 0, 0, 0.4);
            }
        }
        [class$="info"] {
            position: relative;
            color: white;
            * {
                font-weight: 100;
            }
        }
        .article-tag {
            margin: 0 0 20px;
        }
        .title, .truncate-4 {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .title {
            transition: font-size 0s ease 0.4s, transform 0.5s ease;
        }
        .bottom-info .content {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    @media (min-width: 920px) {
        .article-item {
            .info {
                min-height: 350px;
            }
        }
    }

    @media (min-width: 640px) {
        .container {
            padding-block: 28px;
        }
        .toggle-item {
            .toggle-btn {
                --btn-size: 40px;
            }
        }
    }
}
</style>