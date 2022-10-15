<template>
  <div>
    <!-- 头部分 -->
    <header id="header">
      <div class="logo">
        <a href="/" class="cursor-pointer">
          <h1>
            <img :src="headerLogoUrl" alt="RootElement根元素" class="logo-word" title="RootElement根元素" />
          </h1>
        </a>
      </div>
      <!-- 导航按钮和搜索按钮 -->
      <div class="side-nav-header">
        <div class="side-nav-bar cursor-pointer fl" @click="showMiniMenuFlag = !showMiniMenuFlag">
          <i class="fa fa-bars" aria-hidden="true" />
        </div>
        <div class="side-nav-search cursor-pointer fr">
          <i class="fa fa-search" aria-hidden="true" @click="doSearch" />
        </div>
        <div class="side-nav-input cursor-pointer fr">
          <b-form-input v-model="condition" :type="type" class="search" placeholder="请输入关键字" @keyup.enter.native="doSearch"/>
        </div>
      </div>
      <!-- 小分辨率下的导航栏 -->
      <ul class="nav-mini flex flex-direction-column mb10" v-show="showMiniMenuFlag">
        <li v-for="page in pages" :key="page.name">
          <a :href="page.url">
            <i :class="page.icon" aria-hidden="true" />
            {{ page.name }}
          </a>
        </li>
      </ul>
      <!-- 导航栏 -->
      <nav class="nav pr">
        <ul class="nav-menu">
          <li class="nav-item fl" v-for="page in pages" :key="page.name">
            <a :href="page.url" class="nav-active" v-if="currentPage === page.url">
              <i :class="page.icon" aria-hidden="true" />&nbsp;{{ page.name }}
            </a>
            <a :href="page.url" v-else>
              <i :class="page.icon" aria-hidden="true" />&nbsp;{{ page.name }}
            </a>
          </li>
          <li class="nav-item nav-search fr" @click="doSearch">
            <a href="javascript:" style="padding: 20px 22px; width: 100%">
              <i class="fa fa-search" aria-hidden="true" />
            </a>
          </li>
          <li class="nav-item nav-search-input fr">
            <div class="container flex flex-direction-column justify-content-center">
              <b-form-input v-model="condition" :type="type" class="search" placeholder="请输入关键字" @keyup.enter.native="doSearch"/>
            </div>
          </li>
        </ul>
      </nav>
      <div class="line h10" style="opacity: 0.9"></div>
    </header>
    <!-- 消息通知栏 -->
    <news-label />
  </div>
</template>

<script>
import {mapActions} from "vuex";
import NewsLabel from "./MessageLabel";
import {DEFAULT_HEADER_LOGO_URL} from "@/constant/commonConstant";

export default {
  name: 'Header',
  data() {
    return {
      showMiniMenuFlag: false,
      type: "search",
      condition: "",
      pages: [
        {name: "首页", url: "/", icon: "fa fa-home"},
        {name: "技术文章", url: "/articles/ALL", icon: "fa fa-wrench"},
        {name: "支持我", url: "/support", icon: "fa fa-thumbs-up"},
        {name: "关于作者", url: "/about", icon: "fa fa-info-circle"}
      ],
      currentPage: this.getCurrentPage(),
      messageShowIndex: 2,

      // 前端设置相关数据
      headerLogoUrl: ""

    }
  },
  methods: {
    ...mapActions([
      "searchEsPageByCondition"
    ]),
    // 设置前端配置
    setFrontendWebsiteConfig() {
      // 首先从localStorage中获取必要字段，如果不存在，那么使用默认配置
      let config = JSON.parse(localStorage.getItem("FrontendWebsiteConfig"));
      if (config === null || config === undefined) {
        this.headerLogoUrl = DEFAULT_HEADER_LOGO_URL;
      } else {
        this.headerLogoUrl = config["HEADER_LOGO_URL"] ? config["HEADER_LOGO_URL"] : DEFAULT_HEADER_LOGO_URL;
      }
    },
    getCurrentPage() {
      let articleRex = /\/article[s]?|\/search/;
      if (articleRex.test(this.$route.path)) {
        return "/articles/ALL";
      } else {
        return this.$route.path;
      }
    },
    doSearch() {
      let data = {
        condition: this.condition,
        pageParam: {
          page: 1,
          count: 10
        }
      };
      let searchRex = /\/search[#]?/;
      this.searchEsPageByCondition(data);
      if (!searchRex.test(this.$route.path)) {
        this.$router.push({
          name: "search"
        });
      }
      this.currentPage = this.getCurrentPage();
    }
  },
  components: {
    NewsLabel
  },
  mounted() {
    this.setFrontendWebsiteConfig();
  }
}
</script>

<style scoped lang="scss">

@keyframes color-change-5x {
  0% {
    background: #19dcea;
  }
  25% {
    background: #b22cff;
  }
  50% {
    background: #ea2222;
  }
  75% {
    background: #f5be10;
  }
  100% {
    background: #3bd80d;
  }
}

/* header */
#header {
  max-width: 100%;
  background: #1BDAEA;
  text-align: center;
  animation: color-change-5x 10s ease-in-out .2s infinite alternate both;
  position: relative;

  .logo {
    padding: 10px 15px 10px 15px;
    text-align: center;

    a {
      h1 {
        padding: 20px 0 20px 0;

        .logo-word {
          height: auto;
          max-width: 100%;
          border: 0;
          vertical-align: middle;
        }
      }
    }
  }

  .side-nav-header {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    color: #ffffff;

    .side-nav-input {
      height: auto;
      width: 200px;
      position: relative;
      top: 8px;

      .search {
        border-radius: 40px;
        -webkit-border-radius: 40px;
        -moz-border-radius: 40px;
        background: none;
        color: #ffffff;
        height: 25px;
        border: none;
      }
    }

    .side-nav-bar, .side-nav-search {
      padding: 10px;

      i.fa {
        font-size: 16px;
      }
    }
  }

  .nav {
    width: 100%;
    display: none;
    height: 60px;
    background-color: #4A4A4A;
    bottom: 0;
    opacity: .9;

    .nav-menu {
      height: 100%;
      width: auto;
      margin: 0 auto;
      max-width: 1200px;

      .nav-search {
        background-color: #5F9EA0;
      }

      .container {
        height: 100%;

        .search {
          border-radius: 40px;
          -webkit-border-radius: 40px;
          -moz-border-radius: 40px;
          background: #4A4A4A;
          color: #ffffff;
          height: 30px;
          border: none;
        }
      }

      .nav-item {
        height: 100%;
        color: #ffffff;

        a {
          display: block;
          width: 110px;
          height: 100%;
          padding: 20px 16px;

          &.nav-active {
            background-color: #5F9EA0;
          }

          &:hover {
            background-color: #5F9EA0;
          }
        }
      }
    }
  }

  .nav-mini {
    width: 100%;
    height: auto;

    li {
      width: 100%;
      height: 36px;
      text-align: left;
      line-height: 36px;
      padding-left: 20px;

      a {
        color: #ffffff;
        font-size: 16px;

        i.fa {
          padding-right: 10px;
        }
      }
    }
  }

}

/* ipad 768px以上 */
@media screen and (min-width: 768px) {
  #header {
    .side-nav-header {
      display: none;
    }

    .side-nav {
      display: none !important;
    }

    .nav {
      display: block;
    }

    .nav-mini {
      display: none;
    }
  }
}

/* web 1200px以上 */
@media screen and (min-width: 1200px) {

}

</style>
