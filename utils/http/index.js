import {
	baseUrl
} from '../utils'
export function setCookie(res) {
	console.log(res)
	let cookie = res.header['Set-Cookie'];
	if (cookie) {
		let info = cookie.match(/(vuid=\w+;)|(auth=\w+;)|(vuser=\w+;)/g);
		uni.setStorageSync('cookie', info ? info.join('') : '');
	}
}
export default function $http(options) {
	let _options = {
		url: '',
		method: 'GET',
		withCredentials: true,
		header: {
			'cookie': uni.getStorageSync('cookie'),
		}
	}
	if (typeof options === 'object') {
		_options = Object.assign(_options, options)

	} else {
		let args = arguments;
		let params = {
			url: args[0],
			data: args[1],
			method: args[2] || 'GET'
		}
		_options = Object.assign(_options, params);
	}
	//控制是否显示loading,默认显示
	if (_options.noLoading) {
		uni.hideLoading();
	} else {
		uni.showLoading({
			title: '加载中'
		});
	}
	_options.url = baseUrl + _options.url;
	// vuid=8e3c654ad29699760973bd35fc7aa3c2;auth=4ef367e31ecc289d85ca83f5c3e22f74;vuser=test;
	return new Promise((resolve, reject) => {
		_options.success = function(res) {
			console.log('success : ', res);
			uni.hideLoading();
			// 业务中定义的错误
			if (res.statusCode === 200) {
				if (res.data.code === 'S') {
					// #ifndef H5
					setCookie(res)
					// #endif
					resolve(res.data.data);
				} else {
					if (res.data.code === '-1000') {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							confirmColor: '#f75543',
							success(res) {
								if (res.confirm) {
									// 自动跳转登录页面
									uni.navigateTo({
										url: '/pages/tabbar/user/signIn?isSignin=true'
									})
									// #ifndef H5
									// 									uni.login({
									// 										provider: 'weixin',
									// 										success(loginRes) {
									// 											console.log(loginRes);
									// 											uni.getUserInfo({
									// 												provider: 'weixin',
									// 												success: function(infoRes) {
									// 													console.log('用户昵称为：' + infoRes.userInfo.nickName);
									// 												},
									// 												fail(e) {
									// 													console.log('getUserInfo-fail:', e);
									// 												}
									// 											});
									// 										},
									// 										fail(e) {
									// 											console.log(e);
									// 										}
									// 									})
									// #endif
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg
						})
					}
				}
			} else {
				// 系统报错
				uni.showModal({
					title: '提示',
					content: res.statusCode + ' ' + res.data,
					showCancel: false,
					confirmColor: '#222222'
				});
				reject(res);
			}
		};
		_options.fail = function(e) {
			uni.hideLoading();
			uni.showModal({
				title: '提示',
				content: e.errMsg,
				showCancel: false,
				confirmColor: '#222222'
			});
			reject(e);
		};
		setTimeout(() => {
			uni.request(_options);
		}, 100)
	})
}
