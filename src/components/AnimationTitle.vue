<template>
    <span class="relative juana inline-block text-2xl font-light leading-tight title">
        <template v-if="animation || animationHide">
            <span class="words" :class="{'opacity-0': animation || animationHide}">
                <animation-word
                    :title="title"
                    :image="image"
                    :tag="tag"
                />
            </span>
            <span class="absolute inset-0 flex items-end" :class="{'hidden': !animation && !animationHide}">
                <span class="words">
                    <span
                        class="animate-word"
                        :class="{ 'animate': animation }"
                    >
                        <animation-word
                            :title="title"
                            :image="image"
                            :tag="tag"
                            :tag-classes="`${animation ? 'animate-right' : 'animate-left'}`"
                        />
                    </span>
                </span>
            </span>
        </template>
        <span v-else>
            <span class="inline-block truncate-4">
                {{ title }}
            </span>
        </span>
    </span>
</template>

<script setup>
import { ref } from "vue";
import AnimationWord from "./AnimationWord.vue";

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
    animation: {
        type: Boolean,
        default: false
    },
    animationHide: {
        type: Boolean,
        default: false
    }
});
</script>