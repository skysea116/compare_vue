<template>
     <div class="res-blck">
          <span v-for="item in nonMatched_1" :key="item">
            {{item}}
          </span><br>
          <span v-for="item in nonMatched_2" :key="item">
            {{item}}
          </span>
     </div>
</template>

<script>
import lodash from 'lodash'
export default {
  data() {
    return {
     firstTable: this.$store.getters.FIRST_TABLE,
     secondTable: this.$store.getters.SECOND_TABLE,
     selected_1: this.$store.getters.SELECTED_PARAMS_1,
     selected_2: this.$store.getters.SELECTED_PARAMS_2,
     nonMatched_1: '',
     nonMatched_2: '',
    }
  },

  mounted() {
     this.toGetSelectedData() 
     this.toCompareIt()
  },

  methods: {
     toGetSelectedData() {
     //извлеяение данных нужных параметров первой таблицы
      let firstTable = this.firstTable.slice()

        let itter = Object.keys(firstTable[0]).map(function(item) { 
          return item.trim()
        });
        let del = itter.filter(x => !this.selected_1.includes(x));
        del.join()
         firstTable.map(function(item) { 
          if(item[del] === undefined) {
            delete item[del + ' ']; 
          } else {
            delete item[del]; 
          }
        });
        console.log('1', firstTable)

        //извлеяение данных нужных параметров второй таблицы
        let secondTable = this.secondTable.slice()

        let itter2 = Object.keys(secondTable[0]).map(function(item) { 
          return item.trim()
        });
        let del2 = itter2.filter(x => !this.selected_1.includes(x));
        del2.join()
         secondTable.map(function(item) { 
          if(item[del2] === undefined) {
            delete item[del2 + ' ']; 
          } else {
            delete item[del2]; 
          }
        });
        console.log('2', secondTable)
     }, 

     toCompareIt() {
      let table_1 = this.firstTable.slice()
        
       
      let table_2 = this.secondTable.slice()
 
      let matched_1 = []
      let nonMatched_1 = []

      let matched_2 = []
      let nonMatched_2 = []

        table_1.forEach((row, index) => {
          table_2.forEach((row2, index2) => {
            if(lodash.isEqual(row, row2)) {
              
              table_1[index2]
              matched_1.push(table_1[index])
             //console.log('+', matched)
             nonMatched_1 = table_1.filter(val => !matched_1.includes(val))
             console.log('t323', nonMatched_1)
             
            } else {
              
              console.log('НЕСовпало', table_1)

            }
          })
        }); 
        this.nonMatched_1 = nonMatched_1
              console.log(this.nonMatched_1)



        table_2.forEach((row2, index2) => {
          table_1.forEach((row, index) => {
            if(lodash.isEqual(row2, row)) {
              
              table_2[index]
              matched_2.push(table_2[index2])
             //console.log('+', matched)
             nonMatched_2 = table_2.filter(val => !matched_2.includes(val))
             console.log('t555', nonMatched_2)
             
            } else {
              
              console.log('НЕСовпало', table_2)

            }
          })
        }); 
        this.nonMatched_2 = nonMatched_2
              console.log(this.nonMatched_2)
    
     }
  }
}
</script>