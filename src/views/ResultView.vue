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