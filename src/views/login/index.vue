<template>
  <div class="login">
    <el-form ref="form"
    :model="form"
    label-width="80px"
    label-position='top'
    :rules="rules"
    >
      <el-form-item
      label="手机号"
      prop="phone">
      <el-input v-model = "form.phone"></el-input>
      </el-form-item>
      <el-form-item
      label="密码"
      prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
         ></el-input>
      </el-form-item>
      <el-form-item>
          <!-- vue 的加载库:loading -->
        <el-button
          type="primary"
          :loading="isloginloading"
          @click="onSubmit"
          >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from '@/utils/request'
// import qs from 'qs'
import { login } from '@/services/user'
export default {
    name: 'LoginIndex',
    data () {
        return {
            form: {
                phone: '18201288771',
                password: '111111'
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 18, message: '密码长度为6-18位', trigger: 'blur' }
                ]
            },
                isloginloading: false
        }
    },
    methods: {
        async onSubmit () {
            try {
                // 1.设置校验   validate表单验证 $refs获取dom元素
                // 发起请求验证表单
                await this.$refs.form.validate()
                this.isloginloading = true
                // 再发起请求
                const { data } = await login(this.form)
                this.isloginloading = false
                // 响应处理
                if (data.state === 1) {
                    // $message VUE封装的提示框（success,error,warning）
                    this.$message.success('登录成功')
                    // 将用户信息存储到 vuex中
                    this.$store.commit('setUser', data.content)
                    // 根据存储的redirect数据进行跳转设置,
                    this.$router.push(this.$route.query.redirect || '/')
                } else {
                    this.$message.error(data.message)
                }
            } catch (err) {
                // 设置校验失败提示
                // console.log('没通过')
            }
        }
    }
}
</script>

<style>
.login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-form{
    background-color: #fff;
    padding: 30px;
    border-radius: 10px;
}
.el-button{
    width: 100%;
}
</style>
