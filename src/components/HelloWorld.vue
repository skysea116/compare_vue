<template>
  <div class="container">
    <input type="file" multiple="false" id="sheetjs-input" :accept="SheetJSFT" @change="onchange" />,
    <br/>
    <div id="out-table"></div>,
  </div>
</template>
<script>
import { read } from 'xlsx';

  export default {
    data(){
      return {
        file: '',
        fileName: '',
        SheetJSFT: ["xlsx", "xlsb", "xlsm", "xls"].map(function(x) { return "." + x; }).join(",")
      }
    },
    methods: {

      
    onchange: function(evt) {
        var files = evt.target.files;
        if (!files || files.length == 0) return;

        var file = files[0];

        var reader = new FileReader();
        
        reader.onload = (e) => {
          // get data
          var bytes = new Uint8Array(e.target.result);

          /* read workbook */
          var wb = read(bytes);
          
          /* grab first sheet */
          var wsname = wb.SheetNames[0];
          var ws = wb.Sheets[wsname];
        
          /* generate HTML */
          //var HTML = utils.sheet_to_html(ws);
          console.log(ws)

          /* update table */
          //document.getElementById('out-table').innerHTML = HTML;
          this.setToVuex(ws)
        };
        reader.readAsArrayBuffer(file);
    },

    setToVuex(obj) {
      this.$store.commit('SET_TABLE_TO_STATE', obj);
    }


  }
}
</script>
