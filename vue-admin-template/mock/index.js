import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'
import deployApi from './deploy'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// User
Mock.mock(/\/user\/login/, 'post', userAPI.login)
Mock.mock(/\/user\/info/, 'get', userAPI.getInfo)
Mock.mock(/\/user\/logout/, 'post', userAPI.logout)
Mock.mock(/\/deploy\/getUcdDeployPie/, 'get', deployApi.pie)
Mock.mock(/\/deploy\/getUcdDeployChart/, 'get', deployApi.chart)
Mock.mock(/\/deploy\/getUcdDeployList/, 'post', deployApi.list)
Mock.mock(/\/deploy\/getUcdDeployList/, 'get', deployApi.list)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

export default Mock
