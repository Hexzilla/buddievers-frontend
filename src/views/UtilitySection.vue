<template>
  <div class="mt-3 mb-3 p-4">
    <p class="font-size-96-green mt-4 has-text-centered">UTILITY</p>
    <div class="columns mt-4">
      <div class="column is-6">
        <p class="font-size-96">
          Into the <br />
          Buddieverse
        </p>
        <p class="font-size-24 mt-4">
          Our own 3D metaverse full of fun and utility. <br />
          Walk into Buddieverse, play games, buy composable NFTs, learn in the
          University, read our official comic in the kiosk, bet in the Casino,
          promote your business on the billboards or even order your own
          building. You can do everything in Buddies St.
        </p>
      </div>
      <div class="column is-6">
        <img
          src="img/buddieverse-promo 1.png"
          alt="No Image"
          class="fix-height-image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import VueMetamask from "vue-metamask";

@Component({
  components: {
    VueMetamask,
  },
})
export default class UtilitySection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>