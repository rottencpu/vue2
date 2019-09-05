<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {
  },
  methods: {
    /**
     * 1.用vue-router重新路由到当前页面，页面是不进行刷新的
     * 2.采用window.reload()，或者router.go(0)刷新时，整个浏览器进行了重新加载，闪烁，体验不好
     */
    reload() { // inject: ['reload'], 注入子组件 进行刷新操作
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
