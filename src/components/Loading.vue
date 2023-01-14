<template>
  <div class="loading-content" v-if="show">
    <Spin size="large" fix>
      <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.loading-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.spin-icon-load {
  animation: ani-spin 1s linear infinite;
}
</style>
