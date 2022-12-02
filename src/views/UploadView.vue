<template>
  <div class="home">
    <div class="top">
      <h2>Загрузка файлов</h2>
        <div class="uploads">
        <fileUpload fileNum = 1 />
        <fileUpload fileNum = 2  />
      </div>
    </div>
    <div class="button" v-if="(this.$store.getters.FIRST_TABLE  && this.$store.getters.SECOND_TABLE)">
      <nextButton ButtonNum = 1 />
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import fileUpload from '@/components/fileUpload.vue'
import nextButton from '@/components/nextButton.vue'

export default {
  name: 'UploadView',
  components: {
    fileUpload,
    nextButton
  },

}
</script>

<style>
  .home {
    margin-top: 19px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top {
    display: flex;
    flex-direction: column;
  }
  h2 {
    font-size: 51px;
  }
  .uploads {
    display: flex;
    justify-content: center;
  }
  .button {
    display: flex;
    justify-content: center;
  }
 
</style>
