<template>
	<view class="home-content">
		<view class="content-bar">
			<view
				:class="['bar-item', tabIndex === index ? 'active-tab' : '']"
				v-for="(item, index) in tabNames"
				@click="changeTab(index)"
				:key="index"
			>
				{{ item.name }}
			</view>
		</view>
		<!-- <button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo">HHHHH</button> -->
		<swiper :current="tabIndex" class="home-swiper" @change="changeSwiper">
			<swiper-item class="home-swiper-item" v-for="(kind, index1) in tabNames" :key="index1">
				<!-- <view class="swiper-item" > -->
				<scroll-view scroll-y class="scroll-content">
					<view
						class="article-list-content"
						v-for="(article, index2) in kindList[tabIndex]"
						:key="index2"
					>
						<view class="article-item article-title-section">
							<text class="article-title">{{ article.title }}</text>
							<view class="operate-section" v-if="tabIndex === 3">
								<uni-icon
									class="operate-icon"
									type="compose"
									size="26"
									@click="update(article)"
								></uni-icon>
								<uni-icon
									class="operate-icon"
									type="trash"
									size="26"
									@click="deleteArticle(article._id, index2)"
								></uni-icon>
							</view>
						</view>
						<view class="article-body">
							<text>{{ article.content }}</text>
						</view>
						<view class="article-item article-info">
							<text class="info-item">作者: {{ article.author }}</text>
							<text class="info-item">时间 : {{ article.creationDate }}</text>
						</view>
					</view>
				</scroll-view>
				<!-- </view> -->
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			tabNames: [
				{
					name: '最新',
					code: 'latestList'
				},
				{
					name: '热门',
					code: 'hotList'
				},
				{
					name: '关注',
					code: 'attention'
				},
				{
					name: '我的',
					code: 'attention'
				}
			],
			kindList: []
		};
	},
	created() {
		this.kindList = this.tabNames.map(n => []);
	},
	onShow() {
		this.getList(this.tabIndex);
	},
	computed: {
		...mapState(['tabIndex'])
	},
	methods: {
		...mapMutations(['setTabIndext', 'setArticleToModify']),
		getuserinfo(data) {
			console.log(data);
		},

		changeSwiper(event) {
			let { current: current, source: source } = event.detail;
			if (source === 'touch') {
				this.changeTab(current);
			}
		},
		changeTab(index) {
			this.getList(index);
			this.setTabIndext(index);
		},
		getList(index) {
			let url = '';
			if (index === 3 || index === 2) {
				url = '/service/article/list';
			} else {
				url = '/publicService/article/list';
			}
				this.$http(url, {
					type: this.tabNames[index].code
				}).then(data => {
			// setTimeout(() => {
				this.$nextTick(function(){
					this.kindList.splice(index, 1, data.result);
				})
			// }, 400);
				});
		},
		deleteArticle(id, index) {
			this.$http(
				'/service/article/delete',
				{
					id
				},
				'DELETE'
			).then(data => {
				uni.showToast({
					title: '删除成功'
				});
				this.kindList[this.tabIndex].splice(index, 1);
			});
		},
		update(article) {
			this.setArticleToModify(article);
			uni.navigateTo({
				url: '/pages/tabbar/publish/modify'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home-content {
	height: 100%;
	padding: 0 10px;
	display: flex;
	flex-direction: column;
	background-color: #f7f7f7;
	align-items: center;
	.active-tab {
		color: #444444;
		font-weight: 600;
		font-size: 18px !important;
		border-bottom: 1px solid #444444;
	}
	/* #ifndef H5 */
	.home-swiper {
		height: calc(100% - 60upx);
	}

	/* #endif */

	.content-bar {
		width: 100%;
		display: flex;
		flex: 0 0 auto;
		height: 60upx;
		line-height: 60upx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.content-item:last-child {
		flex: 0 0 200upx;
		background-color: #ff2672;
	}

	.bar-item {
		flex: 1 0 auto;
		text-align: center;
		font-size: 26upx;
	}

	.home-swiper {
		flex: 1 0 auto;
		width: 100%;
		padding-top: 60upx;
		box-sizing: border-box;
	}

	.scroll-content {
		height: 100%;
	}

	.hover-class {
		background-color: aliceblue;
	}

	.article-list-content {
		display: flex;
		flex-direction: column;
		position: relative;
		// border: 1px solid #666666;
		border-radius: 8upx;
		padding-top: 50upx;

		// box-shadow: 0 0 20px rgba(0, 0, 0, .3), 0 0 40px rgba(0, 0, 0, .1) inset;
		&:last-child {
			margin-bottom: 60upx;
		}

		&:after,
		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			background-color: #666666;
			top: 60upx;
			bottom: 0;
			left: 11px;
			right: 11px;
			-webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
		}

		.article-item {
			align-items: flex-end;
			padding: 10upx;
			background-color: #666666;
		}

		.article-title-section {
			flex: 1 1 auto;
			height: 38upx;
			// max-height: 70upx;
			overflow-y: hidden;
			color: #444444;
			font-size: 30upx;
			font-weight: 500;
			background-color: #fcfcfd;
			display: flex;
			align-items: flex-start;

			// padding:30upx 10upx;
			.article-title {
				flex: 1 1 auto;
			}

			.operate-section {
				flex: 0 0 120upx;
				width: 120upx;
				display: flex;
				align-self: center;
				justify-content: space-between;
			}
		}

		.article-body {
			font-size: 22upx;
			text-indent: 50upx;
			max-height: 310upx;
			overflow-y: hidden;
			padding: 10upx;
			color: #777777;
			background-color: #fcfcfd;

			span {
				max-height: 310upx;
				overflow-y: hidden;
			}
		}

		.article-info {
			color: #fcfcfd;
			font-size: 20upx;
			display: flex;
			justify-content:space-between;
			.info-item {
				height: 20upx;
				line-height: 20upx;
			}
		}
	}
}
</style>
