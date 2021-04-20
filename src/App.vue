<template>
  <Nav/>
  <div class="max-w-6xl py-12 mx-auto text-center">
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'

export default {
  components: {Nav}
}
</script>
