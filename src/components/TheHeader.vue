<template>
    <div class="relative h-0 pb-[100vh] overflow-hidden header" :class="{'animate': isAnimationActive}">
        <img
            v-if="activeArticle"
            :src="getImageUrl(activeArticle.thumbnail)"
            class="absolute inset-0 w-full h-full z-[-1] object-cover"
            :class="{'is-loaded': isLoaded, 'animate-scale-image': !isLoaded || isArticleSlideVisible}"
        />
        <img
            v-if="prevActiveArticle"
            :src="getImageUrl(prevActiveArticle.thumbnail)"
            :class="`
                absolute inset-0 w-full h-full z-[-1] object-cover
                ${activeIndex === prevActiveIndex && 'hidden'}
                animate-clip-image-down
            `"
            :key="activeIndex"
        />
        <div class="animate">
            <div class="absolute inset-0 w-full h-screen bg-[#ddd] overflow-hidden logo-bg z-[1000] animate-clip-image-down">
                <div class="flex justify-center gap-[10%] -mt-[20%]">
                    <div
                        class="flex flex-col space-y-14"
                        v-for="i in 3"
                        :class="`${i % 2 ? 'animate-up' : 'animate-down'}`"
                    >
                        <Logo v-for="j in 15" />
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed top-0 left-1/2 -translate-x-1/2 z-[10] py-5 container" id="header-card">
            <div class="bg-white rounded-lg shadow-sm md:px-8 px-5">
                <div class="grid md:grid-cols-[1fr_2fr_1fr] grid-cols-[1fr_auto] md:py-6 py-4 header-top">
                    <div class="flex items-center left">
                        <img src="@/assets/images/menu-icon.svg" class="icon icon-btn sm:mr-4 mr-2 md:hidden" id="menu-btn" @click="toggleDrawer" />
                        
                        <a href="/"><Logo /></a>
                    </div>
                    <nav class="content-center md:flex hidden justify-center px-4 middle">
                        <ul class="flex items-center space-x-12">
                            <li v-for="item in navMenuItems">
                                <button class="nav-btn"><span @click="scrollToSection(item.to)">{{ item.label }}</span></button>
                            </li>
                        </ul>
                    </nav>
                    <div class="flex items-center justify-end right">
                        <button class="sm:text-base text-sm white-space-nowrap nav-btn sm:mr-6 mr-3"><span @click="scrollToSection('#subscribe')">Join</span></button>
                        <img src="@/assets/images/magnify-icon.svg" class="max-w-5 icon icon-btn" id="search-btn" />
                    </div>
                </div>
        
                <div class="overflow-hidden article-slider" :class="{'is-open': isArticleSlideVisible}">
                    <div class="sm:pt-12 sm:pb-8 py-4 border-t border-[#ddd]" v-if="isSlideContentVisible">
                        <div class="sm:flex items-end justify-between slider">
                            <div class="slide">
                                <article-item
                                    :item="isAnimationActive ? activeArticle : prevActiveArticle"
                                    image-classes="hidden"
                                    :clip-title="isAnimationActive"
                                    :clip-hide-title="!isAnimationActive"
                                    with-image
                                    with-tag
                                    title-classes="md:text-[50px] sm:text-[40px] text-[30px] max-w-[700px] min-h-[203px]"
                                    top-info-classes="mb-0"
                                    bottom-info-classes="hidden"
                                />
                            </div>
                            <div :class="`sm:ml-4 slider-control ${direction}`">
                                <div class="overflow-hidden mr-2">
                                    <button class="control-btn prev-btn" @click="getPrevSlide"></button>
                                </div>
                                <div class="overflow-hidden">
                                    <button class="control-btn next-btn" @click="getNextSlide"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="fixed top-0 -translate-x-full w-full h-full flex flex-col bg-white overflow-auto transition z-[1000]"
            :class="{'translate-x-0 animate': isMenuOpen}"
        >
            <div class="flex justify-end p-5" @click="isMenuOpen = false">
                <img src="@/assets/images/close-icon.svg" class="max-w-8" />
            </div>
            <ul class="flex flex-col my-3 overflow-auto">
                <li
                    class="relative min-h-[64px] p-5 pb-6 after:content-[''] after:absolute after:left-0 after:bottom-0 after:border-b after:border-b-[#ddd] after:w-[calc(100%-40px)] after:mx-5 overflow-hidden"
                    v-for="item in navMenuItems"
                    @click="scrollToSection(item.to)"
                >
                    <button class="nav-btn animate-up" style="animation-delay: 0.5s;"><span>{{ item.label }}</span></button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { getImageUrl } from '@/utils/url';
import Logo from "@/components/Logo.vue";
import ArticleItem from "@/components/ArticleItem.vue";

const generalStore = useGeneralStore();
const { newArticles, windowWidth } = storeToRefs(generalStore);

const activeIndex = ref(0);
const prevActiveIndex = ref(0);
const isAnimationActive = ref(true);
const direction = ref("up");
const isArticleSlideVisible = ref(false);
const isSlideContentVisible = ref(false);
const isLoaded= ref(false);
const isMenuOpen = ref(false);
const navMenuItems = ref([
    { label: "Food & Drink", to: "#food-and-drink" },
    { label: "Places", to: "#places" },
    { label: "People", to: "#people" },
    { label: "Travel", to: "#archive" },
])

const activeArticle = computed(() => newArticles.value?.[activeIndex.value]);
const prevActiveArticle = computed(() => newArticles.value?.[prevActiveIndex.value]);

const toggleDrawer = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

const startAnimation = () => {
    isAnimationActive.value = false;
    setTimeout(() => {
        isAnimationActive.value = true;
    }, 400);
}

const setDirection = (value) => {
    direction.value = value;
    setTimeout(() => {
        direction.value = "";
    }, 500);
}

const getNextSlide = () => {
    if(!newArticles.value?.length) return;
    setDirection("next");
    prevActiveIndex.value = activeIndex.value;
    if(activeIndex.value >= newArticles.value.length - 1) return activeIndex.value = 0;
    activeIndex.value++;
}

const getPrevSlide = () => {
    if(!newArticles.value?.length) return;
    setDirection("prev");
    prevActiveIndex.value = activeIndex.value;
    if(activeIndex.value <= 0) return activeIndex.value = newArticles.value.length - 1;
    activeIndex.value--;
}

const timeout = ref(0);
const handleScroll = () => {
    let isShow = false;
    if((document.documentElement.scrollTop || pageYOffset) > 0) {
        isShow = false;
    } else {
        isShow = true;
    }
    clearTimeout(timeout.value);
    isArticleSlideVisible.value = isShow;
    timeout.value = setTimeout(() => {
        isSlideContentVisible.value = isShow;
    }, 100);
}

const scrollToSection = (query) => {
    isMenuOpen.value = false;
    if(!query) return;
    const elem = document.querySelector(query);
    const headerTop = document.querySelector("#header-card .header-top");
    if(!elem || !headerTop) return;

    const elemTop = elem.getBoundingClientRect()?.top || 0;
    const headerTopHeight = headerTop.clientHeight || 0;

    window.scrollTo({
        top: elemTop + pageYOffset - headerTopHeight,
        behavior: "smooth"
    })
}

onMounted(() => {
    setTimeout(() => {
        handleScroll();
    }, 700);
    
    setTimeout(() => {
        isLoaded.value = true;
    }, 1200);

    window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

watch(activeIndex, () => {
    startAnimation();
}, { deep: true });

watch(windowWidth, () => {
    isMenuOpen.value = false;
}, { immediate: true, deep: true });
</script>

<style lang="scss">
.header {
    .animate-scale-image {
        &:not(.is-loaded) {
            animation-duration: 1s !important;
        }
    }
    .logo-bg {
        .logo {
            white-space: nowrap;
            color: #bbb;
            .logo-number {
                border-radius: 46vw;
                padding: 0px 28px 10px;
                font-size: 4.5vw;
                border-width: 0.3vw;
                &::before {
                    top: -0.25vw;
                    border-width: 0.3vw 0px 0.3vw 0.6vw;
                    border-color: currentColor #ddd #ddd currentColor;
                    box-shadow: 0.3vw 0px #ddd;
                }
                &::after {
                    top: -0.55vw;
                    border-width: 0.3vw 0px 0.3vw 0.6vw;
                    border-color: #ddd #ddd currentColor currentColor;
                    box-shadow: 0.3vw 0px #ddd;
                }
            }
            .logo-text {
                font-size: 7vw;
            }
        }
    }
    .article-slider {
        height: 296px;
        transition: 0.4s ease;
        &:not(.is-open) {
            height: 0;
        }
        .slide {
            .title {
                .words {
                    display: -webkit-box;
                    -webkit-line-clamp: 5;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .word {
        margin-right: 10px;
    }
    .article-item {
        span {
            animation-duration: 0.3s !important;
        }
    }
    .slider-control {
        display: flex;
        align-items: center;
        .control-btn {
            --control-btn-size: 30px;
            position: relative;
            width: var(--control-btn-size);
            min-width: var(--control-btn-size);
            height: var(--control-btn-size);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: currentColor;
            background-size: 10px;
            background-repeat: no-repeat;
            background-position: center;
            animation-duration: 0.5s !important;
            animation-timing-function: linear;
            animation-fill-mode: forwards;
        }
        &.up .control-btn {
            animation-name: animate-up;
            animation-duration: 0.3s !important;
        }
        .prev-btn {
            background-image: url("@/assets/images/left-arrow.png");
        }
        .next-btn {
            background-image: url("@/assets/images/right-arrow.png");
            animation-delay: 0.1s;
        }
        &.prev .prev-btn {
            animation-name: animate-button-left;
        }
        &.next .next-btn {
            animation-name: animate-button-right;
            animation-delay: 0s;
        }
    }
    @keyframes animate-button-left {
        0% {
            transition: 0.5s ease;
            translate: 0 0;
        }
        47% {
            translate: -200% 0;
        }
        49% {
            transition: 0s;
        }
        50% {
            opacity: 0
        }
        51% {
            translate: 200% 0;
        }
        53% {
            opacity: 1;
            transition: 0.5s ease;
        }
        100% {
            translate: 0 0;
        }
    }
    @keyframes animate-button-right {
        0% {
            transition: 0.5s ease;
            translate: 0 0;
        }
        47% {
            translate: 200% 0;
        }
        49% {
            transition: 0s;
        }
        50% {
            opacity: 0
        }
        51% {
            translate: -200% 0;
        }
        53% {
            opacity: 1;
            transition: 0.5s ease;
        }
        100% {
            translate: 0 0;
        }
    }

    @media (min-width: 920px) {
        .article-slider {
            .slide {
                .title {
                    .words {
                        -webkit-line-clamp: 3;
                    }
                }
            }
            .slider-control {
                .control-btn {
                    --control-btn-size: 35px;
                }
            }
        }
    }
}
</style>