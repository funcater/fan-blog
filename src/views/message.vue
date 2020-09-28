<template>
  <div class="message">
    <myNav active="message"/>
  </div>
</template>

<script>
// @ is an alias to /src
import myNav from '@/components/myNav.vue'

export default {
  name: 'message',
  components: {
    myNav
  }
}
</script>

<style lang="less" scoped>
  .message {
    padding-top: 3rem;
    min-height: 100vh;
  }
</style>
