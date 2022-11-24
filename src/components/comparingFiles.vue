<template>
     <div class="compare">
         <li v-for="table in headers" :key="table.h">
           <div class="select">
             <select :value="table.trim()" >
              <option>
                   <p>---</p>
               </option>
               <option  v-for="table2 in headers" :key="table2">
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
    }
  },

mounted() {
  this.toHeaders()
},

  methods: {

    toHeaders() {
      if(this.fileNum === '1') {
        for(let item in this.firstTable) {
          if(item.match(/1/) && item.length <= 2) {
            this.headers.push(this.firstTable[item].h)
          }
        }
      } else {
        for(let item in this.secondTable) {
          if(item.match(/1/) && item.length <= 2) {
            this.headers.push(this.secondTable[item].h)
          }
        }
      }
    }

  }
}
</script>
<style>
  select {
    font-size: 24px;
    width: 18vw;
    padding: 10px 20px;
    border-radius: 30px;
    border: none;
    margin: 5px 0;
    transition: all 0.2s;
  }
  select:hover {
    transition: all 0.2s;
    background-color: rgb(224, 224, 224);
    color: rgb(70, 194, 121);
    cursor: pointer;
  }
  li {
    list-style: none;
  }
</style>