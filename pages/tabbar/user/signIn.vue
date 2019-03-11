<template>
	<view class="signin-com-content">
		<view>
			<view class="content-item">
				<input
					type="text"
					v-model="signData.userName"
					placeholder="请输入账号"
					placeholder-class="placeholder-class"
				/>
			</view>
			<view :class="['content-item', diff ? 'error-pwd' : '']">
				<input
					type="text"
					password
					v-model="signData.password"
					placeholder="请输入密码"
					placeholder-class="placeholder-class"
				/>
			</view>
			<view :class="['content-item', diff ? 'error-pwd' : '']" v-if="!queryParams.isSignin">
				<input
					type="text"
					password
					v-model="pw"
					placeholder="确认密码"
					placeholder-class="placeholder-class"
				/>
			</view>
			<view class="content-item">
				<button type="primary" @touchend="signinOrUp" plain>
					{{ queryParams.isSignin ? '登录' : '注册' }}
				</button>
			</view>
		</view>
		<view class="switch-sign" @touchend="switchInOrUp">
			<text class="switch-text" v-if="queryParams.isSignin">注册账号</text>
			<text class="switch-text" v-else>已有账号，直接登录</text>
		</view>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			signData: {
				password: '',
				userName: ''
			},
			pw: '',
			diff: false,
			queryParams: {
				isSignin: true
			}
		};
	},
	onLoad(options) {
		console.log(options);
		this.queryParams = options;
	},
	methods: {
		...mapMutations(['setUserInfo']),
		// 校验密码是否一致
		validPwd() {
			uni.get;
			if (this.signData.password !== this.pw) {
				this.diff = true;
				uni.showToast({
					title: '输入的密码不一致',
					icon: 'none'
				});
				return false;
			} else {
				this.diff = false;
				return true;
			}
		},
		//校验必填
		validRequire() {
			if (
				!(
					this.signData.password &&
					(this.pw || this.queryParams.isSignin) &&
					this.signData.userName
				)
			) {
				uni.showToast({
					title: '请输入完所有内容',
					icon: 'none'
				});
				return false;
			} else {
				return true;
			}
		},
		//切换登录或者注册
		switchInOrUp() {
			this.signData = {
				password: '',
				userName: ''
			};
			this.pw = '';
			this.queryParams.isSignin = !this.queryParams.isSignin;
		},
		//执行登录或者注册
		signinOrUp() {
			if (this.queryParams.isSignin) {
				if (this.validRequire()) {
					this.$http('/publicService/login', this.signData, 'POST').then(data => {
						this.setUserInfo(data);
						uni.showToast({
							title: '登录成功'
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 1000);
					});
				}
			} else {
				if (this.validRequire() && this.validPwd()) {
					this.$http('/publicService/addUser', this.signData, 'POST').then(data => {
						this.setUserInfo(data);
						setTimeout(() => {
							uni.navigateBack();
						}, 1000);
					});
				}
			}
		}
	}
};
</script>

<style lang="scss">
.signin-com-content {
	padding: 0 20upx;
	font-size: 26upx;
	display: flex;
	flex-direction: column;
	justify-content: center;

	.content-item {
		flex-basis: 80upx;
		line-height: 80upx;
		border-bottom: 1px solid #444444;

		input {
			height: 80upx;
		}

		&:last-child {
			border-bottom: none;
			margin-top: 60upx;

			button {
				color: #fff;
				border-color: #666666;
				background: #444444;
			}
		}
	}

	.switch-sign {
		text-align: right;
		height: 60upx;
		line-height: 60upx;
		font-size: 24upx;

		.switch-text {
			color: #2f85fc;
		}
	}

	.error-pwd {
		border-bottom: 1px solid red;
	}
}
</style>
