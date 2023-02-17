<template>
  <div class="green-div">
    <p class="font-size-80-white pt-6 has-text-centered">JOIN BUDDIES ST.</p>
    <div class="columns pt-6 mx-0">
      <div class="column is-6 px-0">
        <img
          src="img/buddies-new 1.png"
          alt="No Image"
          class="fix-height-image"
        />
      </div>
      <div class="column is-6 pl-0 pr-0">
        <img
          src="img/moonbuddies 1.png"
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
export default class JoinSection extends Vue {}
</script>
  
  <style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>
  