<template>
  <div class="myNav">
    <router-link to="/" class="fl">
      <img src="../assets/images/logo.png" alt="">
    </router-link>
    <div class="nav fl" ref="nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/message">留言</router-link>
    </div>
    <div class="userBlock fr">
      <div class="userDetail" v-if="userID">
        <span>{{`欢迎 ${userID} ! `}}</span>
        <a class="exit" @click="logout">退出</a>
      </div>
      <a v-else @click="toggleLoginBlock">登录</a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'myNav',
  computed: {
    ...mapState(['userID'])
  },
  methods: {
    ...mapMutations(['toggleLoginBlock', 'setUserID', 'setToken']),
    logout () {
      this.setUserID()
      this.setToken()
      // this.$router.push({ name: '/index' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .myNav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    background-color: rgb(36, 41, 46);
    padding: 0 3rem;
    text-align: center;
    a img {
      width: 2rem;
      height: 2rem;
      margin-top: 0.5rem;
      background-color: #fff;
      border-radius: 50%;
    }
    .nav {
      display: flex;
      padding: 0 1rem;
      a {
        padding: 0 1rem;
        color: #fff;
        &.router-link-active {
          color: orange;
        }
      }
    }
    .userBlock {
      span {
        color: orange;
      }
      a {
        cursor: pointer;
        color: #fff;
      }
    }
  }
</style>
