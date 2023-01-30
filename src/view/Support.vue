<template>
  <!-- 支持作者部分 -->
  <div class="content-support mb15 flex flex-direction-column">
    <div class="title flex">赞助作者</div>
    <h1 class="mt10 f16 fb p10 mb10 flex" style="text-align: center">
      如果您喜欢我的文章，感觉我的文章对您有帮助，不妨动动您的金手指给予小额赞助，予人玫瑰，手有余香，不胜感激
    </h1>
    <div class="support1 flex flex-direction-column">
      <h1 class="f16 fb p10 name">赞助方式一</h1>
      <div class="zfb flex flex-direction-column flex-align-items-center m30">
        <h1 class="f16 fb p10">手机支付宝扫一扫</h1>
        <img :src="author.alipayPayQrCode" alt="支付宝扫一扫" title="支付宝扫一扫" />
      </div>
    </div>
    <div class="support2 flex flex-direction-column">
      <h1 class="f16 fb p10 name">赞助方式二</h1>
      <div class="wechat flex flex-direction-column flex-align-items-center m30">
        <h1 class="f16 fb p10">手机微信扫一扫</h1>
        <img :src="author.wechatPayQrCodeUrl" alt="微信扫一扫" title="微信扫一扫"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Support",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      author: state => state.common.author
    })
  },
  methods: {

  },
  mounted() {
  },
};
</script>

<style scoped lang="scss">
.content-support {
  padding: 10px 20px;
  background-color: #ffffff;
  width: 100%;
  box-sizing: border-box;

  .title {
    width: 100%;
    height: 26px;
    color: #1abc9c;
    border-bottom: 1px solid #1abc9c;
  }

  .support1,
  .support2 {
    .name {
      background-color: #f1f1f1;
      text-align: center;
    }

    .zfb,
    .wechat {
      text-align: center;

      h1 {
        text-align: center;
      }

      img {
        display: block;
        max-width: 270px;
      }
    }
  }
}
</style>
