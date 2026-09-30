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
      <div class="side-nav-bar" @click="showMiniMenuFlag = !showMiniMenuFlag">
        <i class="fa fa-bars" aria-hidden="true" />
      </div>
      <!-- 导航菜单 -->
      <nav class="nav">
        <ul class="nav-menu">
          <li class="nav-item" v-for="page in pages" :key="page.name">
            <a href="javascript:" :class="{ 'nav-active': activeMenuClass(page.name) }" @click="go(page.url)">
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
          :prefix-icon="Search"
          @keyup.enter="doSearch" />
      </div>
    </div>
    <!-- 移动端展开菜单 -->
    <transition name="slide">
      <ul class="nav-mini" v-show="showMiniMenuFlag">
        <li v-for="page in pages" :key="page.name" @click="showMiniMenuFlag = false">
          <a href="javascript:" @click="go(page.url)">
            <i :class="page.icon" aria-hidden="true" />
            {{ page.title }}
          </a>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script setup>
import {ref, computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {Search} from "@element-plus/icons-vue";
import {storeToRefs} from "pinia";
import {useCommonStore} from "@/store";

import defaultLogo from "@a/images/logo.png";

const router = useRouter();
const route = useRoute();
const commonStore = useCommonStore();
const {websiteConfig} = storeToRefs(commonStore);
const HEADER_LOGO_URL = computed(() => websiteConfig.value.HEADER_LOGO_URL);

const logoError = ref(false);
const showMiniMenuFlag = ref(false);
const searchCondition = ref("");

const pages = [
  {title: "首页", name: "Index", url: "/", icon: "fa fa-home"},
  {title: "博客", name: "Articles", url: "/articles", icon: "fa fa-book"},
  {title: "关于作者", name: "About", url: "/about", icon: "fa fa-info-circle"}
];

function go(url) {
  router.push(url);
}

function activeMenuClass(name) {
  let routeName = route.name;
  if (name === routeName) {
    return true;
  }
  return routeName === "Article" && name === "Articles";
}

function doSearch() {
  if (!searchCondition.value) {
    return;
  }
  router.push({name: "Search", query: {q: searchCondition.value}});
}
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
      cursor: pointer;
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

      :deep(.el-input__wrapper) {
        border-radius: 16px;
        background: var(--border-light);
        box-shadow: none;

        &.is-focus {
          background: #fff;
          box-shadow: 0 0 0 1px var(--primary) inset;
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

.slide-enter-from, .slide-leave-to {
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
