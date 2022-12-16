<template>
     <div class="res-blck">
      <!--Вывод полученных данных о не совпадающих строках на страницу-->
      
      <span v-if="(nonMatched_1.length && nonMatched_2.length)"> 

        
        <span v-for="(item) in completelyNonMatch_1" :key="item"> <!--Полностью не совпадающие строки в первой таблице-->

          <span v-if="item !== undefined" class="row">


            <span><b>Строка {{ item.index }}</b> файла "{{ firstFile }}", содержащая </span>
              <span v-for="(item2, index2) in item" :key="item2">
                
                <span v-if="index2 !== 'index'"> {{ index2 }}: <b>{{item2}} </b> </span>
              </span>
              <span class="type-of-output"> полностью отсутсвуют</span> в  <b>{{ secondFile }}</b><br>
            
          </span>
        </span>



            <span v-for="item_ in completelyNonMatch_2" :key="item_" > <!--Полностью не совпадающие строки во второй таблице-->

              <span v-if="item_ !== undefined" class="row">

                <span><b>Строка {{ item_.index }}</b> файла "{{ secondFile}}", содержащая </span>
                  <span v-for="(item2_, index2_) in item_" :key="item2_">
                    
                    <span v-if="index2_ !== 'index'"> {{ index2_ }}: <b>{{item2_}} </b> </span>
                    
                  </span>
                <span class="type-of-output"> полностью отсутсвуют</span> в <b>{{ firstFile }}</b><br>
                
              </span>

            </span>
          
          
          
          <span v-for="(item) in partlyOutput" :key="item" class="row"> <!--Частично не совпадающие строки-->

            <span v-for="(item2, index2) in item" :key="item2" >
              
              
              <span v-if="index2 === 'el1'">
                <span><b>Строка {{item2.index}} </b>файла "{{ firstFile }}", содержащая </span>

                <span v-for="(item3, index3) in item2" :key="item3">
                  
                  <span v-if="index3 !== 'index'">{{index3}}:<b> {{item3}} </b></span> 
                </span>
                <span class="type-of-output">частично совпадает</span> со
               
              </span>

              <span v-else>
                <span><b>строкой {{item2.index}} </b>файла "{{ secondFile }}", содержащей </span>
                <span v-for="(item3, index3) in item2" :key="item3">
                  <span v-if="index3 !== 'index'">{{index3}}:<b> {{item3}} </b></span>
                </span>

              </span>

            </span>

          </span>
        </span>
        <div class="warning" v-else>
        <p>Разницы нет!</p>
        </div>
     </div>
</template>

