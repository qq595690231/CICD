import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
// qs转换为后台识别的json库
import qs from 'qs'
const request = axios.create({
    timeout: 2000
    // baseURL:
    // headers:
})
//  设函数判断是前台front.还是后台boss/
function getBaseURL (url) {
    if (url.startsWith('/boss')) {
        return 'http://eduboss.lagou.com'
    } else {
        return 'http://edufront.lagou.com'
    }
}
// interceptors拦截器config接收    access_token鉴权信息
// 鉴权Authorization服务器发现配置了http auth，然后检查request里面有没有"Authorization"的http header
request.interceptors.request.use(function (config) {
    config.baseURL = getBaseURL(config.url)
    const { user } = store.state
    if (user && user.access_token) {
        config.headers.Authorization = user.access_token
    }
    return config
})

function redirectlogin () {
    router.push({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

let isRefreshing = false
// 存储等待Token刷新而挂起的请求
// let request = []
// 响应拦截器
request.interceptors.response.use(function (response) {
    // console.log('响应成功', response)
    return response
  }, function (error) {
    if (error.response) {
        // 请求发送成功，响应接收完毕，状态码为失败
        // 1、判断失败的状态码情况（主401）
        const { status } = error.response
        let errorMessage = ''
        if (status === 400) {
            errorMessage = '请求参数错误'
        } else if (status === 401) {
            // 1.无Token信息
            if (!store.state.user) {
                redirectlogin()
                return Promise.reject(error)
            }
            if (isRefreshing) {
                return request.push(() => {
                    request(error.config)
                })
            }
            isRefreshing = true
            // 2.Token无效（错误 Token，过期 Token）
            return request({
                method: 'POST',
                url: '/front/user/refresh_token',
                data: qs.stringify({
                    refreshtoken: store.state.user.refresh_token
                })
            }).then(res => {
                if (res.data.state !== 1) {
                    // 清除无效用户信息
                    store.commit('setUser', null)
                    redirectlogin()
                    return Promise.reject(error)
                }
                // Token被改重新发送更改用户信息，setUser为存储的用户信息
                store.commit('setUser', res.data.content)
                // return request(error.config)
                // 重新发送失败的请求
                request.forEach(callback => callback())
                // 发送完毕，清除request内容即可
                // request = []
                return Promise.reject(error)
            }).catch(() => {
                store.commit('setUser', null)
                redirectlogin()
                return Promise.reject(error)
            }).finally(() => {
                // 请求发送完毕，响应处理完毕，改刷新状态
                isRefreshing = false
            })
        } else if (status === 403) {
            errorMessage = '没有权限请联系管理员'
        } else if (status === 404) {
            errorMessage = '请求资源不存在'
        } else if (status >= 500) {
            errorMessage = '服务端错误'
        }
        Message.error(errorMessage)
      } else if (error.request) {
        // 请求发送成功但未收到响应
        Message.error('请求超时，请重试')
      } else {
        // 意外错误
        Message.error(error.message)
      }
    //   将本次请求错误error对象继续抛出，让接收响应的处理请求函数进行操作
    return Promise.reject(error)
  })

export default request
// axios.get()
// axios.post()
// axios({
//   method: '..'
// })
