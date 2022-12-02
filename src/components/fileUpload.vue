<template>
  <div class="container">

    <span v-for="item in headers" :key="item">
      <span v-if="fileNum === '1'"> 

        <div class="warning" v-if="item[item.length - 1] === ' '">

          <p>Столбец "{{ item }} " имеет лишний пробел! <br><br><span>Удалите его для корректной работы!</span> </p>

        </div>

      </span>
      <span v-else> 

        <div class="warning" v-if="item[item.length - 1] === ' '">

          <p>Столбец "{{ item }} " имеет лишний пробел! <br><br><span>Удалите его для корректной работы!</span> </p>

        </div>

      </span>
    </span>
    <div>

      <div v-if="fileNum === '1'">
        <label v-if="file !== '' || this.$store.getters.FIRST_FILE !== ''" for="sheetjs-input1">{{ this.$store.getters.FIRST_FILE }}</label>
        <label v-else for="sheetjs-input1">Выберите файл {{fileNum}}: </label>
      </div>
      <div v-else>
        <label v-if="file !== '' || this.$store.getters.SECOND_FILE !== ''" for="sheetjs-input2">{{ this.$store.getters.SECOND_FILE  }}</label>
        <label v-else for="sheetjs-input2">Выберите файл {{fileNum}}: </label>
      </div>
      <input v-if="fileNum === '1'" type="file" multiple="false" id="sheetjs-input1" :accept="SheetJSFT" @change="onchange" />
      <input v-else type="file" multiple="false" id="sheetjs-input2" :accept="SheetJSFT" @change="onchange" />
      <br/>

    </div>
  </div>
</template>
<script>
import { read, utils } from 'xlsx';

  export default {
    props: ['fileNum'],
    data(){
      return {
        file: '',
        SheetJSFT: ["xlsx", "xlsb", "xlsm", "xls"].map(function(x) { return "." + x; }).join(","), //разрешённые форматы файлов к загрузке
        isShow_1: false,
        isShow_2: false,
        warnColumn_1: '',
        warnColumn_2: '',
        headers: '',
      }
    },
    computed: {
      warningCondition: function() {
        console.log('aaaa')
        return 'aaa'
      }
    },
    methods: {

      
    onchange: function(evt) { //преобразование загруженных файлов в массив объектов с данными из таблиц
        let files = evt.target.files;
        if (!files || files.length == 0) return;

        this.file = files[0];

        let reader = new FileReader();
        
        reader.onload = (e) => {
          // get data
          let bytes = new Uint8Array(e.target.result);

          /* read workbook */
          let wb = read(bytes);
          
          /* grab first sheet */
          let wsname = wb.SheetNames[0];
          let ws = wb.Sheets[wsname];
        
          let rows = utils.sheet_to_json(ws);

          this.setToVuex(rows)

          this.headers = Object.keys(rows[0]);
        };
        
        reader.readAsArrayBuffer(this.file);
    },

    setToVuex(obj) { //передача данных во vuex
      if (this.fileNum === '1') {
        this.$store.commit('SET_1_TABLE_TO_STATE', obj);
        this.$store.commit('SET_1_FILE_NAME', this.file.name);
      } else if (this.fileNum === '2') {
        this.$store.commit('SET_2_TABLE_TO_STATE', obj);
        this.$store.commit('SET_2_FILE_NAME', this.file.name);
      }

    },



  }
}
</script>

<style>
  .container {
    padding: 50px;
    width: 20vw;
  }
  label {
    padding: 10px 30px;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 25px;
    transition: all 0.2s;
    border-radius: 30px;
    display: block;
  }
  label:hover {
    transition: all 0.2s;
    background-color: rgb(224, 224, 224);
    color: rgb(70, 194, 121);
  }
  #sheetjs-input1, #sheetjs-input2 {
    display: none;
  }
  .warning {
    padding: 15px;
    background-color: rgb(209, 90, 90);
    border-radius: 30px;
    border: 7px solid rgba(255, 255, 255, 0.865);
    font-size: 30px;
    margin-bottom: 20px;
    color: white;
    font-weight: bold;
  }
</style>
