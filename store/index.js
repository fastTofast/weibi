import vue from 'vue'
import Vuex from 'vuex'
vue.use(Vuex)
const Store = new Vuex.Store({
	state: {
		showToast: false,
		tabIndex: 0,
		articleToModify: {},
		userInfo: {}
	},
	mutations: {
		setShowToast(state, data) {
			state.showToast = data;
		},
		setTabIndext(state, data) {
			state.tabIndex = data;
		},
		setArticleToModify(state, data) {
			state.articleToModify = data;
		},
		setUserInfo(state, data) {
			state.userInfo = data;
		}
	}
})
export default Store;
