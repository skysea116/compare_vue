<template>
     <div class="res-blck">
          <span v-for="item in nesovpalo_1" :key="item">
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
     nesovpalo_1: [],
    }
  },

  mounted() {
     this.toGetSelectedData() 
     this.toCompareIt()
  },

  methods: {
     toGetSelectedData() {
     //извлеяение данных нужный параметров первой таблицы
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

        //извлеяение данных нужный параметров второй таблицы
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
 
        

        table_1.forEach(row => {
          table_2.forEach(row2 => {
            if(lodash.isEqual(row, row2)) {
              console.log('Совпало', row, row2)
             // this.sovpalo.push(row)
            } else {
              console.log('НЕСовпало', row, row2)
              this.nesovpalo_1.push(row)
              this.nesovpalo_1 = lodash.uniq(this.nesovpalo_1);
            }
          })
        }); 

    
     }
  }
}
</script>