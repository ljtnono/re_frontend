<template>
  <transition name="fade">
    <button v-show="visible" class="to-top" @click="scrollToTop" title="回到顶部">
      <i class="fa fa-chevron-up" />
    </button>
  </transition>
</template>

<script>
export default {
  name: "ToTop",
  data() {
    return {
      visible: false,
      scrollHandler: null
    };
  },
  mounted() {
    this.scrollHandler = () => {
      this.visible = window.scrollY > 300 || document.documentElement.scrollTop > 300;
    };
    window.addEventListener("scroll", this.scrollHandler, {passive: true});
    this.scrollHandler();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({top: 0, behavior: "smooth"});
    }
  }
};
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

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
