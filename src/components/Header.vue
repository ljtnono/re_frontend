<template>
  <header id="header">
    <div class="header-inner">
      <!-- logo -->
      <div class="logo">
        <a href="/">
          <img :src="HEADER_LOGO_URL || defaultLogo" alt="RootElement根元素" class="logo-word" @error="logoError = true" v-if="!logoError" />
        <img :src="defaultLogo" alt="RootElement根元素" class="logo-word" v-else />
        </a>
      </div>
      <!-- 移动端菜单按钮 -->
      <div class="side-nav-bar cursor-pointer" @click="showMiniMenuFlag = !showMiniMenuFlag">
        <i class="fa fa-bars" aria-hidden="true" />
      </div>
      <!-- 导航菜单 -->
      <nav class="nav">
        <ul class="nav-menu">
          <li class="nav-item" v-for="page in pages" :key="page.name">
            <a href="javascript:" :class="{ 'nav-active': activeMenuClass(page.name) }" @click="$router.push({path: page.url})">
              <i :class="page.icon" aria-hidden="true" />
              {{ page.title }}
            </a>
          </li>
        </ul>
      </nav>
      <!-- 搜索框 -->
      <div class="nav-search">
        <el-input
          v-model="searchCondition"
          size="small"
          placeholder="搜索文章..."
          prefix-icon="el-icon-search"
          @keyup.enter.native="doSearch" />
      </div>
    </div>
    <!-- 移动端展开菜单 -->
    <transition name="slide">
      <ul class="nav-mini" v-show="showMiniMenuFlag">
        <li v-for="page in pages" :key="page.name" @click="showMiniMenuFlag = false">
          <a href="javascript:" @click="$router.push({path: page.url})">
            <i :class="page.icon" aria-hidden="true" />
            {{ page.title }}
          </a>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
import {mapActions, mapState} from "vuex";

import defaultLogo from "@a/images/logo.png";

export default {
  name: "Header",
  data() {
    return {
      defaultLogo,
      logoError: false,
      showMiniMenuFlag: false,
      searchCondition: null,
      pages: [
        { title: "首页", name: "Index", url: "/", icon: "fa fa-home" },
        { title: "博客", name: "Articles", url: "/articles", icon: "fa fa-book" },
        { title: "关于作者", name: "About", url: "/about", icon: "fa fa-info-circle" },
      ],
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
      if (name === routeName) {
        return true;
      } else if (routeName === "Article" && name === "Articles") {
        return true;
      }
      return false;
    },
    ...mapActions({
      searchEsPageByCondition: "search/searchEsPageByCondition"
    }),
    doSearch() {
      let data = {
        condition: this.searchCondition,
        pageParam: { page: 1, count: 10 },
      };
      this.searchEsPageByCondition(data);
      if (this.$route.name !== "search") {
        this.$router.push({ name: "search" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
#header {
  background: var(--bg-card);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;

  .header-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 24px;

    .logo {
      flex-shrink: 0;

      a {
        display: flex;
        align-items: center;

        .logo-word {
          height: 36px;
          max-width: 180px;
          object-fit: contain;
        }
      }
    }

    .side-nav-bar {
      display: block;
      color: var(--text-regular);
      font-size: 18px;
      padding: 8px;
      margin-left: auto;
    }

    .nav {
      display: none;
      flex: 1;

      .nav-menu {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        .nav-item {
          a {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0 18px;
            height: 60px;
            color: var(--text-regular);
            font-size: 15px;
            border-bottom: 2px solid transparent;
            transition: all 0.2s ease;

            i.fa {
              font-size: 14px;
            }

            &:hover {
              color: var(--primary);
            }

            &.nav-active {
              color: var(--primary);
              border-bottom-color: var(--primary);
              font-weight: 600;
            }
          }
        }
      }
    }

    .nav-search {
      display: none;
      width: 220px;
      flex-shrink: 0;

      ::v-deep .el-input__inner {
        border-radius: 16px;
        background: var(--border-light);
        border-color: transparent;

        &:focus {
          background: #fff;
          border-color: var(--primary);
        }
      }
    }
  }

  .nav-mini {
    list-style: none;
    margin: 0;
    padding: 4px 0;
    border-top: 1px solid var(--border-light);
    background: var(--bg-card);

    li {
      a {
        display: block;
        padding: 12px 24px;
        color: var(--text-regular);
        font-size: 15px;

        i.fa {
          width: 20px;
          margin-right: 8px;
        }

        &:hover {
          color: var(--primary);
          background: var(--primary-light);
        }
      }
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.25s ease;
  max-height: 300px;
  overflow: hidden;
}
.slide-enter, .slide-leave-to {
  max-height: 0;
}

@media screen and (min-width: 768px) {
  #header {
    .header-inner {
      .side-nav-bar {
        display: none;
      }

      .nav {
        display: block;
      }

      .nav-search {
        display: block;
        margin-left: auto;
      }
    }

    .nav-mini {
      display: none;
    }
  }
}
</style>
