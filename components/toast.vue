<template>
	<view class="toast" v-if="showToast">
		<text class="content">{{content||'test'}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				showToast: false
			}
		},
		props: ['text'],
		watch: {
			text() {
				this.content = text;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.toast {
		display: flex;
		justify-content: center;

		.content {
			flex: 0 0 260upx;
			margin: auto;
			color: #ffffff;
			height: 80upx;
			line-height: 80upx;
			border-radius: 8upx;
			text-align: center;
			opacity: 0.8;
			background-color: #333333;
		}
	}
</style>
