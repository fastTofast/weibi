<template>
	<view class="publish-com-content">
		<view class="content-item">
			<input
				placeholder-class="placeholder-class"
				v-model="article.title"
				class="content-item-input"
				placeholder="点击输入标题"
			/>
		</view>
		<view class="content-item">
			
			<view class="item-two">
				<picker style="width:100%;" mode="selector" :range="kindList" @change="changeKind">
					<view class="kind">
						<view class="kind-item">选择分类 :</view>
						<view class="kind-item">{{ article.kind }}</view>
					</view>
				</picker>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="item-two">
				<view class="switch-title">共享</view>
				<switch
					name="switch"
					v-model="article.shareFlag"
					:checked="article.shareFlag"
					class="cus-switch"
					@change="switchChange"
				/>
			</view>
			<!-- #endif -->
		</view>
		<view class="content-item richtext">
			<textarea
				placeholder="点击输入内容"
				v-model="article.content"
				style="height:560upx;width:100%;padding-top:10upx;"
				:maxlength="600"
				:focus="true"
				placeholder-style="color:#b2b2b2;font-size:26upx;"
			/>
		</view>
		<view class="btn-box">
			<button
				type="primary"
				style="border-color: #444444;color:black;"
				plain="true"
				@touchend="publish"
			>
				{{ modifyFlag ? '确认修改' : '发布' }}
			</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			kindList: ['前端', '后端', 'Nodejs', '服务器'],
			article: {
				kind: '',
				title: '',
				content: '',
				shareFlag: false
			}
		};
	},
	props: ['srcArticle', 'modifyFlag'],
	created() {
		// #ifdef MP-WEIXIN
		this.article.shareFlag = false;
		// #endif
		console.log(this.modifyFlag, this.srcArticle);
		if (this.modifyFlag) {
			this.article = this.srcArticle;
		}
	},
	methods: {
		switchChange(event) {
			this.article.shareFlag = event.target.value;
		},
		changeKind(e) {
			this.article.kind = this.kindList[e.target.value];
		},
		publish() {
			if (this.modifyFlag) {
				this.$http('/service/article/edit', this.article, 'PUT').then(data => {
					uni.showToast({
						title: '更新成功'
					});
				});
			} else {
				this.$http('/service/article/publish', this.article, 'POST').then(data => {
					uni.showToast({
						title: '发布成功'
					});
					this.article = {
						kind: '',
						title: '',
						content: '',
						shareFlag: false
					};
				});
			}
		}
	}
};
</script>

<style lang="scss">
.publish-com-content {
	font-size: 26upx;
	color: #666666;
	display: flex;
	padding: 0 28upx;
	flex-direction: column;

	.content-item {
		flex: 0 1 80upx;
		line-height: 80upx;
		border-bottom: 1px solid #444444;
	}

	.content-item:nth-child(2) {
		display: flex;
		align-items: center;
	}
	.content-item-input,
	.content-item-input input {
		height: 80upx !important;
		line-height: 80upx !important;
	}
	.kind {
		display: flex;

		.kind-item {
			flex-grow: 1;

			&:nth-child(2) {
				flex-grow: 3;
				// 					border-bottom: 1px solid #999999;
				// 					height: 60upx;
			}
		}
	}

	.item-two {
		flex: 1;
	}

	.item-two:last-child {
		display: flex;
	}

	.switch-title {
		margin: 0 auto;
	}

	.richtext {
		flex-grow: 1;
		margin-bottom: 80upx;
	}
	.placeholder-class {
	}
}
</style>
