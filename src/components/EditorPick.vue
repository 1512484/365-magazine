<template>
    <section-template head-title="Editor's Picks" class="editor-pick" no-head>
        <template #section-body>
            <div class="md:sticky top-0 h-full md:w-3/4 md:px-4 md:mb-0 -mb-14 left-content" ref="leftContentRef">
                <div class="flex items-end justify-between sm:pt-5 pb-5 pl-7 md:pr-7 -ml-8 md:-mr-6 section-head" ref="sectionHeadRef">
                    <h2 class="sm:text-4xl text-2xl font-light head-title">Editor's Picks</h2>
                    <a href="#" class="flex items-center justify-end view-more no-translate" :class="{'loaded': isLoaded}" ref="viewMoreRef">
                        <img src="@/assets/images/corner-down-right-line.svg" class="max-w-3.5 mr-2" />
                        <span class="sm:text-lg text-base whitespace-nowrap">View More</span>
                    </a>
                </div>
                <div class="relative p-5 pl-0 md:mb-0 mb-10 left-content-article" :class="{'animate': isAnimationActive}" ref="leftContentArticleRef">
                    <article-item
                        class="self-control"
                        :item="editorPickArticles[0]"
                        v-if="editorPickArticles?.[0]"
                        duration-visible
                        bottom-info-classes="opacity-down"
                        clip-title
                        with-tag
                        :info-classes="`${!isCardAnimateEnd && 'hide-info'}`"
                    />
                </div>
            </div>
            <div class="md:w-1/4 right-content" ref="rightContentRef">
                <div class="md:border-l border-[#ddd] md:px-4 md:block sm:grid grid-cols-2 gap-6" ref="rightContentArticleRef">
                    <article-item :item="editorPickArticles[1]" v-if="editorPickArticles?.[1]" class="mb-10" />
                    <article-item :item="editorPickArticles[2]" v-if="editorPickArticles?.[2]" class="small" />
                </div>
            </div>
        </template>
    </section-template>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { useGeneralStore } from "@/stores/general";
import { isInViewport } from "@/utils/dom";
import SectionTemplate from '@/components/SectionTemplate.vue';
import ArticleItem from '@/components/ArticleItem.vue';

const generalStore = useGeneralStore();
const { editorPickArticles } = storeToRefs(generalStore);

const isAnimationActive = ref(false);
const isCardAnimateEnd = ref(false);
const leftContentRef = ref();
const sectionHeadRef = ref();
const leftContentArticleRef = ref();
const rightContentRef = ref();
const rightContentArticleRef = ref();
const viewMoreRef = ref();
const isLoaded = ref(false);

const startAnimation = () => {
    isAnimationActive.value = false;
    isCardAnimateEnd.value = false;
    setTimeout(() => {
        isAnimationActive.value = true;
    }, 100);
    setTimeout(() => {
        isCardAnimateEnd.value = true;
    }, 500);
}

const handleInitSize = () => {
    const cardElement = leftContentArticleRef.value?.querySelector?.(".info");
    const headerCard = document.querySelector("#header-card");

    if(
        !leftContentRef.value ||
        !sectionHeadRef.value ||
        !leftContentArticleRef.value ||
        !rightContentRef.value ||
        !rightContentArticleRef.value ||
        !headerCard ||
        !cardElement ||
        !viewMoreRef.value
    ) return;

    const windowHeight = window.innerHeight || 0;
    const windowWidth = window.innerWidth || 0;
    const sectionHeadHeight = sectionHeadRef.value.clientHeight || 0;
    const rightContentArticleHeight = rightContentArticleRef.value.clientHeight || 0;
    const headerCardHeight = headerCard.clientHeight || 0;
    const cardElementHeight = cardElement.clientHeight || 0;

    const rightContentArticleWidth = rightContentArticleRef.value.clientWidth || 0;

    leftContentRef.value.style.top = Math.min(headerCardHeight, 100) + "px";
    rightContentRef.value.style.marginTop = sectionHeadHeight + "px";

    if(windowWidth >= 920) {
        if (windowHeight - sectionHeadHeight - headerCardHeight > rightContentArticleHeight) {
            leftContentArticleRef.value.style.height = rightContentArticleHeight + "px";
        } else if (windowHeight - sectionHeadHeight - headerCardHeight > cardElementHeight + 60) {
            leftContentArticleRef.value.style.height = (windowHeight - sectionHeadHeight - headerCardHeight - 20) + "px";
        }

        viewMoreRef.value.style.transform = `translateX(${rightContentArticleWidth}px)`;
    } else {
        leftContentArticleRef.value.style.height = "auto";
    }

    handleScroll();
    setTimeout(() => {
        handleScroll();
        isLoaded.value = true;
    }, 700);
}

