<template>
  <div class="article">
    <h4 class="title">{{getArticle().title}}</h4>
    <div class="date iconfont icon-time">{{getTime(getArticle().date)}}</div>
    <p class="content" v-html="parseContent(getArticle().content)"></p>
    <thumbUp class="thumbUp"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import thumbUp from '@/components/thumbUp.vue'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'home',
  components: {
    thumbUp
  },
  computed: { ...mapState(['articles']) },
  methods: {
    getTime (date) {
      const time = new Date(date)
      return time.toLocaleString()
    },
    parseContent (content) {
      return marked(content || '')
    },
    getArticle () {
      return this.articles.filter(article => article._id === this.$route.params.id)[0]
    }
  },
  created () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="less" scoped>
  .article {
    min-height: calc(100vh - 8.4rem);
    width: 38rem;
    background: #fff;
    border-radius: 0.2rem;
    margin-right: 1rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    .title {
      margin: 1rem;
      font-size: 2rem;
      text-align: center;
    }
    .date {
      font-size: 0.8rem;
      padding: 0.5rem 0;
      text-align: end;
      &::before {
        font-size: 0.8rem;
      }
    }
    .content {
      white-space: pre-wrap;
      margin: 0;
      word-wrap: break-word;
      overflow: hidden;
    }
    .thumbUp {
      margin: 0 auto;
      cursor: pointer;
    }
  }
</style>
