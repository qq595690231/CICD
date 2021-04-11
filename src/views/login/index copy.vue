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
            // dispatch派遣/执行  第一个actions，第二个要给actons传递的载荷（数据）
            this.$store.dispatch('jiaHandle', { count: 5, delay: 2000 })
            this.$store.dispatch('jiaHandle', { count: 2, delay: 1000 })
            this.$store.dispatch('jiaHandle', { count: 1, delay: 500 })
            // this.$store.commit('jia', {
            //     count: 5,
            //     delay: 2000
            // })
            // this.$store.commit('jia', {
            //     count: 2,
            //     delay: 1000
            // })
            // this.$store.commit('jia', {
            //     count: 1,
            //     delay: 500
            // })
            // this.$refs.form.validate(valid => {})
            try {
                // 1.设置校验
                await this.$refs.form.validate()
                this.isloginloading = true
                // const { data } = await request({
                //     method: 'POST',
                //     // headers: { 'content-type': 'application/x-www-form-urlencoded' },
                //     url: '/front/user/login',
                //     // urlencode 格式： 名=值&名=值
                //     data: qs.stringify(this.form)
                // })
                const { data } = await login(this.form)
                this.isloginloading = false
                // console.log(data)
                // 响应处理
                if (data.state === 1) {
                    this.$router.push({
                        name: 'home'
                    })
                    // $message VUE封装的提示框（success,error,warning）
                    this.$message.success('登录成功')
                } else {
                    this.$message.error(data.message)
                }
            } catch (err) {
                // 设置校验失败提示
                console.log('没通过')
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
