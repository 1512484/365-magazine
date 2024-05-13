<template>
    <article class="article-item animate-item">
        <div :class="`rounded-2xl overflow-hidden image ${imageClasses} ${isLoaded && 'loaded'}`">
            <img :src="getImageUrl(item?.thumbnail)" :class="`${imageInnerClasses}`" class="animate-scale-image" />
        </div>
        <div :class="`info ${infoClasses}`">
            <div :class="`mb-3 top-info ${topInfoClasses}`">
                <span :class="`mt-5 mb-4 article-tag ${tagClasses} ${withTag && '!hidden'}`">{{ item?.tag }}</span>
                <animation-title
                    :title="item?.title"
                    :image="withImage ? item?.thumbnail : ''"
                    :tag="withTag ? item?.tag : ''"
                    :class="`${titleClasses}`"
                    :animation="clipTitle"
                    :animationHide="clipHideTitle"
                />
            </div>
            <div :class="`pb-5 bottom-info ${bottomInfoClasses}`">
                <div class="duration" v-if="durationVisible">{{ item?.duration }} min read</div>
                <div class="content">{{ item?.short_description }}</div>
            </div>
        </div>
    </article>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getImageUrl } from '@/utils/url';
import AnimationTitle from "@/components/AnimationTitle.vue";

const props = defineProps({
    item: {
        type: Object,
        default: null
    },
    small: {
        type: Boolean,
        default: false
    },
    durationVisible: {
        type: Boolean,
        default: false
    },
    imageClasses: {
        type: String,
        default: ""
    },
    imageInnerClasses: {
        type: String,
        default: ""
    },
    titleClasses: {
        type: String,
        default: ""
    },
    tagClasses: {
        type: String,
        default: ""
    },
    bottomInfoClasses: {
        type: String,
        default: ""
    },
    topInfoClasses: {
        type: String,
        default: ""
    },
    infoClasses: {
        type: String,
        default: ""
    },
    clipTitle: {
        type: Boolean,
        default: false
    },
    clipHideTitle: {
        type: Boolean,
        default: false
    },
    withImage: {
        type: Boolean,
        default: false
    },
    withTag: {
        type: Boolean,
        default: false
    }
});

const isLoaded = ref(false);

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true;
    }, 500);
});
</script>

<style lang="scss">
.article-item {
    user-select: none;
    .image {
        aspect-ratio: 1 / 1;
        overflow: hidden;
        &.loaded {
            transition: 0.3s ease;
        }
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    &.small {
        .image {
            aspect-ratio: 20 / 13;
        }
    }
}
</style>