<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// 请求测试
// import request from '@/utils/request'

// request({
//   method: 'Get',
//   // url: '/front/ad/getAdList'
//   url: '/boss/v2/api-docs?group=edu-boss-boot'
// }).then(res => {
//   console.log(res)
// })

export default {
  name: 'App'
}
</script>
<style lang="scss">
  // @import '~@/styles/variables.scss';    vue.config.js全局已配置
</style>
