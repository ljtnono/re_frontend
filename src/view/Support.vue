<template>
  <!-- 内容区 -->
  <div class="content pr">
    <!-- 支持作者部分 -->
    <section class="content-support mt15 pr mb15">
      <div class="title">赞助作者</div>
      <h1 class="mt10 f16 fb p10 mb10" style="text-align: center">
        如果您喜欢我的文章，感觉我的文章对您有帮助，不妨动动您的金手指给予小额赞助，予人玫瑰，手有余香，不胜感激</h1>
      <section class="support1 flex-direction-column">
        <h1 class="f16 fb p10 name">赞助方式一</h1>
        <div class="zfb flex flex-direction-column flex-align-items-center m30">
          <h1 class="f16 fb p10">手机支付宝扫一扫</h1>
          <img :src="authorAliPayQrcodeUrl" alt="支付宝扫一扫" title="支付宝扫一扫"/>
        </div>
      </section>
      <section class="support2 flex-direction-column">
        <h1 class="f16 fb p10 name">赞助方式二</h1>
        <div class="wechat flex flex-direction-column flex-align-items-center m30">
          <h1 class="f16 fb p10">手机微信扫一扫</h1>
          <img :src="authorWxPayQrcodeUrl" alt="微信扫一扫" title="微信扫一扫"/>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import {DEFAULT_AUTHOR_ALI_PAY_QRCODE_URL, DEFAULT_AUTHOR_WX_APY_QRCODE_URL} from "@/constant/commonConstant";

export default {
  name: "Support",
  data() {
    return {
      authorWxPayQrcodeUrl: "",
      authorAliPayQrcodeUrl: ""
    }
  },
  methods: {
    setFrontendWebsiteConfig() {
      // 首先从localStorage中获取必要字段，如果不存在，那么使用默认配置
      let config = JSON.parse(localStorage.getItem("FrontendWebsiteConfig"));
      if (config === null || config === undefined) {
        this.authorWxPayQrcodeUrl = DEFAULT_AUTHOR_WX_APY_QRCODE_URL;
        this.authorAliPayQrcodeUrl = DEFAULT_AUTHOR_ALI_PAY_QRCODE_URL;
      } else {
        this.authorWxPayQrcodeUrl = config["AUTHOR_WX_PAY_QRCODE_URL"] ? config["AUTHOR_WX_PAY_QRCODE_URL"] : DEFAULT_AUTHOR_WX_APY_QRCODE_URL;
        this.authorAliPayQrcodeUrl = config["AUTHOR_ALIPAY_PAY_QRCODE_URL"] ? config["AUTHOR_ALIPAY_PAY_QRCODE_URL"] : DEFAULT_AUTHOR_ALI_PAY_QRCODE_URL;
      }
    }
  },
  mounted() {
    this.setFrontendWebsiteConfig();
  }
}
</script>

<style scoped lang="scss">

</style>