const isAnimated = ref(false);

const handleScroll = () => {
    const headerCard = document.querySelector("#header-card");
    const windowWidth = window.innerWidth || 0;

    if(
        !leftContentRef.value ||
        !sectionHeadRef.value ||
        !leftContentArticleRef.value ||
        !rightContentRef.value ||
        !rightContentArticleRef.value ||
        !viewMoreRef.value ||
        !headerCard
    ) return;

    const headerCardHeight = headerCard.clientHeight || 0;

    if(sectionHeadRef.value?.getBoundingClientRect()?.top <= headerCardHeight + 80 || windowWidth < 920) {
        viewMoreRef.value.classList.add("no-translate");
    } else {
        viewMoreRef.value.classList.remove("no-translate");
    }

    if(isInViewport(leftContentArticleRef.value)) {
        if(!isAnimated.value) {
            startAnimation();
        }
        isAnimated.value = true;
    } else {
        isAnimated.value = false;
        isAnimationActive.value = false;
        isCardAnimateEnd.value = false;
    }
}

onMounted(() => {
    window.addEventListener("resize", handleInitSize);
    window.addEventListener("scroll", handleScroll);
    handleInitSize();
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleInitSize);
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss">
.editor-pick {
    .section-body {
        display: flex;
        flex-direction: column;
    }
    .view-more {
        &.loaded {
            transition: 0.5s cubic-bezier(.4,.5,.2,.6);
        }
        &.no-translate {
            transform: translateX(0) !important;
            animation: view-more-opacity 0.5s linear forwards;
        }
    }
    @keyframes view-more-opacity {
        0% {
            opacity: 0;
        }
        40% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .animate {
        &.left-content-article {
            .info {
                animation: clip-show-info 0.5s linear forwards !important;
                &.hide-info {
                    * {
                        opacity: 0 !important;
                    }
                }
            }
        }
    }

    @keyframes clip-show-info {
        0% {
            clip-path: inset(0 100% 0 0);
        }
        100% {
            clip-path: inset(0 0 0 0);

        }
    }
    .left-content {
        .article-item {
            .image {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .info {
                position: relative;
                background: white;
                padding: 32px 20px 10px;
                margin-left: 20px;
                border-radius: 10px;
                overflow: hidden;
            }
            .article-tag {
                display: inline-block;
                transform: translateY(-5px);
                margin: 0;
                & + span {
                    font-size: 27px;
                }
            }
            .top-info {
                max-width: 477px;
                min-height: 200px;
                margin-bottom: 0;
            }
            .bottom-info {
                display: grid;
                gap: 12px;
                padding-top: 12px;
                border-top: 1px solid #ddd;
                .content {
                    font-size: 16px;
                }
            }
        }
    }

    @media (min-width: 920px) {
        .section-body {
            flex-direction: row;
            padding-inline: 16px;
        }
        .left-content {
            .article-item {
                .info {
                    max-width: 545px;
                }
            }
        }
    }

    @media (min-width: 640px) {
        .left-content {
            .article-item {
                .info {
                    padding: 32px;

                }
                .article-tag {
                    transform: translateY(-10px);
                    & + span {
                        font-size: 46px;
                    }
                }
                .top-info {
                    min-height: 300px;
                }
                .bottom-info {
                    grid-template-columns: 1fr 1.1fr;
                    gap: 16px;
                    .content {
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>