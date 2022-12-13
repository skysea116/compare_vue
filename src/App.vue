<template>
  <div id="app">

    <div class="appcont">
      <router-view/>
    </div>

    <span v-if="this.$route.name !== 'upload'">
      <router-link to="/" class="homeBut"><img src="../public/house.png" alt="Домой"></router-link>
    </span>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

}
.appcont {
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgb(84, 201, 133);
    box-shadow: 40px 35px 1px rgba(70, 194, 101, 0.329);
    width: 70vw;
    height: auto;
    margin: 0 auto;
    margin-top: 39px;
    padding-bottom: 10vh;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.homeBut {
  width: 3vw;
  margin-left: 4vw;
  margin-top: -11vh;
  box-shadow: 0 0 19px rgba(190, 190, 190, 0.788);
}
.homeBut a{
    width: 3vw;
    border-radius: 100px;
    margin-top: 29px;
    margin-bottom: 0;
  }
  .homeBut img {
    height: 5vh;
  }
</style>
