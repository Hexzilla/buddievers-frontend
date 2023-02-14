<template>
	<div class="is-centered final-div p-4 pt-0">
		<div class="columns pt-6 pb-6">
			<div class="column">
				<p class="font-size-64-white mb-3">STAY TUNED</p>
				<div>
					<b-input placeholder="Email address" type="email">
					</b-input>
					<!-- <div class="green-div">
							<img
								src="img/Arrow 1.png"
								alt="No Image"
								class="footer-img"
							/>
						</div> -->
				</div>
			</div>
			<div class="column has-text-centered footer-img">
				<img src="img/B-BUDS 2.png" alt="No Image" class="footer-img" />
			</div>
			<div class="column is-centered">
				<div class="columns is-mobile">
					<div class="column is-5"></div>
					<div class="column is-3">
						<div class="footer-icon-div-position">
							<a href="" target="_blank" rel="noopener noreferrer">
								<img src="img/twitter white 1.png" alt="No Image" class="footer-icon-img" />
							</a>
						</div>
					</div>
					<div class="column is-3">
						<div class="footer-icon-div-position">
							<a href="" target="_blank" rel="noopener noreferrer">
								<img src="img/discord white 1.png" alt="No Image" class="footer-icon-img" />
							</a>
						</div>
					</div>
					<div class="column is-1"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class MenuHeader extends Vue { }
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

.final-div {
	background: #000000;
}

.footer-img {
	height: 150px;

	@include mobile {
		display: none;
	}
}

.footer-icon-img {
	height: 80px;

	@include mobile {
		height: 30px;
	}
}

.footer-icon-div-position {
	margin-top: 12vh;
}
</style>
