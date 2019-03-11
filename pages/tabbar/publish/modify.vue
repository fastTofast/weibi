<template>
	<Modify :modifyFlag="true" :srcArticle="articleToModify"></Modify>
</template>

<script>
import Modify from '../../../components/addOrEdit.vue';
import { mapState } from 'vuex';
export default {
	components: {
		Modify
	},
	computed: {
		...mapState(['articleToModify'])
	}
};
</script>
