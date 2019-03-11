<template>
	<view>
		<scroll-view scroll-y class="scroll-content">
			<view class="article-list-content" v-for="(artcle,index) in articles" :key="index">
				<view class="article-item article-title">
					<text>{{artcle.title}}</text>
					<view class="operate-section">
						<uni-icon type="compose" size="30" @touchend="update(artcle._id)"></uni-icon>
						<uni-icon type="trash" size="30" @touchend="deleteArticle()(artcle._id)"></uni-icon>
					</view>
				</view>
				<view class="article-item article-info">
					<text class="info-item">作者: {{artcle.author}}</text>
					<text class="info-item">时间 : {{artcle.creationDate}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articles: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$http('/weibi/service/article/getArticleList').then(data => {
					this.articles = data.result;
				})
			},
			deleteArticle(id) {
				this.$http('/weibi/service/article/delete', {
					id
				}, 'POST').then(data => {
					uni.showToast({
						title: '删除成功'
					})
				})
			},
			update(id) {
				this.$http('/weibi/service/article/edit', {
					id
				}, 'POST').then(data => {
					uni.showToast({
						title: '更新成功'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-content,
		{
		height: 100%;
	}

	.article-list-content {
		display: flex;
		flex-direction: column;
		position: relative;
		// border: 1px solid #666666;
		border-radius: 8upx;
		margin-top: 50upx;
		// box-shadow: 0 0 20px rgba(0, 0, 0, .3), 0 0 40px rgba(0, 0, 0, .1) inset;

		&:after,
		&:before {
			content: '';
			position: absolute;
			z-index: -1;
			background-color: #666666;
			top: 20upx;
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

		.article-title {
			flex: 1 1 60upx;
			color: #444444;
			font-size: 28upx;
			font-weight: 500;
			background-color: #fcfcfd;
		}

		.article-info {
			color: #fcfcfd;
			font-size: 20upx;

			display: flex;
			flex: 1 1 20upx;

			.info-item {
				flex: 1;
				height: 20upx;
				line-height: 20upx;
			}
		}
	}
</style>
