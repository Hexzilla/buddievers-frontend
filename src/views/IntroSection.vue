<template>
  <div class="green-div p-2">
    <div class="columns pt-4 pb-4">
      <div class="column is-1"></div>
      <div class="column is-10 buddies-div mb-6">
        <!-- <div class="center-start-div"> -->
        <b-button
          class="font-size-25-discord px-3 py-5 center-start-button is-mobile"
        >
          <span class="top-buton-span-flex p-4"> JOIN BUDDIES ST. </span>
        </b-button>
        <!-- </div> -->
      </div>
      <div class="column is-1"></div>
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
export default class IntroSection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>