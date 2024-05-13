<template>
    <section class="section">
        <div class="container py-7">
            <div class="section-content">
                <div class="flex items-end justify-between sm:pt-5 pb-5 px-7 section-head" v-if="!noHead">
                    <h2 class="sm:text-4xl text-2xl font-light head-title">{{ headTitle }}</h2>
                    <a href="#" class="flex items-center justify-end view-more" v-if="!noViewMore">
                        <img src="@/assets/images/corner-down-right-line.svg" class="max-w-3.5 mr-2" />
                        <span class="sm:text-lg text-base whitespace-nowrap">View More</span>
                    </a>
                </div>
                <div class="grid section-body">
                    <slot name="section-body" />
                </div>
                <slot name="background" />
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    headTitle: String,
    noViewMore: Boolean,
    noHead: Boolean
});
</script>