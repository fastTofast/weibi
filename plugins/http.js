import http from '../utils/http'
export default {
	install(Vue) {
		Vue.prototype.$http = http;
		Vue.mixin({
			created() {
				this.$http = http;
			},
		})
	}
}
