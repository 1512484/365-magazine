<template>
    <span
        :class="`inline-block !mr-3 article-tag ${tagClasses}`"
        style="clip-path: inset(0 0 0 0) !important"
        v-if="tag"
    >
        {{ tag }}
    </span>
    <span :class="wordClasses" v-for="(word, index) in words">
        <template v-if="image && word === '-' && lastDashIndex === index">
            <img :src="getImageUrl(image)" class="w-[80px] h-[50px] rounded-lg object-cover" />
        </template>
        <template v-else>
            {{ word }}
        </template>
    </span>
    <span :class="wordClasses" v-if="image && lastDashIndex === -1">
        <img :src="getImageUrl(image)" class="w-[80px] h-[50px] rounded-lg object-cover" />
    </span>
</template>

<script setup>
import { ref, computed } from "vue";
import { getImageUrl } from "@/utils/url";

const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    tag: {
        type: String,
        default: ""
    },
    tagClasses: {
        type: String,
        default: "animate-right"
    }
});

const words = computed(() => props.title?.split(" "));
const lastDashIndex = computed(() => words.value?.findLastIndex(word => word === "-"));
const wordClasses = ref("inline-block vertical-align-middle mr-1.5 word");
</script>