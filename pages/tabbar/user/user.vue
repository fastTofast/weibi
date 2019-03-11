<template>
	<view class="user-com-content">
		<view class="user-content-item"></view>
		<view class="user-card">
			<view class="user-card-item">
				<view class="user-pic">
					<image
						src="../../../static/img/user.jpg"
						style="width: 100%;height:100%;"
					></image>
				</view>
				<view class="user-info">
					<text class="name">{{ userInfo.userName }}</text>
					<view class="sign-content">
						<input
							style="border-bottom:1px solid #444444;"
							type="text"
							:auto-focus="true"
							placeholder="输入签名"
							v-if="editInfo"
							v-model="signStr"
							@blur="updateUserInfo"
						/>
						<text class="user-sign" v-else>{{ userInfo.signStr }}</text>
						<uni-icon
							type="compose"
							v-if="userInfo.userName"
							size="24"
							@click="editInfo = true"
						></uni-icon>
					</view>
				</view>
			</view>
			<view class="user-card-item">
				<text class="link-style" @touchend="showPage(3)">我的笔记</text>
				<text class="link-style">我的信息</text>
			</view>
		</view>
		<view class="user-content-item">
			<view class="section-content">
				<view class="section" @touchend="mark">
					<text class="section-text">我的收藏</text>
					<uni-icon type="forward" color="#999999"></uni-icon>
				</view>
				<view class="section" @touchend="showPage(2)">
					<text class="section-text">我的关注</text>
					<uni-icon type="forward" color="#999999"></uni-icon>
				</view>
				<view class="section" @touchend="updatePwd">
					<text class="section-text">修改密码</text>
					<uni-icon type="forward" color="#999999"></uni-icon>
				</view>
				<view class="section" @touchend="aboutus">
					<text class="section-text">关于我们</text>
					<uni-icon type="forward" color="#999999"></uni-icon>
				</view>
				<view class="section">
					<button
						type="primary"
						style="background-color: #f15f5f;width:100%;"
						@touchend="exit"
					>
						{{ userInfo.userName ? '退出登录' : '去登录' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			editInfo: false,
			signStr: '',
			title: 'Hello'
		};
	},
	computed: {
		...mapState(['userInfo'])
	},
	methods: {
		...mapMutations(['setTabIndext', 'setUserInfo']),
		showPage(index) {
			this.setTabIndext(index);
			uni.switchTab({
				url: '/pages/tabbar/home/home'
			});
		},
		mark() {
			uni.showToast({ title: '暂未开放', icon: 'none' });
		},
		updatePwd() {
			uni.showToast({ title: '暂未开放', icon: 'none' });
		},
		aboutus() {
			uni.showToast({ title: '欢迎指正', icon: 'none' });
		},
		login() {
			uni.navigateTo({
				url: '/pages/tabbar/user/signIn?isSignin=true',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		updateUserInfo() {
			this.$http('/service/article/updatePwd', { signStr: this.signStr }, 'PUT').then(
				data => {
					this.editInfo = false;
					let user = Object.assign(this.userInfo, { signStr: this.signStr });
					this.setUserInfo(user);
				}
			);
		},
		exit() {
			if (this.userInfo && this.userInfo.userName) {
				this.$http('/publicService/logout', {}, 'PUT').then(data => {
					uni.setStorageSync('cookie', '');
					this.setUserInfo({});
					uni.showToast({
						title: '成功'
					});
				});
			} else {
				uni.navigateTo({
					url: '/pages/tabbar/user/signIn?isSignin=true'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.user-com-content {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	font-size: 32upx;
	color: #444444;

	.user-content-item {
		width: 100%;

		&:first-child {
			flex: 0 0 auto;
			background-color: #444444;
			height: 260upx;
		}

		&:last-child {
			flex: 1 1 auto;
			padding: 150upx 20upx 0;
		}
		.section-content {
			padding: 0 60upx;
		}

		.section {
			width: 100%;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&:last-child {
				padding-top: 20upx;
				border-bottom: none;
			}

			.section-text {
				height: 120upx;
				line-height: 120upx;
			}
		}
	}

	&:after,
	&:before {
		content: '';
		height: 240upx;
		width: 630upx;
		position: absolute;
		z-index: 1;
		margin: 0 auto;
		background-color: #f00;
		top: 170upx;
		bottom: 0;
		border-radius: 12upx;
		left: 0;
		right: 0;
		-webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
	}

	.user-card {
		font-size: 28upx;
		height: 250upx;
		width: 660upx;
		position: absolute;
		top: 160upx;
		left: 50%;
		transform: translateX(-50%);
		margin: 0 auto;
		z-index: 2;
		border-radius: 12upx;
		background-color: #f15f5f;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

		.user-card-item {
			color: #444444;
			width: 100%;
			display: flex;
			flex: 1 0 auto;
			align-items: center;
			box-sizing: border-box;

			.user-pic {
				padding: 0 20upx;
				margin-right: 10upx;
				flex: 0 0 100upx;
				height: 100upx;
			}

			.user-info {
				flex: 1 0 150upx;
				width: 150upx;
				display: flex;
				height: 100upx;
				flex-direction: column;
				justify-content: space-around;
				.sign-content {
					display: flex;
					align-items: center;
					justify-content: flex-start;
				}
			}

			.name {
				font-weight: 600;
			}

			.user-sign {
				font-size: 20upx;
				color: #555555;
			}

			&:last-child {
				align-items: center;
				justify-content: space-around;
			}

			.link-style {
				text-decoration: underline;
			}
		}
	}
}
</style>
