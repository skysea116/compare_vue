<template>
     <div class="res-blck">
      <!--Вывод полученных данных о не совпадающих строках на страницу-->
      
      <span v-if="(nonMatched_1.length || nonMatched_2.length)"> 

        
        <span v-for="(item) in nonMatched_1" :key="item"> <!--Полностью не совпадающие строки в первой таблице-->

          <span v-if="item !== undefined" class="row">


            <span><b>Строка {{ item.index }}</b> файла "{{ firstFile }}", содержащая </span>
              <span v-for="(item2, index2) in item" :key="item2">
                
                <span v-if="index2 !== 'index'"> {{ index2 }}: <b>{{item2}} </b> </span>
              </span>
              <span class="type-of-output"> полностью отсутсвуют</span> в  <b>{{ secondFile }}</b><br>
            
          </span>
        </span>



            <span v-for="item_ in nonMatched_2" :key="item_" > <!--Полностью не совпадающие строки во второй таблице-->

              <span v-if="item_ !== undefined" class="row">

                <span><b>Строка {{ item_.index }}</b> файла "{{ secondFile}}", содержащая </span>
                  <span v-for="(item2_, index2_) in item_" :key="item2_">
                    
                    <span v-if="index2_ !== 'index'"> {{ index2_ }}: <b>{{item2_}} </b> </span>
                    
                  </span>
                <span class="type-of-output"> полностью отсутсвуют</span> в <b>{{ firstFile }}</b><br>
                
              </span>

            </span>
          
          
          
          <span v-for="(item) in partialMatch_1" :key="item" class="row"> <!--Частично не совпадающие строки-->

            <span v-for="(item2, index2) in item" :key="item2" >
              
              
              <span v-if="index2 === 0">
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
     nonMatched_1: [], //все несовпадающие строки первой таблицы
     nonMatched_2: [],//все несовпадающие строки второй таблицы
     firstFile: this.$store.getters.FIRST_FILE , //имя первого файла
     secondFile: this.$store.getters.SECOND_FILE , //имя второго файла
     partialMatch_1: [], //частично равные строки из первой таблицы
     partialMatch_2: [], //частично равные строки из второй таблицы
     allMatched_1: [],
     allMatched_2: [],
    }
  },

  mounted() {
     this.toGetSelectedData() 
      this.toCompareIt()
     
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
      let fisrtHeaders = Object.keys(this.firstTable[0]).sort()
      let secondHeaders = Object.keys(this.secondTable[0]).sort()

      //данные которых нет во второй таблице
      this.firstTable.forEach((dataFirstTable) => {

        let allNonFirst = true;
        let particalMatched_1 = true;
        let particalMatchedForRow = [];

        this.secondTable.forEach((dataSecondTable) => {

          let allMatched_1 = true;
          let count = 0;

          fisrtHeaders.forEach((firstHeadersTable, index) => {

            let fisrtHeadersTable1 = firstHeadersTable;
            let secondHeadersTable = secondHeaders[index];

            let celValue_1 = dataFirstTable[fisrtHeadersTable1] + " ";
            let celValue_2 = dataSecondTable[secondHeadersTable] + " ";

            if (celValue_1.trim() != celValue_2.trim()) {
              allMatched_1 = false;
              count++;
            }

          });

          if (allMatched_1) {
            allNonFirst = false;
            this.allMatched_1.push([dataFirstTable, dataSecondTable]);
            particalMatched_1 = false;
            particalMatchedForRow = [];
          }

          if (count == 1 && particalMatched_1) {
            allNonFirst = false;
            particalMatchedForRow.push([dataFirstTable, dataSecondTable]);
          }
          count = 0;

        });

        this.partialMatch_1 = [
          ...particalMatchedForRow,
          ...this.partialMatch_1,
        ];
        if (allNonFirst) {
          this.nonMatched_1.push(dataFirstTable);
        }
      });

      console.log("Полностью1", this.allMatched_1);
      console.log("Полностью не совпали1", this.nonMatched_1);
      
      //Удаление дубликатов из массива
      const uniq = new Set(
        this.partialMatch_1.map((e) => JSON.stringify(e))
      );
      const res = Array.from(uniq).map((e) => JSON.parse(e));
      this.partialMatch_1 = res;
      console.log('Часть1', this.partialMatch_1);
      //данные которых нет в первой таблице

      this.secondTable.forEach((dataSecondTable) => {

        let allNonFirst = true;

        this.firstTable.forEach((dataFirstTable) => {

          let allMatched_2 = true;
          let particalMatched_2 = true;
          let count = 0;

          secondHeaders.forEach((SecondHeaders, index) => {
            const firstHeadersTable = fisrtHeaders[index];

            let celValue_1 = dataFirstTable[firstHeadersTable] + " ";
            let celValue_2 = dataSecondTable[SecondHeaders] + " ";

            if (celValue_1.trim() != celValue_2.trim()) {
              allMatched_2 = false;
              count++;
            }

          });

          if (allMatched_2) {
            allNonFirst = false;
            this.allMatched_2.push([dataFirstTable, dataSecondTable]);
            particalMatched_2 = false;
          }

          if (count == 1 && particalMatched_2) {
            allNonFirst = false;
            this.partialMatch_2.push([dataFirstTable, dataSecondTable]);
          }
          count = 0;
        });

        if (allNonFirst) {
          this.nonMatched_2.push(dataSecondTable);
        }
      });

      console.log("Полностью2", this.allMatched_2);
      console.log("Полностью не совпали2", this.nonMatched_2);

      const res1 = Array.from(uniq).map((e) => JSON.parse(e));
      this.partialMatch_2 = res1;
      console.log('Часть2', this.partialMatch_2);

        this.resultOutput()
     },

     resultOutput() { //функция вывода полученных данных сравнения на страницу

      //для полностью несовпадающих строк
      this.nonMatched_1.forEach(el => {
        this.firstTable.forEach((el2, index) => {
          if(lodash.isEqual(el, el2)) {
            el['index'] = index + 2 //номер строки в excel файле 1
          }
        })
      })

      this.nonMatched_2.forEach(el => {
        this.secondTable.forEach((el2, index) => {
          if(lodash.isEqual(el, el2)) {
            el['index'] = index + 2 //номер строки в excel файле 2
          }
        })
      })
      

    //для частично совпадающих строк
      //let partlyOutput = [];
      this.partialMatch_1.forEach(el => {
        console.log(el)
        this.firstTable.forEach((e, index) => {
          if(lodash.isEqual(e, el[0])) {
            el[0]['index'] = index + 2 //номер строки в excel файле 1
          }
        })
        this.secondTable.forEach((e, index) => {
          if(lodash.isEqual(e, el[1])) {
            el[1]['index'] = index + 2 //номер строки в excel файле 1
          }
        })
        


          
    
     
     
     },

      )}
    
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