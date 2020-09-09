<template>
  <div class="home">
    <myNav/>
  </div>
</template>

<script>
// @ is an alias to /src
import myNav from '@/components/nav.vue'

export default {
  name: 'home',
  components: {
    myNav
  }
}
</script>
