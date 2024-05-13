<template>
    <section class="container subscribe-section" id="subscribe">
        <div class="section-card">
            <div class="flex flex-col items-center max-w-[650px] mx-auto">
                <h2 class="juana font-light text-center leading-[1.1] mb-12 animate-item">
                    <animation-title
                        title="365 Magazine Straight To Your Inbox."
                        class="sm:text-[50px] text-3xl"
                        animation
                    />
                </h2>
        
                <SubscribeInput />
            </div>
        </div>
    </section>
</template>

<script setup>
import SubscribeInput from '@/components/SubscribeInput.vue';
import AnimationTitle from "@/components/AnimationTitle.vue";
</script>