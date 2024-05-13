<template>
    <EditorPick />
    <PrimeCollection />
    <FoodAndDrink />
    <Subscribe />
    <Places />
    <People />
    <Archive />
    <Instagram />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { isInViewport } from "@/utils/dom";
import EditorPick from '@/components/EditorPick.vue';
import FoodAndDrink from '@/components/FoodAndDrink.vue';
import Subscribe from '@/components/Subscribe.vue';
import PrimeCollection from '@/components/PrimeCollection.vue';
import Places from '@/components/Places.vue';
import People from '@/components/People.vue';
import Archive from '@/components/Archive.vue';
import Instagram from '@/components/Instagram.vue';

const animateItems = ref([]);

const handleScroll = () => {
    if(!animateItems.value?.length) return;

    animateItems.value.forEach(item => {
        if(isInViewport(item)) {
            item.classList.add("animate");
        } else {
            item.classList.remove("animate");
        }
    });
}

onMounted(() => {
    animateItems.value = document.querySelectorAll(".animate-item:not(.self-control)");
    window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>