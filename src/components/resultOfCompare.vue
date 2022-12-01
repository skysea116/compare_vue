<template>
     <div class="res-blck">
          <span v-for="item in completelyNonMatch_1" :key="item">
            <span v-for="(item2, index) in item" :key="item2">
              <span>{{ index }}: </span>{{item2}}
            </span>
            полностью отсутсвует в  <b>{{ secondFile }}</b><br>
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
     firstFile: this.$store.getters.FIRST_FILE ,
     secondFile: this.$store.getters.SECOND_FILE ,
     partialMatch_1: '',
     completelyNonMatch_1: '',
     partialMatch_2: '',
     completelyNonMatch_2: '',
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
      let table_1 = this.firstTable

      console.log('table11111', this.firstTable)
       
      let table_2 = this.secondTable
 
      let matched_1 = []
      let nonMatched_1 = []

      let matched_2 = []
      let nonMatched_2 = []


    


        //поиск всех разных строк из первой таблицы
        table_1.forEach((row, index) => {

          table_1[index] = Object.keys(row).sort().reduce(
            (obj, key) => { 
              obj[key] = row[key]; 
              return obj;
            }, 
          {}
        );
            console.log('tttt', table_1)

          table_2.forEach((row2) => {
            if(lodash.isEqual(row, row2)) {
              
              
              matched_1.push(table_1[index])
             //console.log('+', matched)
             nonMatched_1 = table_1.filter(val => !matched_1.includes(val))
             
            } else {
              
              console.log('НЕСовпало')

            }
          })
        }); 
        this.nonMatched_1 = nonMatched_1

        

        //поиск всех разных строк из второй таблицы
        table_2.forEach((row2, index2) => {

          table_2[index2] = Object.keys(row2).sort().reduce(
            (obj, key) => { 
              obj[key] = row2[key]; 
              return obj;
            }, 
          {}
        );
        console.log('t2', table_2)

          table_1.forEach((row) => {
            if(lodash.isEqual(row2, row)) {
              
              
              matched_2.push(table_2[index2])
             //console.log('+', matched)
             nonMatched_2 = table_2.filter(val => !matched_2.includes(val))
             
            } else {
              
              console.log('НЕСовпало')

            }
          })
        }); 
        this.nonMatched_2 = nonMatched_2


       let partialMatch_1 = [];
       let completelyNonMatch_1 = [];


        //полностью не совпадающие строки в первой таблице
        nonMatched_1.forEach(nonRow => {
          for(let item in nonRow) {

            nonMatched_2.forEach(nonRow2 => {
             
              for(let item2 in nonRow2) {

                if(lodash.isEqual( nonRow[item], nonRow2[item2])) {
                  console.log('1', nonRow[item], '2', nonRow2[item2])

                  partialMatch_1.push(nonMatched_1.find(non => non[item] === nonRow[item]))

                  partialMatch_1 = partialMatch_1.filter((item3, index3) => {
                    return partialMatch_1.indexOf(item3) === index3
                  });

                  this.partialMatch_1 = partialMatch_1;
                  console.log('part', this.partialMatch_1)

                } else { //поиск полностью не свопадающих объектов
      
                  completelyNonMatch_1 = lodash.xor(partialMatch_1, nonMatched_1) 
                  this.completelyNonMatch_1 = completelyNonMatch_1
                  
                 
                }
                
              }

            })
          }
          
        }) 
        console.log('comlete', this.completelyNonMatch_1)

        /*let partialMatch_2 = [];
       let completelyNonMatch_2 = [];

        //полностью не совпадающие строки в первой таблице
        nonMatched_2.forEach(nonRow => {
          for(let item in nonRow) {

            nonMatched_2.forEach(nonRow2 => {
             
              for(let item2 in nonRow2) {

                if(lodash.isEqual( nonRow[item], nonRow2[item2])) {
                  console.log('1', nonRow[item], '2', nonRow2[item2])

                  partialMatch_2.push(nonMatched_2.find(non => non[item] === nonRow[item]))

                  partialMatch_2 = partialMatch_2.filter((item3, index3) => {
                    return partialMatch_2.indexOf(item3) === index3
                  });

                  this.partialMatch_2 = partialMatch_2;
                  console.log('part2', this.partialMatch_2)

                } else {
                  completelyNonMatch_2.push(nonMatched_2.find(non => non[item] !== nonRow[item]))
                  
                  completelyNonMatch_2 = completelyNonMatch_2.filter((item3, index3) => {
                    return completelyNonMatch_2.indexOf(item3) === index3
                  });
                  
                  completelyNonMatch_2 = lodash.xor(partialMatch_2, completelyNonMatch_2)
                  console.log('comlete2', completelyNonMatch_2)
                }
                
              }

            })
          }
          
        }) */
    
     }
  }
}
</script>