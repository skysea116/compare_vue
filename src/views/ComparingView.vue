<template>
  <div class="comp">
    <h2>Выберите параметры для сравнения</h2>
    <div class="top-comp">
      <div class="one">
        <h3>{{ this.$store.getters.FIRST_FILE }}</h3>
        <comparingFiles fileNum = 1 />
      </div>
      <div class="two">
        <h3>{{ this.$store.getters.SECOND_FILE }}</h3>
        <comparingFiles fileNum = 2 />
      </div>
    </div>
    <div class="but-wrap">
      <div class="button" v-if="((this.$store.getters.SELECTED_PARAMS_1.length) >= 1 && (this.$store.getters.SELECTED_PARAMS_2.length >= 1)) && (this.$store.getters.SELECTED_PARAMS_1.length == this.$store.getters.SELECTED_PARAMS_2.length)">
        <nextButton />
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import nextButton from '@/components/nextButton.vue'
import comparingFiles from '@/components/comparingFiles.vue'
//v-for="table2 in firstTable" :key="table2.h"
export default {
  name: 'ComparingView',
  components: {
    nextButton,
    comparingFiles
  },

}
</script>

<style>
  .comp {
    margin-top: 19px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .comp h2 {
    margin-bottom: 0;
  }
  .comp h3 {
    font-size: 35px;
  }
  .top-comp {
    display: flex;
    justify-content: space-between;
  }
  .but-wrap {
    height: 11vh;
    margin-bottom: 30px;
  }
  
</style>