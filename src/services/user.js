import request from '@/utils/request'
import qs from 'qs'
// import store from '@/store'
export const login = data => {
    return request({
        method: 'POST',
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: '/front/user/login',
        // urlencode 格式： 名=值&名=值
        data: qs.stringify(data)
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/front/user/getInfo'
        // headers: {
        //     Authorization: store.state.user.access_token
        // }
    })
}
