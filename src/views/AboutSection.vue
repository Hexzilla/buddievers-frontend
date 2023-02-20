<template>
  <div class="has-text-centered">
    <div class="columns">
      <div class="column is-6 p-4">
        <div class="columns">
          <div class="column is-1 p-4"></div>
          <div class="column is-11 p-4">
            <p class="font-size-96-green">ABOUT</p>
            <p class="font-size-40 mt-3">An NFT project building the utopia.</p>
            <p class="font-size-24 mt-5">
              Launched in April 2022, BUDDIES quickly evolved into one of the
              most successful collections on Kusama Network with just 50 NFTs.
            </p>
            <p class="font-size-24 mt-3">
              BUDDIES have built a solid economic backing by collecting assets
              and through Alpha Trading, thereby proving that it is one of the
              most successful NFT collections in the Polkadot ecosystem. BUDDIES
              have 6 core value propositions: Art, Value, Utility,
              Profitability, Education & Fun.
            </p>
            <p class="font-size-24 mt-3">
              Now, we are working toward our multi-chain future as we will debut
              our second generation NFT collection on Moonsama network.
              Moonbuddies is the final generation of the BUDDIES NFT collection,
              but just the beginning for our community goals.
            </p>
            <div class="columns mt-3 mb-3 is-mobile">
              <div class="column is-1"></div>

              <div class="column small-div">
                <p class="font-size-40-white">50</p>
                <p class="font-size-30-white">NFTs</p>
              </div>

              <div class="column is-1"></div>
              <div class="column small-div">
                <p class="font-size-40-white">36</p>
                <p class="font-size-20-white">UNIQUE HOLDERS</p>
              </div>

              <div class="column is-1"></div>
              <div class="column small-div">
                <p class="font-size-40-white">+970</p>
                <p class="font-size-20-white">$KSM VOLUME</p>
              </div>
              <div class="column is-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-6">
        <b-image
          src="img/BUDDIE28 1.png"
          alt="No Image"
          class="fix-height-image"
          ratio="1157by1304"
        ></b-image>
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
export default class AboutSection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.small-div {
  background: #00ce4c;
}
</style>