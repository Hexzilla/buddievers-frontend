<template>
  <div class="green-div1 mt-6">
    <div class="columns m-4">
      <div class="column pl-2">
        <div class="mobile-flex">
          <p class="font-size-96-white mt-2">BUDDIES COMIC</p>
          <p class="font-size-64-green">Incredible stories every month!</p>
        </div>
        <div>
          <b-button
            class="
              font-size-25
              mt-5
              mb-5
              pr-6
              pl-6
              pt-0
              pb-0
              center-start-button
            "
            size="is-large"
            >READ</b-button
          >
        </div>
      </div>
      <img
        class="book-img column is-6"
        src="img/budscomics 1.png"
        alt="No Image"
      />
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
export default class ComicSection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>