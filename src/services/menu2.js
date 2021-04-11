import request from '@/utils/request'
export const getEditMenuInfo = (id = -1) => {
    return request({
        method: 'GET',
        // url: '/front/boss/menu/getEditMenuInfo?${id=}'
        url: '/front/boss/menu/getEditMenuInfo?',
        params: {
            id
        }
    })
}

// export default{
// }
