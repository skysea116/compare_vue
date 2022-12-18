<template>
     <div class="result">
          <h2>Результат</h2>
          <resultOfCompare />
          
     </div>
</template>

<script>
import resultOfCompare from '@/components/resultOfCompare.vue'
export default {
  name: 'LoadingView',
  components: {
    resultOfCompare,
  },
  mounted() {
    this.toUpdate()
  },

  methods: {
    toUpdate() {
      if(this.$store.getters.FIRST_TABLE == '') {
        this.$router.push('/')
      } 
    } 
  }
}
</script>


<style>
  .result {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

</style>