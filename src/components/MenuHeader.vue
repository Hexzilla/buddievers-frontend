<template>
	<div class="is-centered green-div p-4">
		<div class="columns">
			<div class="column is-1"></div>
			<div class="column is-10">
				<b-navbar spaced close-on-click transparent class="is-centered">
					<template #end>
						<b-navbar-item
							tag="router-link"
							:to="{ path: '/' }"
							class="control-navItem"
						>
							<div style="display: flex">
								<img
									src="img/home 1.png"
									alt="No Image"
									class="home-icon"
								/>
								<p class="font-size-24-white pl-1">HOME</p>
							</div>
						</b-navbar-item>
						<b-navbar-item class="control-navItem">
							<p class="font-size-24-white">BUDDIEVERSE</p>
						</b-navbar-item>

						<b-navbar-item tag="router-link" :to="{ path: '/' }">
							<img
								src="img/B-BUDS 1.png"
								alt="No Image"
								class="brand"
							/>
						</b-navbar-item>

						<b-navbar-item class="control-navItem">
							<p class="font-size-24-white">MARKETPLACE</p>
						</b-navbar-item>
						<b-navbar-item class="control-navItem">
							<p class="font-size-24-white">COFFEE SHOP</p>
						</b-navbar-item>

						<b-navbar-item tag="router-link" :to="{ path: '/' }">
							<img
								src="img/twitter 1.png"
								alt="No Image"
								class="head-icon"
							/>
						</b-navbar-item>
						<b-navbar-item>
							<b-button
								class="font-size-20 pr-4 pl-4 pt-0 pb-0 normal-button"
								>Connect Wallet</b-button
							>
						</b-navbar-item>
					</template>
				</b-navbar>
			</div>
			<div class="column is-1"></div>
		</div>
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
	padding-left: 30px;
	padding-right: 30px;
	@include mobile {
		padding-left: 10px;
		border: none !important;
	}
	border-top: 2px solid white;
	border-bottom: 2px solid white;
	border-radius: 0px !important;
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
	max-height: 50px !important;
	@include mobile {
		max-height: 25px !important;
	}
}

.home-icon {
	max-height: 30px !important;
	@include mobile {
		max-height: 15px !important;
	}
}
</style>
