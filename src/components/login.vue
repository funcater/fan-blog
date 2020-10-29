<template>
  <div class="wrapper">
    <div class="cover" @click="exit"></div>
    <div class="login">
      <span class="label">登录</span>
      <div :class="{inputError: userIDError}">
        <input @keypress.enter="listenEnter" ref="defaultFocus" type="text" placeholder="用户名" id="userID" v-model="userID" @blur="onBlur($event)">
        <i class="iconfont icon-username"></i>
        <span>{{userIDInfo}}</span>
      </div>
      <div :class="{inputError: passwordError}">
        <input @keypress.enter="listenEnter" ref="passwordInput" type="password" placeholder="密码" id="password" v-model="password" @blur="onBlur($event)">
        <i class="iconfont icon-password"></i>
        <span>{{passwordInfo}}</span>
      </div>
      <button ref="loginBtn" class="btn" @click="confirm">登录</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import http from '@/config/http'
import { mapMutations } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      userID: '',
      password: '',
      userIDInfo: '',
      passwordInfo: ''
    }
  },
  methods: {
    ...mapMutations(['setUserID', 'setToken', 'toggleLoginBlock']),
    onBlur (e) {
      const value = e.target.value.trim()
      const inputId = e.target.id
      if (value.length < 4 || value.length > 18) {
        this[inputId + 'Info'] = '请输入4-18个有效字符'
        return
      }
      this[inputId + 'Info'] = ''
    },
    confirm () {
      if (this.userIDInfo !== '' || this.passwordInfo !== '') return
      http({
        method: 'POST',
        url: './login',
        data: {
          userID: this.userID,
          password: this.password
        }
      }).then(res => {
        this.setUserID(this.userID)
        this.setToken(res.data.token)
        sessionStorage.setItem('token', res.data.token)
        this.toggleLoginBlock()
        // this.$router.push({ name: '/admin/index' })
      }).catch(err => {
        this.password = ''
        if (err.response && err.response.status === 401) {
          this.passwordInfo = '用户名或密码错误'
          return
        }
        this.passwordInfo = '网络连接失败'
        console.log(err)
      })
    },
    listenEnter (e) {
      this.$refs.loginBtn.focus()
      this.confirm()
      this.$refs.passwordInput.focus()
    },
    exit () {
      this.toggleLoginBlock()
    }
  },
  mounted () {
    this.$refs.defaultFocus.focus()
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .cover {
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .login {
      box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      width: 18rem;
      position: relative;
      background-color: #fff;
      border-radius: 0.2rem;
      .label {
        font-size: 1.2rem;
        padding-bottom: 1.2rem;
        display: flex;
        justify-content: center;
      }
      div {
        margin-bottom: 1.5rem;
        position: relative;
        input {
          padding: 0.5rem 2rem;
          width: 100%;
          border: 0;
          background: transparent;
          border-bottom: 1px solid #666;
          outline: 0;
          font-size: 0.8rem;
          font-family: inherit;
          color: inherit;
        }
        i {
          position: absolute;
          transform: translateY(0.5rem);
          left: 0.2rem;
        }
        &.inputError input{
          box-shadow: 0 0 2px 1px rgb(245, 138, 138);
        }
        span {
          color: rgb(243, 82, 82);
          font-size: 0.6rem;
          position: absolute;
          bottom: -1rem;
          left: 0;
        }
      }
      .btn {
        outline: none;
        border: none;
        background: rgb(245, 124, 4);
        width: 100%;
        height: 1.8rem;
        border-radius: 0.2rem;
        color: #fff;
        cursor: pointer;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        &:hover {
          background: rgb(255, 102, 0);
        }
        &:active {
          transform: translateY(0.05rem);
        }
      }
    }
  }
</style>
