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

.fix-height-image {
  height: 100%;
  width: 100%;

  @include mobile {
    width: 98vw;
  }
}

.center-start-button {
  font-family: "Poppins";
  background: #f5e2b2;
  border-radius: 10px !important;
}
</style>
