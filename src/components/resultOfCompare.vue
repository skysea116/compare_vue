<template>
     <div class="res-blck">
      <span>{{equalMsg}}</span>
          <span v-for="(item) in completelyNonMatch_1" :key="item" class="row">
            <span><b>Строка {{ item.index }}</b> файла "{{ firstFile }}", содержащая </span>
              <span v-for="(item2, index2) in item" :key="item2">
                
                <span v-if="index2 !== 'index'"> {{ index2 }}: <b>{{item2}}</b> </span>
              </span>
              полностью отсутсвуют в  <b>{{ secondFile }}</b><br>
            
          </span>


          <span v-for="(item) in completelyNonMatch_2" :key="item" class="row">
            <span><b>Строка {{ item.index }}</b> файла "{{ secondFile}}", содержащая </span>
              <span v-for="(item2, index2) in item" :key="item2">
                
                <span v-if="index2 !== 'index'"> {{ index2 }}: <b>{{item2}}</b> </span>
                
              </span>
              полностью отсутсвуют в  <b>{{ firstFile }}</b><br>
            
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

     equalMsg: '',
    }
  },

  mounted() {
     this.toGetSelectedData() 
     this.toCompareIt()
     this.resultOutput()
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

      if(nonMatched_1 === [] && nonMatched_2 === []) {
        this.equalMsg = 'Загруженные файлы полностью совпадают!'
        console.log('aaa', this.equalMsg)
       } else {
        this.equalMsg = ''
       }
        //поиск всех разных строк из первой таблицы
        table_1.forEach((row, index) => {

          table_1[index] = Object.keys(row).sort().reduce(
            (obj, key) => { 
              obj[key] = row[key]; 
              return obj;
            }, 
          {}
        );

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


        //не совпадающие строки в первой таблице
        nonMatched_1.forEach(nonRow => {
          for(let item in nonRow) {
            nonMatched_2.forEach(nonRow2 => {
             
              for(let item2 in nonRow2) { //поиск частично совпадающих объектов

                if(lodash.isEqual( nonRow[item], nonRow2[item2])) {

                  partialMatch_1.push(nonMatched_1.find(non => non[item] === nonRow[item]))
                  console.log('aboba',  partialMatch_1)
                  partialMatch_1 = partialMatch_1.filter((item3, index3) => {
                    return partialMatch_1.indexOf(item3) === index3
                  });

                  this.partialMatch_1 = partialMatch_1;

                } else { //поиск полностью не свопадающих объектов
      
                  completelyNonMatch_1 = lodash.xor(partialMatch_1, nonMatched_1) 
                  this.completelyNonMatch_1 = completelyNonMatch_1
                  
                 
                }
                
              }

            })
          }
          
        }) 
        console.log('comlete', this.completelyNonMatch_1, 'part', this.partialMatch_1)

        let partialMatch_2 = [];
       let completelyNonMatch_2 = [];

        //не совпадающие строки во второй таблице
        nonMatched_2.forEach(nonRow2 => {
          for(let item2 in nonRow2) {
            nonMatched_1.forEach(nonRow => {
             
              for(let item in nonRow) {

                if(lodash.isEqual( nonRow[item], nonRow2[item2])) {

                  partialMatch_2.push(nonMatched_2.find(non => non[item] === nonRow[item]))

                  partialMatch_2 = partialMatch_2.filter((item3, index3) => {
                    return partialMatch_2.indexOf(item3) === index3
                  });

                  this.partialMatch_2 = partialMatch_2;
                  console.log('part', this.partialMatch_2)

                } else { //поиск полностью не свопадающих объектов
      
                  completelyNonMatch_2 = lodash.xor(partialMatch_2, nonMatched_2) 
                  this.completelyNonMatch_2 = completelyNonMatch_2
                  
                 
                }
                
              }

            })
          }
          
        }) 
       
     },

     resultOutput() {
      this.completelyNonMatch_1.forEach(el => {
        this.firstTable.forEach((el2, index) => {
          if(lodash.isEqual(el, el2)) {
            el['index'] = index + 2 //номер строки в excel файле 1
          }
        })
      })

      this.completelyNonMatch_2.forEach(el => {
        this.secondTable.forEach((el2, index) => {
          if(lodash.isEqual(el, el2)) {
            el['index'] = index + 2 //номер строки в excel файле 2
          }
        })
      })
     }
  }
}
</script>

<style>
.res-blck {
  background-color: white;
  height: 50vh;
  padding: 20px;
  text-align: left;
  border-radius: 30px;
  overflow: scroll;
  font-size: 20px;
  width: 90%;
}
.row {
  display: block;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 0px 8px rgb(201, 201, 201);
  margin-top: 10px;
  padding: 10px;
}
</style>