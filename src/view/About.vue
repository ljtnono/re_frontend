<template>
  <!-- 关于作者 -->
  <div class="content-author mb15 flex flex-direction-column">
    <div class="title flex">关于作者</div>
    <section class="personal mt20 flex flex-direction-column">
      <h1 class="f16 fb p10 name">个人简介</h1>
      <div class="flex flex-direction-column flex-align-items-center">
        <a href="javascript:" class="mt10">
          <img
            class="avatar"
            :src="authorAvatar"
            :alt="authorNickName"
            :title="authorNickName"
          />
        </a>
        <p class="nick-name fb f20 m10">{{ authorNickName }}</p>
        <p class="m10" v-for="item in aboutAuthor" :key="item">{{ item }}</p>
      </div>
    </section>
    <!-- 我的技能树 -->
    <section class="skill mt20 flex flex-direction-column">
      <h1 class="f16 fb p10 name flex">我的技能树</h1>
      <section class="chart p10 flex" style="height: 500px; width: 100%">
        <div class="mySkillTree" style="width: 100%; height: 100%"/>
      </section>
    </section>
    <!-- 与我联系 -->
    <section class="chat-me mt20 flex flex-direction-column">
      <h1 class="f16 fb p10 name">与我联系</h1>
      <div class="icons">
        <!-- TODO 此组件已失效 -->
        <Poptip word-wrap content="微博：最后的疼爱" :trigger="trigger">
          <a href="javascript:" style="background-color: #f78585">
            <i class="fa fa-weibo" aria-hidden="true"></i>
          </a>
        </Poptip>
        <Poptip
          word-wrap
          content="给我发送邮件：https://mail.qq.com/cgi-bin/loginpage"
          :trigger="trigger"
        >
          <a
            href="https://mail.qq.com/cgi-bin/loginpage"
            style="background-color: #e74c3c"
          >
            <i class="fa fa-envelope-o" aria-hidden="true" />
          </a>
        </Poptip>
        <Poptip
          word-wrap
          content="github：https://github.com/ljtnono"
          :trigger="trigger"
        >
          <a
            href="https://github.com/ljtnono"
            style="background-color: #27ccc0"
          >
            <i class="fa fa-github" aria-hidden="true" />
          </a>
        </Poptip>
        <Poptip word-wrap content="点击按钮订阅本站" :trigger="trigger">
          <a href="javascript:" style="background-color: #ff7c49">
            <i class="fa fa-rss" aria-hidden="true" />
          </a>
        </Poptip>
      </div>
      <div class="apply-btn f16 cursor-pointer">申请友链</div>
    </section>
  </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "../mock/about";
import {
  DEFAULT_ABOUT_AUTHOR,
  DEFAULT_AUTHOR_AVATAR,
  DEFAULT_AUTHOR_NICKNAME,
} from "@/constant/commonConstant";

export default {
  name: "About",
  data() {
    return {
      trigger: "hover",
      mySkillTreeOption: {
        left: "100%",
        top: "100%",
        tooltip: {},
        legend: {
          show: true,
        },
        xAxis: {
          name: "技能",
          position: "bottom",
          data: [1, 2, 3, 4, 5],
        },
        yAxis: {
          name: "分数",
          min: 0,
          max: 100,
        },
        series: [
          {
            name: "技能",
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
            data: [22, 33, 44, 55, 66],
          },
        ],
      },
      skillColor: [
        "#49c085",
        "#f2b63c",
        "#f58a87",
        "#6f92ff",
        "#7782d1",
        "#d56464",
      ],
      // 网站设置相关配置数据
      authorAvatar: "",
      authorNickName: "",
      aboutAuthor: [],
      mySkillTree: null
    };
  },
  methods: {
    // 设置网站配置
    setFrontendWebsiteConfig() {
      // 首先从localStorage中获取必要字段，如果不存在，那么使用默认配置
      let config = JSON.parse(localStorage.getItem("FrontendWebsiteConfig"));
      if (config === null || config === undefined) {
        this.authorAvatar = DEFAULT_AUTHOR_AVATAR;
        this.authorNickName = DEFAULT_AUTHOR_NICKNAME;
        this.aboutAuthor = DEFAULT_ABOUT_AUTHOR;
      } else {
        this.authorAvatar = config["AVATAR_URL"]
          ? config["AVATAR_URL"]
          : DEFAULT_AUTHOR_AVATAR;
        this.authorNickName = config["NICK_NAME"]
          ? config["NICK_NAME"]
          : DEFAULT_AUTHOR_NICKNAME;
        if (config["ABOUT_AUTHOR"]) {
          let ab = config["ABOUT_AUTHOR"].split("\n\n");
          this.aboutAuthor = ab;
        } else {
          this.aboutAuthor = DEFAULT_ABOUT_AUTHOR;
        }
      }
    },
    async skillList() {
      let mySkillTree = this.$echarts.init(document.querySelector(".mySkillTree"));
      let mySkillTreeOption = this.mySkillTreeOption;
      this.mySkillTree = mySkillTree;
      await this.axios.get("/api-frontend/about/skillList").then(res => {
        if (res.data.code === 0) {
          let data = res.data.data;
          let mapData = [];
          let xAxis = [];
          for (let i = 0; i < data.length; i++) {
            mapData.push({
              name: data[i].name,
              value: data[i].percent,
              itemStyle: {
                color: this.skillColor[i % this.skillColor.length]
              }
            });
            xAxis.push(data[i].name);
          }
          this.mySkillTreeOption.xAxis = {
            name: "技能",
            position: "bottom",
            data: xAxis
          };
          this.mySkillTreeOption.series = [{
            name: "技能",
            type: "bar",
            label: {
              show: true,
              position: "top"
            },
            data: mapData
          }];
          mySkillTree.setOption(this.mySkillTreeOption);
        }
      });
      window.addEventListener("resize", () => {
        // 第六步，执行echarts自带的resize方法，即可做到让echarts图表自适应
        mySkillTree.resize();
      });
    },
  },
  mounted() {
    this.skillList();
    this.setFrontendWebsiteConfig();
  },
  beforeDestroy() {
    /* 页面组件销毁的时候，别忘了移除绑定的监听resize事件，否则的话，多渲染几次
    容易导致内存泄漏和额外CPU或GPU占用哦*/
    window.removeEventListener("resize", () => {
      this.mySkillTree.resize();
    });
  },
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
