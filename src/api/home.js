import { fetch } from '@/http/index.js'

export default {
  // 获取列表数据
  getList () {
    return fetch.get('/list')
  }
}
