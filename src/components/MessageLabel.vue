<template>
  <!-- 消息通知栏 -->
  <div class="message">
    <div class="message-content flex flex-direction-row flex-align-items-start">
      <span :class="'flex' + iconClass ? iconClass : 'fa f20 fa-volume-on'" />
      <div class="flex message-list">
        <div v-for="(notice, index) in noticeList" :key="index">
          <a :href="notice.link" target="_blank" style="color: #00a67c">
            <p class="f16" v-show="messageShowIndex === index">
              {{ notice.title }}
              &nbsp;&nbsp;&nbsp;
              <i class="fa fa fa-bolt" v-if="newsNoticeNew === notice.newsState"  style="display: inline; color: #fffc3f" />
              <i class="fa fa-fire" v-if="newsNoticeHot === notice.newsState" style="display: inline; color: #ff1a1e"/>
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../mock/common";
import { findNoticeList } from "@/api/notice";
import {
  HTTP_RESULT_SUCCESS_CODE,
  HTTP_RESULT_SUCCESS_MESSAGE,
} from "@/constant/commonConstant";
import {
  NOTICE_NEWS_MESSAGE_STATE_NEW,
  NOTICE_NEWS_MESSAGE_STATE_HOT,
} from "@/constant/messageContant";

export default {
  name: "MessageLabel",
  data() {
    return {
      messageInterval: null,
      messageShowIndex: null,
      iconClassInterval: null,
      iconClass: "fa f20 fa-volume-up",
      iconClassIndex: 1,
      iconClassList: ["fa f20 fa-volume-off", "fa f20 fa-volume-up"],
      noticeList: null
    };
  },
  computed: {
    newsNoticeNew() {
      return NOTICE_NEWS_MESSAGE_STATE_NEW;
    },
    newsNoticeHot() {
      return NOTICE_NEWS_MESSAGE_STATE_HOT;
    },
  },
  methods: {
    // 切换消息
    toggleMessage() {
      this.messageShowIndex += 1;
      this.messageShowIndex %= this.noticeList.length;
      window.sessionStorage.setItem("messageShowIndex", this.messageShowIndex);
    },
    // 切换小喇叭状态
    toggleIconClass() {
      this.iconClassIndex += 1;
      this.iconClassIndex %= 2;
      this.iconClass = this.iconClassList[this.iconClassIndex];
    },
  },
  created() {
    // 首先查询sessionStorage里面是否存在，如果不存在，那么调用接口获取并存放在sessionStorage里面
    let messages = window.sessionStorage.getItem("messages");
    if (messages == null) {
      let that = this;
      findNoticeList().then((res) => {
        let outerData = res.data;
        if (
          HTTP_RESULT_SUCCESS_CODE === outerData.code &&
          HTTP_RESULT_SUCCESS_MESSAGE === outerData.message
        ) {
          let innerData = outerData.data;
          let noticeList = [];
          for (let item of innerData) {
            noticeList.push(item);
          }
          that.noticeList = noticeList;
          window.sessionStorage.setItem("messages", JSON.stringify(noticeList));
        }
      });
    } else {
      // 如果messages字段存在，那么直接使用
      this.noticeList = JSON.parse(messages);
    }

    let messageShowIndex = window.sessionStorage.getItem("messageShowIndex");
    if (messageShowIndex == null) {
      this.messageShowIndex = 0;
      window.sessionStorage.setItem("messageShowIndex", "0");
    } else {
      this.messageShowIndex = parseInt(messageShowIndex);
    }

    if (this.messageInterval) {
      clearInterval(this.messageInterval);
      clearInterval(this.iconClassInterval);
    } else {
      this.messageInterval = setInterval(this.toggleMessage, 5000);
      this.iconClassInterval = setInterval(this.toggleIconClass, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.messageInterval);
    clearInterval(this.iconClassInterval);
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1200px) {
  .message {
    margin-bottom: 15px;
  }
}

.message {
  height: 44px;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;

  .message-content {
    color: #00a67c;
    background-color: #ffffff;
    height: 100%;
    padding: 12px 10px;
    max-width: 1200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      width: 20px;
      height: 20px;

      &:before {
        position: relative;
        left: 2px;
        top: 2px;
      }
    }

    .message-list {
      padding-left: 20px;
      position: relative;

      p {
        height: 20px;
        margin-bottom: 44px;
        position: relative;
      }
    }
  }
}
</style>
