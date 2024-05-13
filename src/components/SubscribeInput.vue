<template>
    <div class="w-full overflow-hidden flex sm:flex-row flex-col items-center border-t sm:border-b border-[#ddd] subscribe-input animate-item">
        <div class="relative flex-grow shrink-1 input sm:after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 sm:after:border-r after:h-2/3">
            <input
                v-model="email"
                placeholder=""
                class="text-lg w-full outline-none bg-transparent px-6 sm:py-6 py-4 sm:pl-14 pl-8"
            />
            <div class="absolute top-1/2 -translate-y-1/2 left-0 flex items-center pointer-events-none animate-up">
                <img src="@/assets/images/mail.png" class="sm:max-w-[25px] max-w-[20px]" />
                <span class="sm:text-lg text-base font-light text-[#bbb] ml-3" :class="{'hidden': email}">Enter Your Email Address</span>
            </div>
        </div>
        <button class="sm:text-lg text-base sm:w-[250px] w-full min-w-[max-content] shrink-2 py-4 sm:border-t-0 border-t border-[#ddd]">
            <div class="animate-up">
                Subscribe
            </div>
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
</script>