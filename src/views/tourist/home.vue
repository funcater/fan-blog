<template>
  <div class="home">
    <myNav active="home"/>
  </div>
</template>

<script>
// @ is an alias to /src
import myNav from '@/components/myNav.vue'

export default {
  name: 'home',
  components: {
    myNav
  }
}
</script>

<style lang="less" scoped>
  .home {
    padding-top: 3rem;
    min-height: 100vh;
  }
</style>
