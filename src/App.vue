<template>
  <login class="login" v-if="showLoginBlock"/>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import login from '@/components/login.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    login
  },
  computed: {
    ...mapState(['showLoginBlock'])
  },
  methods: {
    ...mapActions(['getArticles'])
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
  .login {
    position: absolute;
    z-index: 99;
    width: 100%;
  }
</style>