<script>
import lodash from 'lodash'
export default {

  data() {
    return {
     firstTable: this.$store.getters.FIRST_TABLE, 
     secondTable: this.$store.getters.SECOND_TABLE,
     selected_1: this.$store.getters.SELECTED_PARAMS_1, //выбранные параметры первой таблицы
     selected_2: this.$store.getters.SELECTED_PARAMS_2, //выбранные параметры второй таблицы
     nonMatched_1: '', //все несовпадающие строки первой таблицы
     nonMatched_2: '',//все несовпадающие строки второй таблицы
     firstFile: this.$store.getters.FIRST_FILE , //имя первого файла
     secondFile: this.$store.getters.SECOND_FILE , //имя второго файла
     partialMatch_1: '', //частично равные строки из первой таблицы
     completelyNonMatch_1: '', //полностью не равные строки из первой таблицы
     partialMatch_2: '', //частично равные строки из второй таблицы
     completelyNonMatch_2: '', //полностью не равные строки из второй таблицы
     partlyOutput: '', //массив всех частично совпадающих строк для вывода
    }
  },

  mounted() {
     this.toGetSelectedData() 
     this.toCompareIt()
     this.resultOutput()
  },

  methods: {
    
     toGetSelectedData() { //получение данных из таблиц с учётом выбранных параметров

      let keys_1 = []
      let keys_2 = []

      let intersection_1 = this.selected_1.filter(x => !this.selected_2.includes(x));
      let intersection_2 = this.selected_2.filter(x => !this.selected_1.includes(x));

      console.log(intersection_1, intersection_2)

      intersection_1.forEach(item => {
       
        keys_1.push({index: this.selected_1.indexOf(item), key: item})
      })
      intersection_2.forEach(item => {
        
        keys_2.push({index: this.selected_2.indexOf(item), key: item})
      })

      keys_1.forEach(item => {
        keys_2.forEach(item2 => {
          if(item.index == item2.index) {
            console.log(item.index, item2.index)
            this.secondTable = this.secondTable.map(function (obj) {
              obj[item.key] = obj[item2.key];
              delete obj[item2.key];
              return obj;
            })
          }
        })
      })

      console.log( this.firstTable, this.secondTable)
     //извлечение данных нужных параметров первой таблицы

        // let itter = Object.keys(this.firstTable[0]).map(function(item) { 
        //   return item.trim()
        // });
        // let del = itter.filter(x => !this.selected_1.includes(x));
        // del.join()
        //  this.firstTable.map(function(item) { 
        //   if(item[del] === undefined) {
        //     delete item[del + ' ']; 
        //   } else {
        //     delete item[del]; 
        //   }
        // });

        //извлечение данных нужных параметров второй таблицы

        // let itter2 = Object.keys(this.secondTable[0]).map(function(item) { 
        //   return item.trim()
        // });
        // let del2 = itter2.filter(x => !this.selected_1.includes(x));
        // del2.join()
        //  this.secondTable.map(function(item) { 
        //   if(item[del2] === undefined) {
        //     delete item[del2 + ' ']; 
        //   } else {
        //     delete item[del2]; 
        //   }
        // });
     }, 

     toCompareIt() { //сравнение данных из таблиц
      let table_1 = this.firstTable

      let table_2 = this.secondTable
 
      let matched_1 = [] //совпадающие строки из первой таблицы
      let nonMatched_1 = [] 

      let matched_2 = [] //совпадающие строки из второй таблицы
      let nonMatched_2 = []

        //поиск всех разных строк из первой таблицы
        table_1.forEach((row) => {

         

          table_2.forEach((row2) => {
            //console.log('r1', row, 'r2', row2)
            if(lodash.isEqual(row, row2)) { 
              matched_1.push(row)
              
              nonMatched_1 = table_1.filter(val => !matched_1.includes(val))
              
            } 
          })
          
        }); 
        
        this.nonMatched_1 = nonMatched_1
        
        

        //поиск всех разных строк из второй таблицы
        table_2.forEach((row2, index2) => {

         

          table_1.forEach((row) => {
            if(lodash.isEqual(row2, row)) {
              
              
              matched_2.push(table_2[index2])
             nonMatched_2 = table_2.filter(val => !matched_2.includes(val))
             
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

                if(nonRow[item] === nonRow2[item2]) {

                  partialMatch_1.push(nonMatched_1.find(non => non[item] === nonRow[item]))
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
        console.log('part1', this.partialMatch_1, 'comp1',  this.completelyNonMatch_1)

        let partialMatch_2 = [];
       let completelyNonMatch_2 = [];

        //не совпадающие строки во второй таблице
        nonMatched_2.forEach(nonRow2 => {
          for(let item2 in nonRow2) {
            nonMatched_1.forEach(nonRow => {
             
              for(let item in nonRow) {

                if( nonRow[item] === nonRow2[item2]) {

                  partialMatch_2.push(nonMatched_2.find(non => non[item] === nonRow[item]))

                  partialMatch_2 = partialMatch_2.filter((item3, index3) => {
                    return partialMatch_2.indexOf(item3) === index3
                  });

                  this.partialMatch_2 = partialMatch_2;

                } else { //поиск полностью не свопадающих объектов
      
                  completelyNonMatch_2 = lodash.xor(partialMatch_2, nonMatched_2) 
                  this.completelyNonMatch_2 = completelyNonMatch_2
                  
                 
                }
                
              }

            })
          }
          
        }) 
        this.isLoaded = true
       
     },

     resultOutput() { //функция вывода полученных данных сравнения на страницу

      //для полностью несовпадающих строк
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
      

    //для частично совпадающих строк
      let partlyOutput = [];
      this.partialMatch_1.forEach(el => {

        this.firstTable.forEach((e, index) => {
          if(lodash.isEqual(e, el)) {
            el['index'] = index + 2 //номер строки в excel файле 1
          }
        })

        for (let item in el) {

        this.partialMatch_2.forEach(el2 => {

         this.secondTable.forEach((e2, index2) => {
          if(lodash.isEqual(e2, el2)) {
            el2['index'] = index2 + 2 //номер строки в excel файле 2
          }
        })

          for (let item2 in el2) {

            if(lodash.isEqual(el[item], el2[item2])) {
              partlyOutput.push({el1: el, el2: el2})
              const uniq = new Set(partlyOutput.map(e => JSON.stringify(e)));

              const res = Array.from(uniq).map(e => JSON.parse(e)); 
              this.partlyOutput = res
            }
            
          }

        })
      }
      })
     
     
     },

  
     
  }
}
</script>

<style>
.res-blck {
  background-color: white;
  height: 55vh;
  padding: 20px;
  text-align: left;
  border-radius: 30px;
  overflow: scroll;
  font-size: 20px;
  width: 90%;
}
.warning {
  text-align: center;
}
.res-blck::-webkit-scrollbar {
    width: 0;
  }
.row {
  display: block;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 0 0px 8px rgb(201, 201, 201);
  margin: 15px;
  padding: 20px;
  line-height: 35px;
}
.type-of-output {
  display: inline-block;
  padding: 0 15px;
  background-color: rgb(84, 201, 133);;
  border-radius: 30px;
  color: white;
  font-weight: bold;
}
</style>