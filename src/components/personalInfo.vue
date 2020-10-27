<template>
  <div class="personalInfo">
    <div class="portrait">
      <img src="../assets/images/portrait.jpg" alt="">
    </div>
    <div class="info">
      <div class="iconfont icon-user">{{user.userName}}</div>
      <div class="iconfont icon-location">{{user.address}}</div>
      <div class="iconfont icon-email">{{user.email}}</div>
      <a :href="user.code" class="iconfont icon-code">博客源码</a>
    </div>
    <button class="btn" @click="goToMessage">留言</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        userName: '张帆',
        address: '福建省厦门市',
        email: '2920998599@qq.com',
        code: 'https://github.com/funcater/fan-blog.git'
      }
    }
  },
  methods: {
    goToMessage () {
      this.$router.push({ name: 'message' })
    }
  }
}
</script>

<style lang="less" scoped>
.personalInfo {
  background: #fff;
  width: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
  border-radius: 0.2rem;
  .portrait {
    position: relative;
    top: -2.5rem;
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1);
    img {
      width: 8rem;
    }
  }
  .info {
    transform: translateY(-1rem);
    width: 80%;
    * {
      height: 1.5rem;
      line-height: 1.5rem;
      font-size: 0.8rem;
      &::before {
        top: 0.18rem;
        position: relative;
      }
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
    &:hover {
      background: rgb(255, 102, 0);
    }
    &:active {
      transform: translateY(0.05rem);
    }
  }
}
</style>
