<template>
	<div class="is-centered green-div p-4">
		<b-navbar spaced close-on-click transparent class="is-centered">
			<template #end>
				<b-navbar-item
					tag="router-link"
					:to="{ path: '/' }"
					class="control-navItem"
				>
					<!-- <b-button type="is-ghost" class="font-size-18-white" icon-left="github-circle">
							Add
						</b-button> -->
					<div style="display: flex">
						<img
							src="img/home 1.png"
							alt="No Image"
							class="home-icon"
						/>
						<p class="font-size-32-white pl-1">HOME</p>
					</div>
				</b-navbar-item>
				<b-navbar-item class="control-navItem">
					<p class="font-size-32-white">BUDDIEVERSE</p>
				</b-navbar-item>

				<b-navbar-item tag="router-link" :to="{ path: '/' }">
					<img src="img/B-BUDS 1.png" alt="No Image" class="brand" />
				</b-navbar-item>

				<b-navbar-item class="control-navItem">
					<p class="font-size-32-white">MARKETPLACE</p>
				</b-navbar-item>
				<b-navbar-item class="control-navItem">
					<p class="font-size-32-white">COFFEE SHOP</p>
				</b-navbar-item>

				<b-navbar-item tag="router-link" :to="{ path: '/' }">
					<img
						src="img/twitter 1.png"
						alt="No Image"
						class="head-icon"
					/>
				</b-navbar-item>
				<b-navbar-item class="control-navItem">
					<b-button
						class="font-size-21 pr-4 pl-4 pt-0 pb-0 normal-button"
						>Connect Wallet</b-button
					>
				</b-navbar-item>
			</template>
		</b-navbar>
	</div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueMetamask from 'vue-metamask';

@Component({
	components: {
		VueMetamask,
	},
})
export default class MenuHeader extends Vue {}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

.control-navItem {
	padding-left: 25px;
	@include mobile {
		padding-left: 10px;
	}
}

.green-div {
	background: #016b43;
}

.brand {
	max-height: 120px !important;
	@include mobile {
		max-height: 60px !important;
	}
}

.head-icon {
	max-height: 40px !important;
	@include mobile {
		max-height: 20px !important;
	}
}

.home-icon {
	max-height: 40px !important;
	@include mobile {
		max-height: 20px !important;
	}
}
</style>
