<template>
  <!-- 头部分 -->
  <header id="header">
    <!-- logo -->
    <div class="logo">
      <a href="/" class="cursor-pointer">
        <h1><img :src="HEADER_LOGO_URL" alt="RootElement根元素" class="logo-word" title="RootElement根元素" /></h1>
      </a>
    </div>
    <!-- 导航按钮和搜索按钮 -->
    <div class="side-nav-header">
      <div class="side-nav-bar cursor-pointer fl" @click="showMiniMenuFlag = !showMiniMenuFlag">
        <i class="fa fa-bars" aria-hidden="true" />
      </div>
<!--      <div class="side-nav-search cursor-pointer fr">-->
<!--        <i class="fa fa-search" aria-hidden="true" @click="doSearch" />-->
<!--      </div>-->
<!--      <div class="side-nav-input cursor-pointer fr">-->
<!--        <el-input v-model="searchCondition" type="text" placeholder="请输入关键字" @keyup.enter.native="doSearch" />-->
<!--      </div>-->
    </div>
    <!-- 小分辨率下的导航栏 -->
    <ul class="nav-mini flex flex-direction-column mb10" v-show="showMiniMenuFlag">
      <li v-for="page in pages" :key="page.name">
        <a href="javascript:" @click="$router.push({name: page.name})">
          <i :class="page.icon" aria-hidden="true" />
          {{ page.title }}
        </a>
      </li>
    </ul>
    <!-- 导航栏 -->
    <nav class="nav pr">
      <ul class="nav-menu">
        <li class="nav-item fl" v-for="page in pages" :key="page.name" >
          <a href="javascript:" :class="activeMenuClass(page.name)" @click="$router.push({path: page.url})">
            <i :class="page.icon" aria-hidden="true" />
            {{ page.title }}
          </a>
        </li>
        <li class="nav-item nav-search fr ml10" @click="doSearch">
          <a href="javascript:">
            <i class="fa fa-search" aria-hidden="true" />
            搜索
          </a>
        </li>
        <li class="nav-item fr" style="line-height: 60px">
          <el-input  v-model="searchCondition" type="text" placeholder="请输入关键字" @keyup.enter.native="doSearch" />
        </li>
      </ul>
    </nav>
    <!-- 分割线 -->
    <div class="line h10" style="opacity: 0.9" />
  </header>
</template>

<script>
import {mapActions, mapState} from "vuex";
import { DEFAULT_HEADER_LOGO_URL } from "@/constant/commonConstant";

export default {
  name: "Header",
  data() {
    return {
      showMiniMenuFlag: false,
      searchCondition: null,
      pages: [
        { title: "首页", name: "Index", url: "/", icon: "fa fa-home" },
        { title: "技术文章", name: "Articles", url: "/articles", icon: "fa fa-wrench" },
        { title: "支持我", name: "Support", url: "/support", icon: "fa fa-thumbs-up" },
        { title: "关于作者", name: "About", url: "/about", icon: "fa fa-info-circle" },
      ],
      currentPage: this.getCurrentPage()
    };
  },
  computed: {
    ...mapState({
      HEADER_LOGO_URL: state => state.common.websiteConfig.HEADER_LOGO_URL
    })
  },
  methods: {
    activeMenuClass(name) {
      let routeName = this.$route.name;
      let path = this.$route.path;
      if (name === routeName) {
        return "nav-active";
      } else if (routeName === "Article" && name === "Articles") {
        return "nav-active";
      } else {
        return "";
      }
    },
    ...mapActions({
      searchEsPageByCondition: "search/searchEsPageByCondition"
    }),
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
        condition: this.searchCondition,
        pageParam: {
          page: 1,
          count: 10,
        },
      };
      let searchRex = /\/search[#]?/;
      this.searchEsPageByCondition(data);
      if (!searchRex.test(this.$route.path)) {
        this.$router.push({
          name: "search",
        });
      }
      this.currentPage = this.getCurrentPage();
    },
  },
  components: {
  },
  mounted() {
  },
};
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

// header
#header {
  max-width: 100%;
  background: #1bdaea;
  text-align: center;
  animation: color-change-5x 10s ease-in-out 0.2s infinite alternate both;
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
    }

    .side-nav-bar,
    .side-nav-search {
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
    background-color: #4a4a4a;
    bottom: 0;
    opacity: 0.9;

    .nav-menu {
      width: auto;
      margin: 0 auto;
      max-width: 1200px;

      .nav-item {
        height: 100%;
        color: #ffffff;

        .nav-search {
          height: 100%;
          a {
            display: block;
            height: 100%;
          }
        }

        a {
          display: block;
          width: 110px;
          padding: 20px 0;

          &.nav-active {
            background-color: #5f9ea0;
          }

          &:hover {
            background-color: #5f9ea0;
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

// ipad 768px以上
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

// web 1200px以上
@media screen and (min-width: 1200px) {

}
</style>
