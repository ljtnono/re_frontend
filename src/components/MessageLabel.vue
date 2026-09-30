<template>
  <!-- 消息通知栏 -->
  <div class="message">
    <div class="message-content">
      <i class="fa" :class="iconClass" />
      <div class="message-list">
        <template v-for="(notice, index) in validNoticeList" :key="index">
          <a :href="notice.link" target="_blank" v-show="messageShowIndex === index">
            <p>
              {{ notice.title }}
              <i class="fa fa-bolt" v-if="newsNoticeNew === notice.newsState" style="color: #f7ba2a" />
              <i class="fa fa-fire" v-if="newsNoticeHot === notice.newsState" style="color: #f56c6c" />
            </p>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, onBeforeUnmount, ref} from "vue";
import {findNoticeList} from "@/api/notice";
import {HTTP_RESULT_SUCCESS_CODE, HTTP_RESULT_SUCCESS_MESSAGE} from "@/constant/commonConstant";

const NOTICE_NEWS_STATE_NEW = 1;
const NOTICE_NEWS_STATE_HOT = 2;

const newsNoticeNew = NOTICE_NEWS_STATE_NEW;
const newsNoticeHot = NOTICE_NEWS_STATE_HOT;

const noticeList = ref([]);
const messageShowIndex = ref(0);
// 小喇叭动态效果：有声/无声交替
const iconClass = ref("fa-volume-up");
let messageInterval = null;
let iconClassInterval = null;

const validNoticeList = computed(() => (noticeList.value || []).filter((item) => item != null));

function toggleMessage() {
  if (validNoticeList.value.length === 0) {
    return;
  }
  messageShowIndex.value = (messageShowIndex.value + 1) % validNoticeList.value.length;
}

onMounted(() => {
  let messages = window.sessionStorage.getItem("messages");
  if (messages == null) {
    findNoticeList().then((res) => {
      let outerData = res.data;
      if (HTTP_RESULT_SUCCESS_CODE === outerData.code && HTTP_RESULT_SUCCESS_MESSAGE === outerData.message) {
        noticeList.value = outerData.data || [];
        window.sessionStorage.setItem("messages", JSON.stringify(noticeList.value));
      }
    });
  } else {
    noticeList.value = JSON.parse(messages);
  }

  let savedIndex = window.sessionStorage.getItem("messageShowIndex");
  if (savedIndex != null) {
    messageShowIndex.value = parseInt(savedIndex);
  }

  messageInterval = setInterval(() => {
    toggleMessage();
    window.sessionStorage.setItem("messageShowIndex", String(messageShowIndex.value));
  }, 5000);
  // 小喇叭每秒在 有声/无声 之间切换
  iconClassInterval = setInterval(() => {
    iconClass.value = iconClass.value === "fa-volume-up" ? "fa-volume-off" : "fa-volume-up";
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(messageInterval);
  clearInterval(iconClassInterval);
});
</script>

<style scoped lang="scss">
.message {
  height: 44px;
  margin: 14px auto 0;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  box-sizing: border-box;

  .message-content {
    color: var(--text-regular);
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    height: 100%;
    padding: 12px 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    gap: 10px;

    > i.fa {
      color: var(--primary);
      font-size: 14px;
      width: 16px;
      text-align: center;
      animation: volumePulse 1s ease-in-out infinite;
    }

    @keyframes volumePulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.55;
        transform: scale(0.92);
      }
    }

    .message-list {
      flex: 1;
      min-width: 0;
      position: relative;

      a {
        color: var(--text-regular);

        &:hover {
          color: var(--primary);
        }
      }

      p {
        height: 20px;
        margin: 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
