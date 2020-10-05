<template>
  <div class="myFooter">
    <a href="https://github.com/funcater/fan-blog.git" class="code">[code]</a>
    <span class="copyright">Copyright © 2020 fan-blog. All rights reserved.</span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'myFooter'
}
</script>

<style lang="less" scoped>
  .myFooter {
    width: 100%;
    position: relative;
    background: rgb(36, 41, 46);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .code {
    color: #fff;
    padding: 0.4rem;
  }
  .copyright {
    font-size: 0.8rem;
    color: #939393;
    padding-bottom: 0.5rem;
  }
</style>
