<template>
  <div class="pt-6 roadmap-container">
    <p class="font-size-96-green m-6 has-text-centered">ROADMAP</p>
    <div class="columns roadmap-iamge-div hide-mobile-view">
      <div class="column is-2"></div>
      <div class="column is-8">
        <img src="img/roadstep.png" alt="No Image" class="fix-height-image" />
      </div>
      <div class="column is-2"></div>
    </div>
    <div class="mt-6 p-6 has-text-centered">
      <p class="font-size-40-white">THERE IS NO END OF THE ROAD</p>
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
export default class RoadMapSection extends Vue {}
</script>
  
<style lang="scss">
@import "~bulma/sass/utilities/_all";

.roadmap-container {
  background: url("@/assets/roadBackground.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.roadmap-iamge-div {
  display: flex;
  align-items: center;
}
</style>
  