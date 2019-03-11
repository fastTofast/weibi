import Vue from 'vue'
import App from './App'
import http from './plugins/http'
import store from './store'
import uniIcon from "@dcloudio/uni-ui/lib/uni-icon/uni-icon.vue"
Vue.component('uni-icon', uniIcon)
// const Mock = require('mockjs')
Vue.config.productionTip = false
// Mock.mock(/\/publicService\/allArticle/,[{},{}])
Vue.use(http)
Vue.prototype.$store = store;
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
