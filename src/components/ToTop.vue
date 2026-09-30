<template>
  <transition name="fade">
    <button v-show="visible" class="to-top" @click="scrollToTop" title="回到顶部">
      <i class="fa fa-chevron-up" />
    </button>
  </transition>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from "vue";

const visible = ref(false);
let scrollHandler = null;

onMounted(() => {
  scrollHandler = () => {
    visible.value = window.scrollY > 300 || document.documentElement.scrollTop > 300;
  };
  window.addEventListener("scroll", scrollHandler, {passive: true});
  scrollHandler();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollHandler);
});

function scrollToTop() {
  window.scrollTo({top: 0, behavior: "smooth"});
}
</script>

<style scoped lang="scss">
.to-top {
  position: fixed;
  right: 40px;
  bottom: 60px;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--primary);
  font-size: 16px;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  z-index: 999;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;

  &:hover {
    background: var(--primary);
    color: #fff;
    transform: translateY(-3px);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
