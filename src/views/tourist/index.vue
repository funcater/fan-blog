<template>
  <div class="wrapper">
    <myNav/>
    <router-view/>
    <myFooter/>
  </div>
</template>

<script>
// @ is an alias to /src
import myNav from '@/components/myNav.vue'
import myFooter from '@/components/myFooter.vue'

export default {
  name: 'home',
  components: {
    myNav,
    myFooter
  }
}
</script>

<style lang="less" scoped>
  .home {
    padding-top: 3rem;
    min-height: calc(100vh - 3.4rem);
  }
</style>
