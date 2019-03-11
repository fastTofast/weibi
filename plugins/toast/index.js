import toastCom from '../../components/toast.vue'
let vm;
export default {
	install(Vue) {
		if (!vm) {
			const Toast = Vue.extend(toastCom);
			Toast.mpType = 'app'
			vm = new Toast();
			vm.$mount();
		}
		const toast = {
			text(str) {
				vm.content = str;
				vm.showToast = true;
			}
		}
		if (Vue.$cusPlugin) {
			Vue.$cusPlugin.toast = toast;
		} else {
			Vue.$cusPlugin = {toast};
		}
		Vue.mixin({
			created() {
				this.$cusPlugin = Vue.$cusPlugin;
			}
		})
	}
}
