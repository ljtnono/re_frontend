<template>
  <!-- 消息通知栏 -->
  <div class="w message">
    <div class="message-content flex flex-direction-row flex-align-items-start">
      <span :class="iconClass ? iconClass : 'fa f20 fa-volume-on'"></span>
      <div class="message-list">
        <div v-for="(message, index) in messages" :key="index" >
          <p class="f16" v-show="messageShowIndex === index">{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../mock/common";

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
      messages: null
    }
  },
  methods: {
    toggleMessage() {
      this.messageShowIndex += 1;
      this.messageShowIndex %= this.messages.length;
      window.localStorage.setItem("messageShowIndex", this.messageShowIndex);
    },
    toggleIconClass() {
      this.iconClassIndex += 1;
      this.iconClassIndex %= 2;
      this.iconClass = this.iconClassList[this.iconClassIndex];
    }
  },

  created() {
    // 首先查询localStorage里面是否存在，如果不存在，那么调用接口获取并存放在localStorage里面
    let messages = window.localStorage.getItem("messages");
    if (messages == null) {
      let that = this;
      this.axios.get("/api-frontend/header/messages").then(res => {
        if (res.data.code === 0) {
          // 将messages设置为请求的数据
          that.messages = res.data.data;
          let messageJson = { messages: res.data.data };
          // 将messages设置到localStorage里面去
          window.localStorage.setItem("messages", JSON.stringify(messageJson));
        }
      });
    } else {
      // 如果messages字段存在，那么直接使用
      this.messages = JSON.parse(messages).messages;
    }

    let messageShowIndex = window.localStorage.getItem("messageShowIndex");
    if (messageShowIndex == null) {
      this.messageShowIndex = 0;
      window.localStorage.setItem("messageShowIndex", "0");
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
}

</script>

<style lang="scss" scoped>

</style>
