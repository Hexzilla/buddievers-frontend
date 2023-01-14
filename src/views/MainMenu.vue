<template>
	<div class="home main-menu min-h-full">
		<div class="is-centered first-div p-6 columns">
			<!-- <b-image
				src="Buddies index image 1.png"
				alt="Gromlin NFTs"
				ratio="1by1"
			></b-image> -->
			<div class="column is-2"></div>

			<div class="column is-8">
				<img src="Buddies index image 1.png" alt="No Image" />
			</div>
			<div class="column is-2"></div>
		</div>
		<div class="is-centered has-text-centered columns">
			<div class="column is-6 p-6">
				<p class="font-size-120">ABOUT</p>
				<p class="font-size-48 mt-4">
					An NFT project building the utopia.
				</p>
				<p class="font-size-28 mt-4">
					Launched in April 2022, BUDDIES quickly evolved into one of
					the most successful collections on Kusama Network with just
					50 NFTs.
				</p>
				<p class="font-size-28 mt-3">
					BUDDIES have built a solid economic backing by collecting
					assets and through Alpha Trading, thereby proving that it is
					one of the most successful NFT collections in the Polkadot
					ecosystem. BUDDIES have 6 core value propositions: Art,
					Value, Utility, Profitability, Education & Fun.
				</p>
				<p class="font-size-28 mt-3">
					Now, we are working toward our multi-chain future as we will
					debut our second generation NFT collection on Moonsama
					network. Moonbuddies is the final generation of the BUDDIES
					NFT collection, but just the beginning for our community
					goals.
				</p>
				<div class="columns mt-6 mb-6 is-mobile">
					<div class="column is-1"></div>
					<div class="column small-div ml-3">
						<p class="font-size-50-white">50</p>
						<p class="font-size-32-white">NFTs</p>
					</div>

					<div class="column is-1"></div>
					<div class="column small-div">
						<p class="font-size-50-white">36</p>
						<p class="font-size-18-white">UNIQUE HOLDERS</p>
					</div>

					<div class="column is-1"></div>
					<div class="column small-div mr-3">
						<p class="font-size-50-white">+800</p>
						<p class="font-size-18-white">$KSM VOLUME</p>
					</div>

					<div class="column is-1"></div>
				</div>
			</div>
			<div class="column is-6 p-0">
				<img src="BUDDIE28 1.png" alt="No Image" />
				<!-- <b-image
					src="BUDDIE28 1.png"
					alt="Gromlin NFTs"
					ratio="2616by2949"
				/> -->
			</div>
		</div>

		<div class="is-centered p-6">
			<p class="font-size-120 mt-6 has-text-centered">UTILITY</p>
			<div class="columns mt-6">
				<div class="column is-6">
					<p class="font-size-70">
						Into the <br />
						Buddieverse
					</p>
					<p class="font-size-32 mt-4">
						Our own 3D metaverse full of fun and utility. <br />
						Walk into Buddieverse, play games, buy composable NFTs,
						learn in the University, read our official comic in the
						kiosk, bet in the Casino, promote your business on the
						billboards or even order your own building. You can do
						everything in Buddies St.
					</p>
				</div>
				<div class="column is-6">
					<img src="buddieverse-promo 1.png" alt="No Image" />
				</div>
			</div>
		</div>

		<div class="is-centered first-div">
			<div class="columns m-6">
				<div class="column is-6 ml-6">
					<p class="font-size-120-white mt-2">BUDDIES COMIC</p>
					<p class="font-size-60">Incredible stories every month!</p>
					<b-button
						class="font-size-50 mt-5 read-button pr-6 pl-6 pt-0 pb-0 mb-6"
						>READ</b-button
					>
				</div>
				<div class="column is-6" style="position: absolute">
					<img
						class="book-img"
						src="budscomics 1.png"
						alt="No Image"
					/>
				</div>
			</div>
		</div>

		<div class="is-centered p-6">
			<p class="font-size-120 mt-6 has-text-centered">ROADMAP</p>
		</div>

		<!-- <div class="columns is-mobile is-centered">
			<div class="center-start-div">
				<b-button
					class="font-size-44 mt-2 pb-2 pl-4 pr-4 has-text-centered center-start-button"
					@click="click"
				>
					START
				</b-button>
			</div>
		</div> -->
	</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
	components: {},
})
export default class MainMenu extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.main-menu {
	padding: 0px;
	// background: linear-gradient(
	// 	180deg,
	// 	#000000 0%,
	// 	rgba(0, 0, 0, 0) 15.8%,
	// 	rgba(0, 0, 0, 0) 56.52%,
	// 	#000000 73.27%,
	// 	#000000 94.88%
	// );
	// background: url('../../public/home.jpg') !important;
	// 	background-position: Top !important;
	// 	background-repeat: no-repeat !important;
	// 	background-size: cover !important;
}

.first-div {
	background: #016b43;
}

.small-div {
	background: #00ce4c;
}

.read-button {
	background: #c1ce00;
	border: none;
}

.book-img {
	display: inline;
	width: 917px !important;
	height: 700px !important;
	position: absolute;
	top: 5%;
	left: 100%;
	-moz-transform: translateY(-17%);
	-webkit-transform: translateY(-17%);
	transform: translateY(-17%);
	@include mobile {
		display: none;
	}
}

.center-start-div {
	position: absolute;
	top: 65%;
	left: 50%;
	-moz-transform: translateX(-50%) translateY(-50%);
	-webkit-transform: translateX(-50%) translateY(-50%);
	transform: translateX(-50%) translateY(-50%);
}
.center-start-button {
	font-family: 'Poppins';
	background: rgba(0, 0, 0, 0.2);
	border: 2px solid #ff00e5;
	border-radius: 12px;
}
</style>
