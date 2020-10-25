<template>
  <div class="recommendInfo">
    <span class="wrapper">
      <span class="label">今日推荐</span>
      <span class="refresh iconfont icon-refresh" @click="refresh" ref="refresh">换一换</span>
    </span>
    <ul>
      <li v-for="(article, index) in recommendArticles" :key="index" class="iconfont icon-li">{{article.title}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['recommendArticles', 'isRecommendLoading'])
  },
  methods: {
    ...mapActions(['getRecommendArticles']),
    refresh () {
      this.getRecommendArticles({ size: 5 })
    }
  },
  mounted () {
    this.getRecommendArticles({ size: 5 })
  },
  watch: {
    isRecommendLoading (val) {
      if (val) {
        this.$refs.refresh.classList.add('loading')
      } else {
        this.$refs.refresh.classList.remove('loading')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommendInfo {
  background: #fff;
  border-radius: 0.2rem;
  width: 14rem;
  .wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 1rem 1.2rem 0;
    .label {
      font-weight: bold;
    }
    .refresh {
      font-size: 0.7rem;
      padding-left: 0.2rem;
      cursor: pointer;
      position: relative;
      &::before {
        font-size: 0.5rem;
        position: absolute;
        top: 0.15rem;
        left: -0.6rem;
      }
    }
  }
  ul {
    padding: 0.8rem;
    li {
      padding: 0.4rem;
      font-size: 0.8rem;
      text-align: justify;
      &::before {
        font-size: 0.6rem;
        opacity: 0.4;
      }
    }
  }
}
.loading::before {
  animation: loadingAnimation 0.6s infinite;
}
@keyframes loadingAnimation {
  0% {
    transform: rotate(0);
  } 100% {
    transform: rotate(360deg);
  }
}
</style>
