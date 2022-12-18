<template>
  <div class="comp">
    <h2>Выберите параметры для сравнения</h2>
    <div class="warning" v-if="isWarn">
        Проверьте, чтобы соответсвующие параметры находились друг напротив друга!
      </div>
    <div class="top-comp">
      
      <div class="one">
        <comparingFiles fileNum = 1 />
      </div>
      <div class="two">
        <comparingFiles fileNum = 2 />
      </div>
    </div>
    <div class="but-wrap">
      <div class="button" v-if="((this.$store.getters.SELECTED_PARAMS_1.length) >= 1 && (this.$store.getters.SELECTED_PARAMS_2.length >= 1)) && (this.$store.getters.SELECTED_PARAMS_1.length == this.$store.getters.SELECTED_PARAMS_2.length)">
        <nextButton ButtonNum = 2 />
      </div>
    </div>
  </div>
</template>
<script>
import lodash from 'lodash'
import nextButton from '@/components/nextButton.vue'
import comparingFiles from '@/components/comparingFiles.vue'
//v-for="table2 in firstTable" :key="table2.h"
export default {
  name: 'ComparingView',
  components: {
    nextButton,
    comparingFiles
  },
  data() {
    return {
      isWarn: false,
    }
  },
  
  mounted() {
    this.toWarn()
    this.toUpdate()
  },
  methods: {
    toWarn() {
      if(!lodash.isEqual(this.$store.getters.SELECTED_PARAMS_1, this.$store.getters.SELECTED_PARAMS_2)) {
        this.isWarn = true
      } else {
        this.isWarn = false
      }
    },
    toUpdate() {
      if(this.$store.getters.FIRST_TABLE == '') {
        this.$router.push('/')
      } 
    }
  }

}
</script>

<style>
  .comp {
    margin-top: 19px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .comp .warning {
    background-color: rgb(252, 188, 70);
    margin-top: 39px;
  }
  .comp h2 {
    margin-bottom: 0;
  }
  .comp h3 {
    margin-top: 70px;
    font-size: 29px;
    overflow: auto;
    width: auto;
    height: auto
  }
  .top-comp {
    display: flex;
    justify-content: center;
  }
  .but-wrap {
    height: 11vh;
    margin-bottom: 30px;
  }
  .one {
    margin-right: 40px;
  }
  
  
</style>