<template>
  <div class="message">
    <form id="messageBox" >
      <input type="text" placeholder="标题或内容简介" required v-model="message.title">
      <div class="iconfont icon-title"></div>
      <textarea name="messageContent" id="messageContent" cols="30" rows="10" placeholder="是时候说点什么了..." required v-model="message.content"></textarea>
      <button class="iconfont icon-send" @click="addMessage($event)" ref="sendBtn"></button>
    </form>
    <div class="allMessages" ref="container">
      <div v-for="(oneMessage, index) in allMessages" :key="index" class="oneMessage">
        <h4 class="title">{{oneMessage.title}}</h4>
        <div class="date iconfont icon-time">{{getTime(oneMessage.date)}}</div>
        <p class="content">{{oneMessage.content}}</p>
      </div>
      <p class="loading" @click="getMoreMessages({ limit: 4, skip: this.allMessages.length })">
        {{isLoading ? '正在拼命加载中' : hasMoreMessages ? '下拉加载更多' : '已加载全部'}}{{loadingAnimationText}}
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import http from '../../config/http'

export default {
  name: 'message',
  data () {
    return {
      message: {
        title: '',
        content: ''
      },
      allMessages: [],
      isLoading: false,
      hasMoreMessages: true,
      loadingAnimation: undefined,
      loadingAnimationText: ''
    }
  },
  methods: {
    addMessage (e) {
      if (this.message.title === '' || this.message.content === '') return
      this.$refs.sendBtn.disabled = 'disabled'
      e.preventDefault()
      this.message.date = new Date().toString()
      http({
        method: 'POST',
        url: './message/add',
        data: this.message
      }).then(res => {
        if (res.data) {
          this.allMessages.unshift(this.message)
          this.reset()
          this.$refs.sendBtn.disabled = undefined
        }
      }).catch(err => {
        console.log(err)
      })
    },
    reset () {
      this.message = {
        title: '',
        content: ''
      }
    },
    getTime (date) {
      const time = new Date(date)
      return time.toLocaleString()
    },
    getMoreMessages () {
      const container = this.$refs.container
      if (window.scrollY + window.innerHeight < container.offsetTop + container.offsetHeight) return
      if (this.isLoading || !this.hasMoreMessages) return
      this.getMessages({ limit: 4, skip: this.allMessages.length })
    },
    getMessages (payload) {
      this.toggleIsLoading(true)

      http({
        method: 'GET',
        url: './message/all',
        params: payload
      }).then(res => {
        if (res.data.length === 0) {
          this.hasMoreMessages = false
        } else {
          this.hasMoreMessages = true
        }
        this.allMessages = [...this.allMessages, ...res.data]
        this.toggleIsLoading(false)
      }).catch(err => {
        console.log(err)
        this.toggleIsLoading(false)
      })
    },
    toggleIsLoading (state, isLoading) {
      this.isLoading = isLoading
      if (this.isLoading) {
        this.loadingAnimation = setInterval(() => {
          if (this.loadingAnimationText.length === 3) {
            this.loadingAnimationText = ''
          } else {
            this.loadingAnimationText = this.loadingAnimationText + '.'
          }
        }, 300)
      } else {
        this.loadingAnimationText = ''
        clearInterval(this.loadingAnimation)
      }
    }
  },
  mounted () {
    this.getMoreMessages()
    window.addEventListener('scroll', this.getMoreMessages)
  },
  unmounted () {
    window.removeEventListener('scroll', this.getMoreMessages)
  }
}
</script>

<style lang="less" scoped>
  .message {
    min-height: calc(100vh - 8.4rem);
    width: 38rem;
    background: #fff;
    margin-right: 1rem;
    padding: 1.5rem;
    #messageBox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      input,
      textarea {
        outline: 0;
        padding: 0.3rem 0.5rem;
        font-size: 1rem;
        margin-bottom: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 0.2rem;
      }
      input {
        padding-left: 1.6rem;
      }
      .icon-title {
        position: absolute;
        left: 0.3rem;
        top: 0.2rem;
      }
      textarea {
        width: 100%;
        resize: none;
      }
      button {
        outline: 0;
        border: 0;
        background: transparent;
        align-self: flex-end;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .allMessages {
      display: flex;
      flex-direction: column;
      align-items: center;
      .oneMessage {
        padding: 1rem 0;
        border-bottom: 1px solid #ccc;
        width: 100%;
        .title {
          margin: 0rem;
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
  }
</style>
