<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.placeholder-class {
		color: #b2b2b2;
	}

	uni-page-body {
		height: 100%;
	}

	page {
		height: 100%;
	}

	div {
		-webkit-overflow-scrolling: touch;
	}
</style>
