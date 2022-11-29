<template>
     <div class="result">
          <h2>Результат</h2>
          <resultOfCompare />
     </div>
</template>

<script>
import resultOfCompare from '@/components/resultOfCompare.vue'
//v-for="table2 in firstTable" :key="table2.h"
export default {
  name: 'ResultView',
  components: {
    resultOfCompare,
  },

}
</script>