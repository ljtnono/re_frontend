<template>
  <div class="error-page">
    <div class="error-code">500</div>
    <p class="error-desc">服务器开小差了，稍后再试试吧~</p>
    <div class="error-actions">
      <button class="action-btn primary" @click="$router.push('/')">
        <i class="fa fa-home" />
        返回首页
      </button>
      <button class="action-btn" @click="$router.back()">
        <i class="fa fa-arrow-left" />
        返回上一页
      </button>
    </div>
    <MiniGame />
  </div>
</template>

<script setup>
import MiniGame from "./MiniGame.vue";
</script>

<style scoped lang="scss">
.error-page {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 40px;

  .error-code {
    font-size: 90px;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: 4px;
    background: linear-gradient(135deg, #f56c6c 0%, #ff9c6e 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .error-desc {
    margin: 8px 0 18px;
    font-size: 15px;
    color: var(--text-secondary);
  }

  .error-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 26px;

    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 36px;
      padding: 0 18px;
      font-size: 13px;
      color: var(--text-regular);
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: var(--primary);
        border-color: #c7d2fe;
      }

      &.primary {
        color: #fff;
        background: var(--primary);
        border-color: var(--primary);

        &:hover {
          background: var(--primary-dark);
        }
      }
    }
  }
}
</style>
