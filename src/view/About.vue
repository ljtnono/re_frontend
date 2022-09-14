<template>
  <!-- 内容区 -->
  <div class="content pr">
    <!-- 关于作者 -->
    <section class="content-author mt15 mb15 pr">
      <div class="title">关于作者</div>
      <section class="personal mt20 flex-direction-column">
        <h1 class="f16 fb p10 name">个人简介</h1>
        <div class="flex flex-direction-column flex-align-items-center">
          <a href="javascript:" class="mt10">
            <img class="avatar" :src="this.$config.imgAvatar" :alt="this.$config.author" :title="this.$config.author">
          </a>
          <p class="nick-name fb f20 m10">{{ this.$config.author }}</p>
          <p class="m10">Java菜鸟一枚</p>
          <p class="m10">喜欢折腾各种技术，web、linux、数据库、前端等</p>
          <p class="m10">爱生活、爱科学、爱设计、爱编程</p>
          <p class="m10">Talk is cheap, show me the code</p>
        </div>
      </section>
      <!-- 我的技能树 -->
      <section class="skill mt20">
        <h1 class="f16 fb p10 name">我的技能树</h1>
        <section class="chart p10" style="height: 500px">
          <v-chart ref="mySkillTree"/>
        </section>
      </section>
      <!-- 与我联系 -->
      <section class="chat-me mt20 flex flex-direction-column">
        <h1 class="f16 fb p10 name">与我联系</h1>
        <div class="icons">
          <Poptip word-wrap content="微博：最后的疼爱" :trigger="trigger">
            <a href="javascript:" style="background-color: #F78585;">
              <i class="fa fa-weibo" aria-hidden="true"></i>
            </a>
          </Poptip>
          <Poptip word-wrap content="给我发送邮件：https://mail.qq.com/cgi-bin/loginpage" :trigger="trigger">
            <a href="https://mail.qq.com/cgi-bin/loginpage" style="background-color: #E74C3C;">
              <i class="fa fa-envelope-o" aria-hidden="true"/>
            </a>
          </Poptip>
          <Poptip word-wrap content="github：https://github.com/ljtnono" :trigger="trigger">
            <a href="https://github.com/ljtnono" style="background-color: #27CCC0;">
              <i class="fa fa-github" aria-hidden="true"/>
            </a>
          </Poptip>
          <Poptip word-wrap content="点击按钮订阅本站" :trigger="trigger">
            <a href="javascript:" style="background-color: #FF7C49;">
              <i class="fa fa-rss" aria-hidden="true"/>
            </a>
          </Poptip>
        </div>
        <div class="apply-btn f16 cursor-pointer">
          申请友链
        </div>
      </section>
    </section>
  </div>
</template>

<script>

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import '../mock/about'

export default {
  name: "About",
  data() {
    return {
      trigger: "hover",
      mySkillTreeOption: {
        left: "100%",
        top: "100%",
        title: {
          text: "个人技能"
        },
        tooltip: {},
        legend: {
          show: true
        },
        xAxis: {
          name: "技能",
          position: 'bottom',
          data: [1, 2, 3, 4, 5]
        },
        yAxis: {
          name: "分数",
          min: 0,
          max: 100
        },
        series: [{
          name: '技能',
          type: 'bar',
          label: {
            show: true,
            position: "top"
          },
          data: [22, 33, 44, 55, 66]
        }]
      },
      skillColor: ["#49c085", "#f2b63c", "#f58a87", "#6f92ff", "#7782d1", "#d56464"]
    }
  },
  methods: {
    skillList() {
      this.$refs.mySkillTree.showLoading();
      this.axios.get("/api-frontend/about/skillList").then(res => {
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
          this.$refs.mySkillTree.hideLoading();
          this.mySkillTreeOption.xAxis = {
            name: "技能",
            position: 'bottom',
            data: xAxis
          };
          this.mySkillTreeOption.series = [{
            name: '技能',
            type: 'bar',
            label: {
              show: true,
              position: "top"
            },
            data: mapData
          }];
          this.$refs.mySkillTree.mergeOptions(this.mySkillTreeOption);
        }
      });
    }
  },
  components: {
    "v-chart": ECharts
  },
  mounted() {
    window.onresize = () => {
      this.$refs.mySkillTree.resize();
    };
    this.skillList();
  }
}
</script>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
