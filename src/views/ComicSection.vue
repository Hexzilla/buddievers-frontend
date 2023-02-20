<template>
  <div class="green-div1 mt-6">
    <div class="columns m-4">
      <div class="column is-7 pl-2 ml-4">
        <div class="mobile-flex">
          <p class="font-size-96-white mt-2">BUDDIES COMIC</p>
          <p class="font-size-64-green">Incredible stories every month!</p>
        </div>
      </div>
      <div class="column is-3">
        <img class="book-img" src="img/budscomics 1.png" alt="No Image" />
      </div>
      <div class="column is-2" style="display: flex; align-items: center">
        <div>
          <b-button class="font-size-25 center-start-button" size="is-large"
            >READ IT</b-button
          >
        </div>
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
export default class ComicSection extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.book-img {
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 1194px) {
  .book-img {
    display: none;
  }
}

.green-div1 {
  background: #016b43;
}
</style>