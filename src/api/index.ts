import request from '@/utils/request'
import { photoParamsType } from './index.d'

// 壁纸
export function getPhotos(params: photoParamsType) {
  return request({
    url: '360bizhi',
    method: 'get',
    params
  })
}

// // 疫情数据
// export function cov19(data) {
//   return request({
//     url: 'epidemic',
//     method: 'post',
//     data: qs.stringify(data)
//   })
// }