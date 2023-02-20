<template>
  <section>
    <b-carousel-list
      v-model="values"
      :data="items"
      :arrow="arrow"
      :arrow-hover="arrowHover"
      :items-to-show="perList"
      :items-to-list="increment"
      :interval="interval"
      :repeat="repeat"
      :has-drag="drag"
      :has-grayscale="gray"
      :has-opacity="opacity"
    />
  </section>
</template>

<script>
import { Component, Vue, Watch } from "vue-property-decorator";
import VueMetamask from "vue-metamask";

@Component({
  components: {
    VueMetamask,
  },
})
export default class CharactorSection extends Vue {
  arrow = false;
  arrowHover = false;
  drag = true;
  gray = false;
  opacity = false;
  values = 1;
  perList = 5;
  increment = 1;
  repeat = true;
  interval = 1000;
  items = [
    {
      image: require("@/assets/charactors/0.png"),
    },
    {
      image: require("@/assets/charactors/1.png"),
    },
    {
      image: require("@/assets/charactors/2.png"),
    },
    {
      image: require("@/assets/charactors/3.png"),
    },
    {
      image: require("@/assets/charactors/4.png"),
    },
    {
      image: require("@/assets/charactors/5.png"),
    },
    {
      image: require("@/assets/charactors/6.png"),
    },
    {
      image: require("@/assets/charactors/7.png"),
    },
    {
      image: require("@/assets/charactors/8.png"),
    },
    {
      image: require("@/assets/charactors/9.png"),
    },
    {
      image: require("@/assets/charactors/10.png"),
    },
    {
      image: require("@/assets/charactors/11.png"),
    },
    {
      image: require("@/assets/charactors/12.png"),
    },
    {
      image: require("@/assets/charactors/13.png"),
    },
    {
      image: require("@/assets/charactors/14.png"),
    },
  ];
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
</style>
