<template>
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './styles';

#app {
  font-family: 'Poppins';
	font-style: normal;
  text-align: center;
  color: #2c3e50;
  background-color: #000;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
