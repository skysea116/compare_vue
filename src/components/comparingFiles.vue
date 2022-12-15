<template>
  <div class="compare">
      <li >
        <div class="select" v-if="fileNum === '1'"> <!--Список параметров первого файла-->
         <h3>{{ this.$store.getters.FIRST_FILE }}</h3>


         <span v-for="(table, index) in headers" :key="table">
           <select 
               v-model="selected_1[index]"
               @change="getSelectValue()" 
               v-if="selected_1[index] !== 'index'"
             >
             
               <option v-for="table2 in headers" :key="table2" :value="table2">
                   <p>{{ table2 }}</p>
               </option>

             </select>
             
         </span>

        </div>

        <div class="select" v-if="fileNum === '2'"> <!--Список параметров второго файла-->
         <h3>{{ this.$store.getters.SECOND_FILE }}</h3>
         <span v-for="(table, index) in headers" :key="table">
           <select 
               v-model="selected_2[index]"
               @change="getSelectValue()" 
               v-if="selected_2[index] !== 'index'"
             >
             
               <option v-for="table2 in headers" :key="table2" :value="table2">
                   <p>{{ table2 }}</p>
               </option>

             </select>
         </span>

        </div>
      </li>
      
  </div>
</template>

<script>

export default {
props: ['fileNum'],
data() {
 return {
   firstTable: this.$store.getters.FIRST_TABLE,
   secondTable: this.$store.getters.SECOND_TABLE,
   headers: [], //параметры
   selected_1: [], //выбранные параметры из первой таблицы
   selected_2: [], //выбранные параметры из второй таблицы
 }
},

mounted() {
this.toHeaders()
this.getSelectValue()
},

methods: {

 toHeaders() { //получение имён параметров
   if(this.fileNum === '1') {
     for(let item in this.firstTable[0]) {
         this.headers.push(item)
         this.selected_1.push(item)
     }
     
   } else {
     for(let item in this.secondTable[0]) {
         this.headers.push(item)
         this.selected_2.push(item)
     }
   }
   this.headers;
 },
 getSelectValue() { //передача выбранных параметров во vuex
   if(this.fileNum === '1') {
     this.$store.commit('SET_1_SELECTED_PARAMS', this.selected_1)
   } else {
     this.$store.commit('SET_2_SELECTED_PARAMS', this.selected_2)
   }
 }
}

}
</script>
<style>
select {
 font-size: 24px;
 width: 25vw;
 height: auto;
 padding: 10px 20px;
 border-radius: 30px;
 border: none;
 margin: 5px 0;
 transition: all 0.2s;
}
select::-webkit-scrollbar {
 width: 0;
}
option {
 transition: all 0.2s;
 border-radius: 30px;
 padding: 17px;
 margin-top: 10px;
 box-shadow: 0 0 10px rgb(177, 177, 177);
 overflow: hidden;
 text-overflow: ellipsis;
}
option:hover {
 transition: all 0.2s;
 background-color: rgb(224, 224, 224);
 color: rgb(70, 194, 121);
 cursor: pointer;
}
li {
 list-style: none;
}
.compare h3 {
 display: block;
 height: 7vh !important;

 text-align: center;
 
}

</style>
