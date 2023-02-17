<template>
  <div class="green-div p-2">
    <div class="columns pt-4 pb-4">
      <div class="column is-1"></div>
      <div class="column is-10 buddies-div mb-6">
        <b-button
          class="font-size-25-discord px-3 py-5 center-start-button is-mobile"
        >
          <span class="top-buton-span-flex p-4"> JOIN BUDDIES ST. </span>
        </b-button>
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

.buddies-div {
  background: url("../../public/img/Buddies index image 1.png") !important;
  background-position: Top !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;

  @include mobile {
    // min-height: 30vh;
  }
}

.top-buton-span-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>