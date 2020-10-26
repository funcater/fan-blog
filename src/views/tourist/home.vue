<template>
  <div class="home" ref="container">
    <div v-for="(article, index) in articles" :key="index" class="article">
      <h4 class="title"><a @click="checkDetail(article._id)">{{article.title}}</a></h4>
      <div class="date iconfont icon-time">{{getTime(article.date)}}</div>
      <p class="content">{{parseContent(article.content)}}</p>
    </div>
    <p class="loading" @click="getMoreArticles({ limit: 4, skip: this.articles.length })">
      {{isLoading ? '正在拼命加载中' : hasMoreArticles ? '下拉加载更多' : '已加载全部'}}{{loadingAnimationText}}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  }
})

export default {
  name: 'home',
  computed: { ...mapState(['articles', 'hasMoreArticles', 'isLoading', 'loadingAnimationText']) },
  methods: {
    ...mapActions(['getArticles']),
    getTime (date) {
      const time = new Date(date)
      return time.toLocaleString()
    },
    getMoreArticles () {
      const container = this.$refs.container
      if (window.scrollY + window.innerHeight < container.offsetTop + container.offsetHeight) return
      if (this.isLoading || !this.hasMoreArticles) return
      this.getArticles({ limit: 4, skip: this.articles.length })
    },
    checkDetail (id) {
      this.$router.push({
        name: 'article',
        params: {
          id: id
        }
      })
    },
    parseContent (content) {
      return marked(content || '').replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, '"')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.getMoreArticles)
  },
  unmounted () {
    window.removeEventListener('scroll', this.getMoreArticles)
  }
}
</script>

<style lang="less" scoped>
  .home {
    min-height: calc(100vh - 8.4rem);
    width: 38rem;
    background: #fff;
    border-radius: 0.2rem;
    margin-right: 1rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .article {
      padding: 1rem 0;
      border-bottom: 1px solid #ccc;
      width: 100%;
      .title {
        margin: 0rem;
        a {
          cursor: pointer;
        }
      }
      .date {
        font-size: 0.8rem;
        padding: 0.5rem 0;
        &::before {
          font-size: 0.8rem;
        }
      }
      .content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        white-space: pre-wrap;
        margin: 0;
        font-size: 0.8rem;
      }
    }
    .loading {
      text-align: center;
      font-size: 0.8rem;
      color: #666;
      font-weight: bold;
      transform: translateX(-0.5rem);
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }
</style>
