<template>
     <div class="compare">
         <li >
           <div class="select" v-if="fileNum === '1'">
             <select @change="getSelectValue()" v-model="selected_1" multiple>
              <option selected="selected" disabled value="---" >
                   <p>Выберите параметры</p>
               </option>
               <option  v-for="table2 in headers" :key="table2" title="ctrl + ЛКМ">
                   <p>{{ table2 }}</p>
               </option>

             </select>
           </div>

           <div class="select" v-if="fileNum === '2'">
             <select @change="getSelectValue()" v-model="selected_2" multiple>
              <option selected="selected" disabled value="---" title="ctrl + ЛКМ для множественного выбора">
                   <p>Выберите параметры</p>
               </option>
               <option  v-for="table2 in headers" :key="table2" title="ctrl + ЛКМ">
                   <p>{{ table2 }}</p>
               </option>

             </select>
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
      headers: [],
      selected_1: [],
      selected_2: [],
    }
  },

mounted() {
  this.toHeaders()
},

  methods: {

    toHeaders() {
      if(this.fileNum === '1') {
        for(let item in this.firstTable[0]) {
            this.headers.push(item)
        }
      } else {
        for(let item in this.secondTable[0]) {
            this.headers.push(item)
        }
      }
      this.headers.sort();
    },
    getSelectValue() {
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
    width: 22vw;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    margin: 5px 0;
    transition: all 0.2s;
  }
  option {
    transition: all 0.1s;
    border-radius: 30px;
  }
  option:first-child:hover {
    cursor: pointer;
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

</style>