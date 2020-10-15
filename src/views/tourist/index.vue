<template>
  <div class="wrapper">
    <myNav/>
    <div class="content">
      <personalInfo/>
      <router-view/>
      <recommendInfo/>
    </div>
    <myFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import myNav from '@/components/myNav.vue'
import personalInfo from '@/components/personalInfo.vue'
import recommendInfo from '@/components/recommendInfo.vue'
import myFooter from '@/components/myFooter.vue'

export default {
  name: 'home',
  components: {
    myNav,
    personalInfo,
    recommendInfo,
    myFooter
  }
}
</script>

<style lang="less" scoped>
  .wrapper {
    padding-top: 5rem;
    min-height: calc(100vh - 8.4rem);
    background: rgb(245, 245, 245);
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>
