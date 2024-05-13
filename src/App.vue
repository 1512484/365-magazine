<template>
  <header>
    <TheHeader />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <TheFooter />
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { RouterView } from 'vue-router';
import { useGeneralStore } from './stores/general';
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const generalStore = useGeneralStore();

const handleResize = () => {
  generalStore.setWindowWidth(window.innerWidth || 0);
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss">
main {
  scroll-snap-type: x mandatory;
  scroll-snap-stop: always;
  touch-action: manipulation;
  section {
    scroll-snap-align: start;
  }
}
</style>