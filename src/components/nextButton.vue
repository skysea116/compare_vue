<template>
  <div class="but">
      <span v-if="ButtonNum === '1'">
        <router-link to="/comparing">Дальше</router-link>
      </span>
      <span v-if="ButtonNum === '2'">
        <router-link to="/result">Дальше</router-link>
      </span>
  </div>
</template>

<script>
export default {
  props: ['ButtonNum'],
}
</script>

<style>
a {
    padding:  25px;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 35px;
    transition: all 0.2s;
    border-radius: 45px;
    display: block;
    margin-bottom: 55px;
    transition: all 0.2s;
    text-decoration: none;
    color: black;
    transition: all 0.2s;
    width: 30vw;
}
a:hover {
    transition: all 0.2s;
    background-color: rgb(224, 224, 224);
    color: rgb(70, 194, 121);
}
</style>

