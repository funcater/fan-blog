<template>
  <div class="wrapper">
    <div class="cover" @click="exit"></div>
    <div class="login">
      <h3>欢迎登录<img src="../assets/images/logo.png" alt="logo"></h3>
      <div :class="{inputError: userIDError}">
        <input ref="defaultFocus" type="text" placeholder="用户名" id="userID" v-model="userID" @blur="onBlur($event)">
        <i class="iconfont icon-user"></i>
        <span>{{userIDInfo}}</span>
      </div>
      <div :class="{inputError: passwordError}">
        <input ref="passwordInput" type="password" placeholder="密码" id="password" v-model="password" @blur="onBlur($event)">
        <i class="iconfont icon-password"></i>
        <span>{{passwordInfo}}</span>
      </div>
      <button ref="loginBtn" class="btn" @click="confirm">登录</button>
      <button class="btn" @click="reset">重置</button>
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
      passwordInfo: '',
      userIDError: undefined,
      passwordError: undefined
    }
  },
  methods: {
    ...mapMutations(['setUserID', 'setToken', 'toggleLoginBlock']),
    onBlur (e) {
      const value = e.target.value.trim()
      const inputId = e.target.id
      if (value.length < 4 || value.length > 18) {
        this[inputId + 'Info'] = '请输入4-18个有效字符'
        this[inputId + 'Error'] = true
        return
      }
      this[inputId + 'Info'] = ''
      this[inputId + 'Error'] = false
    },
    reset () {
      this.userID = ''
      this.password = ''
      this.userIDInfo = ''
      this.passwordInfo = ''
      this.userIDError = undefined
      this.passwordError = undefined
      this.$refs.defaultFocus.focus()
    },
    confirm () {
      if (this.userIDError || this.passwordError) return
      http({
        method: 'POST',
        url: './login',
        data: {
          userID: this.userID,
          password: this.password
        }
      },
      res => {
        if (res.status === 200) {
          this.setUserID(this.userID)
          this.setToken(res.data.token)
          window.sessionStorage.setItem('token', res.data.token)
          this.toggleLoginBlock()
        } else {
          this.passwordError = true
          this.passwordInfo = '用户名或密码错误'
          this.password = ''
        }
      },
      err => {
        this.passwordError = true
        this.passwordInfo = '用户名或密码错误'
        this.password = ''
        console.log(err)
      }
      )
    },
    listenEnter (e) {
      if (e.keyCode === 13) {
        this.$refs.loginBtn.focus()
        this.confirm()
        this.$refs.passwordInput.focus()
      }
    },
    exit () {
      this.toggleLoginBlock()
    }
  },
  mounted () {
    this.$refs.defaultFocus.focus()
    window.addEventListener('keypress', this.listenEnter)
  },
  unmounted () {
    window.removeEventListener('keypress', this.listenEnter)
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    min-height: 100vh;
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
      padding: 0 4rem;
      width: 22rem;
      position: relative;
      background-color: aliceblue;
      border-radius: 0.3rem;
      h3 {
        font-size: 2rem;
        display: flex;
        justify-content: center;
        img {
          width: 3rem;
          height: 3rem;
        }
      }
      div {
        margin-bottom: 1.2rem;
        position: relative;
        input {
          padding: 0.5rem 1.5rem;
          width: 100%;
          border: 0;
          background: transparent;
          border-bottom: 1px solid #666;
          outline: 0;
          font-size: inherit;
          font-family: inherit;
          color: inherit;
        }
        i {
          position: absolute;
          transform: translateY(-1.7rem);
        }
        &.inputError input{
          box-shadow: 0 0 2px 1px rgb(245, 138, 138);
        }
        span {
          color: rgb(243, 82, 82);
          font-size: 0.5rem;
          position: absolute;
          bottom: -0.9rem;
          left: 0;
        }
      }
      .btn {
        outline: 0;
        border: 0;
        margin-bottom: 2rem;
        padding: 0.5rem 1.2rem;
        font-size: 1.2rem;
        font-family: inherit;
        color: inherit;
        background: transparent;
        margin-right: 1rem;
        cursor: pointer;
        &:active {
          box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.1);
          transform: scale(0.98);
        }
      }
    }
  }
</style>
