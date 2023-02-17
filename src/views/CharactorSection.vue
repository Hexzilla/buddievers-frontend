<template>
  <h1>CharactorCarousel are comming soon.</h1>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import VueMetamask from "vue-metamask";

@Component({
  components: {
    VueMetamask,
  },
})
export default class CharactorSection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>
