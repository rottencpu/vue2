<template>
  <div class="header__bg">
    <div v-if="leftArrow" class="back" @click="back">返回</div>
    <div class="title">{{ title }}</div>
    <div class="other">其他</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    leftArrow: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    back: function() {
      this.$emit('back')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/config.scss';

.header__bg{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  padding: 0 15px;
  height: 49px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  position: relative;
  .back,
  .other{
    font-size: 18px;
    width: 40px;
    text-align: center;
    color: $blue;
  }
  .title {
    font-size: 20px;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
