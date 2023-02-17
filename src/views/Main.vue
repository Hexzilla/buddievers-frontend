<template>
  <!-- <div class="home min-h-full"> -->
  <div class="">
    <MenuHeader />

    <IntroSection />
    <AboutSection />
    <CharactorSection />
    <UtilitySection />
    <ComicSection />
    <RoadMapSection />
    <JoinSection />

    <Footer />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    MenuHeader: () => import("@/components/MenuHeader.vue"),
    IntroSection: () => import("@/views/IntroSection.vue"),
    AboutSection: () => import("@/views/AboutSection.vue"),
    CharactorSection: () => import("@/views/CharactorSection.vue"),
    UtilitySection: () => import("@/views/UtilitySection.vue"),
    ComicSection: () => import("@/views/ComicSection.vue"),
    RoadMapSection: () => import("@/views/RoadMapSection.vue"),
    JoinSection: () => import("@/views/JoinSection.vue"),
    Footer: () => import("@/components/Footer.vue"),
  },
})
export default class Main extends Vue {}
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

.book-img {
  margin-top: -12vh;
  height: 75vh;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 1194px) {
  .book-img {
    display: none;
  }
}

.green-div1 {
  max-height: 500px;
  background: #016b43;
}

.fix-height-image {
  height: 100%;
  width: 100%;

  @include mobile {
    width: 98vw;
  }
}

.roadmap-section-div-left {
  width: 50%;
  margin-right: auto;

  @include mobile {
    width: 100%;
  }
}

.roadmap-section-div-right {
  width: 50%;
  margin-left: auto;

  @include mobile {
    width: 100%;
  }
}

.roadmap-div-3 {
  background: url("../../public/img/18106012 1.png") !important;
  background-position: Top !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

.center-start-div {
  position: absolute;
  top: 45%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.roadmap-iamge-div {
  display: flex;
  align-items: center;
}

.center-start-button {
  font-family: "Poppins";
  background: #f5e2b2;
  border-radius: 10px !important;
}

.discord-center-button {
  height: 20px;
  padding-left: 10px;
}

.top-buton-span-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
