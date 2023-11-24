<script setup>
import HelloWorld from './components/HelloWorld.vue'
import SizeSelect from './components/SizeSelect.vue'
import UploadFile from './components/UploadFile.vue'
import CropFile from './components/CropFile.vue'
import SaveAs from './components/SaveAs.vue'

import { ref } from 'vue'
const targetKey = ref('')
const photeFile = ref('')
const updateSize = (key) => {
    targetKey.value = key
}
const updateImage = (file) => {
    photeFile.value = file
}
const submitFile = () => {
    // const formData = new FormData();
    // formData.append('file', img.value);
    // const headers = { 'Content-Type': 'multipart/form-data' };
    // axios.post('https://httpbin.org/post', formData, { headers }).then((res) => {
    //     res.data.files; // binary representation of the file
    //     res.status; // HTTP status
    // });
}
</script>

<template>
  <header>
      <HelloWorld msg="You did it!" />
  </header>

  <main>
    <SizeSelect @update="updateSize" />

    <UploadFile @upload="updateImage" />

    <CropFile :targetKey="targetKey" :photoFile="photeFile"/>

    <SaveAs :targetKey="targetKey" :photoFile="photeFile"/>

  </main>
</template>

<style scoped>
</style>
