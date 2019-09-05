<template>
  <div>
    <h-header title="首页" left-arrow @back="goBack" />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    'h-header': Header
  },
  data() {
    return {

    }
  },
  methods: {
    goBack: function() {
      console.log('123')
    }
  }
}
</script>
