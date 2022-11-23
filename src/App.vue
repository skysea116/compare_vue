<template>
  <div id="app">
    <nav>
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgb(84, 201, 133);
    box-shadow: 40px 35px 1px rgba(70, 194, 101, 0.329);
    width: 70vw;
    height: 75vh;
    margin: 0 auto;
    margin-top: 50px;
}


nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
