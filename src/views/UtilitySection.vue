<template>
  <section>
    <p class="font-size-96-green mt-5 has-text-centered">UTILITY</p>
    <b-carousel
      :arrow="false"
      :draggable="true"
    >
      <b-carousel-item v-for="(item, i) in items" :key="i">
        <div class="columns mt-4 mb-5 ml-5">
          <div class="column is-6">
            <p class="font-size-96">
              {{ item.title }}
            </p>
            <p class="font-size-24 mt-4">
              {{ item.description }}
            </p>
          </div>
          <div class="column is-6">
            <img :src="item.image" alt="No Image" class="fix-height-image" />
          </div>
        </div>
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import VueMetamask from "vue-metamask";

@Component({
  components: {
    VueMetamask,
  },
})
export default class UtilitySection extends Vue {
  items = [
    {
      title: "Into the Buddieverse",
      description:
        "Our own 3D metaverse full of fun and utility. Walk into Buddieverse, play games, buy composable NFTs, learn in the University, read our official comic in the kiosk, bet in the Casino, promote your business on the billboards or even order your own building. You can do everything in Buddies St.",
      image: require("@/assets/utility/0.png"),
    },
    {
      title: "Alpha trading",
      description:
        "BUDDIES have access to professional trading calls provided for free. With an 80% success rate, BAT users can recoup their investment and continue to profit",
      image: require("@/assets/utility/1.png"),
    },
    {
      title: "Buddies capital",
      description:
        "BUDDIES can share investment ideas with fellow holders. If the idea passes with a governance vote, the proposing BUDDIE will get 20% of the profits with the rest going to the community bank",
      image: require("@/assets/utility/2.png"),
    },
    {
      title: "Public library",
      description:
        "BUDDIES love to learn, and we share knowledge pertaining to blockchain technology, trading, coding, and so much more within a dedicated channel",
      image: require("@/assets/utility/3.png"),
    },
    {
      title: "NFT staking",
      description:
        "Stake your BUDDIE NFT to receive Buddieverse resources. These can be used to purchase merchandise, join raffles, and more!",
      image: require("@/assets/utility/4.png"),
    },
  ];
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>
