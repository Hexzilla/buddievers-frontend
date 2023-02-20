<template>
  <div class="is-centered final-div p-4 pt-0">
    <div class="columns pt-6 pb-6">
      <div class="column is-5">
        <div class="columns">
          <div class="column is-2"></div>
          <div class="column is-5">
            <p class="font-size-40-white mb-3">QUICK LINKS</p>
            <p class="font-size-40-white-400 mb-3">BUDDIES</p>
            <p class="font-size-40-white-400 mb-3">MOON BUDDIES</p>
            <p class="font-size-40-white-400 mb-3">About</p>
          </div>
          <div class="column is-5 mt-5 pt-5">
            <p class="font-size-40-white-400 mb-3 mt-3 pt-5">Marketplace</p>
            <p class="font-size-40-white-400 mb-3">Coffe shop</p>
            <p class="font-size-40-white-400 mb-3">Raresama</p>
          </div>
        </div>
      </div>
      <div class="column is-2" style="display: flex; align-items: center;">
        <div class="column has-text-centered footer-img">
          <img src="img/B-BUDS 2.png" alt="No Image" class="footer-img" />
        </div>
      </div>
      <div class="column is-4">
        <p class="font-size-40-white mb-3">SIGN OUR NEWSLETTER</p>
        <div style="display: flex;">
          <input placeholder="Email address" type="email" style="width:100%; font-size: 40px; font-style: italic;"/>
          <img
            src="img/email_arrow.png"
            alt="No Image"
            class="footer-icon-img"
          />
        </div>
        <div class="columns pt-6">
          <div class="column is-6">
            <p class="font-size-40-white mb-3">JOIN US</p>
          </div>
          <div class="column is-3">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img
                src="img/twitter white 1.png"
                alt="No Image"
				width="50px" style="height:50px" 
                class="footer-icon-img"
              />
            </a>
          </div>
          <div class="column is-3">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img
                src="img/discord white 1.png"
                alt="No Image"
				width="50px" style="height:50px" 
                class="footer-icon-img"
              />
            </a>
          </div>
        </div>
        <!-- <div class="columns is-mobile">
          <div class="column is-5">
          </div>
          <div class="column is-3">
            <div class="footer-icon-div-position">
              <a href="" target="_blank" rel="noopener noreferrer">
                <img
                  src="img/twitter white 1.png"
                  alt="No Image"
                  class="footer-icon-img"
                />
              </a>
            </div>
          </div>
          <div class="column is-3">
            <div class="footer-icon-div-position">
              <a href="" target="_blank" rel="noopener noreferrer">
                <img
                  src="img/discord white 1.png"
                  alt="No Image"
                  class="footer-icon-img"
                />
              </a>
            </div>
          </div>
          <div class="column is-1"></div>
        </div> -->
      </div>
      <div class="column is-1"></div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class MenuHeader extends Vue {}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

.final-div {
  background: #000000;
}

.footer-img {
  height: 150px;

  @include mobile {
    display: none;
  }
}

.footer-icon-img {
  height: 80px;

  @include mobile {
    height: 30px;
  }
}

.footer-icon-div-position {
  margin-top: 12vh;
}
</style>
