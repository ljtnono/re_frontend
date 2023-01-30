<template>
  <!-- 关于作者 -->
  <div class="content-author mb15 flex flex-direction-column">
    <div class="title flex">关于作者</div>
    <div class="personal mt20 flex flex-direction-column">
      <h1 class="f16 fb p10 name flex">个人简介</h1>
      <div class="flex flex-direction-column flex-align-items-center">
        <a href="javascript:" class="mt10">
          <img class="avatar" :src="author.avatar" :alt="author.nickName" :title="author.nickName"/>
        </a>
        <p class="nick-name fb f20 m10">{{ author.nickName }}</p>
        <p class="m10" v-for="item in author.about.split('\n')" :key="item">{{ item }}</p>
      </div>
    </div>
    <!-- 与我联系 -->
    <div class="chat-me mt20 flex flex-direction-column">
      <h1 class="f16 fb p10 name flex">与我联系</h1>
      <div class="icons flex">
        <el-tooltip effect="dark" :content="websiteConfig.SEND_ME_EMAIL" placement="top">
          <a :href="websiteConfig.SEND_ME_EMAIL" style="background-color: #e74c3c">
            <i class="fa fa-envelope-o" aria-hidden="true" />
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="author.github" placement="top">
          <a :href="author.github" style="background-color: #27ccc0">
            <i class="fa fa-github" aria-hidden="true" />
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" :content="websiteConfig.RSS_URL" placement="top">
          <a :href="websiteConfig.RSS_URL" style="background-color: #ff7c49">
            <i class="fa fa-rss" aria-hidden="true" />
          </a>
        </el-tooltip>
      </div>
      <!-- TODO 友情链接 -->
      <span class="apply-btn f16 cursor-pointer flex">申请友链</span>
    </div>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "../mock/about";
import {mapState} from "vuex";

export default {
  name: "About",
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      author: state => state.common.author,
      websiteConfig: state => state.common.websiteConfig
    })
  },
  methods: {

  },
  mounted() {
  }
};
</script>

<style scoped lang="scss">
.content-author {
  background-color: #ffffff;
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;

  .title {
    width: 100%;
    height: 26px;
    color: #1abc9c;
    border-bottom: 1px solid #1abc9c;
  }

  .personal {
    .name {
      background-color: #f1f1f1;
      text-align: center;
    }

    .nick-name {
      color: #555555;
    }

    a {
      display: block;
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;

      &:hover {
        img {
          transform: scale(1.2);
          -webkit-transform: scale(1.2);
          -moz-transform: scale(1.2);
        }
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        transition: all ease-in-out 0.5s;
        -webkit-transition: all ease-in-out 0.5s;
        -moz-transition: all ease-in-out 0.5s;
      }
    }
  }

  .skill {
    height: 500px;

    .name {
      background-color: #f1f1f1;
      text-align: center;
    }

    .chart {
      margin: 0 auto;
    }
  }

  .chat-me {
    background-color: #ffffff;

    .name {
      background-color: #f1f1f1;
      text-align: center;
    }

    .icons {
      margin: 30px auto;

      a {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        overflow: hidden;
        text-align: center;
        margin: 0 10px;

        &:nth-of-type(1) {
          background-color: #f78585;
        }

        &:nth-of-type(2) {
          background-color: #49c085;
        }

        &:nth-of-type(3) {
          background-color: #7782d1;
        }

        &:nth-of-type(4) {
          background-color: #7243d4;
        }

        i {
          font-size: 36px;
          line-height: 50px;
          color: #ffffff;
        }
      }
    }

    .apply-btn {
      width: 310px;
      height: 40px;
      display: block;
      background-color: #03cab1;
      text-align: center;
      line-height: 40px;
      color: #ffffff;
      margin: 30px auto;

      &:hover {
        background-color: #07b391;
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .content-author {
    .chat-me {
      .icons {
        a {
          width: 70px;
          height: 70px;
          margin: 0 50px;

          i {
            line-height: 70px;
          }
        }
      }
    }
  }
}
</style>
