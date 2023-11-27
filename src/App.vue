<script setup>
import UploadFile from './components/UploadFile.vue'
import SizeSelect from './components/SizeSelect.vue'
// import PosSelect from './components/PosSelect.vue'
import CropFile from './components/CropFile.vue'
import SaveAs from './components/SaveAs.vue'

import { ref } from 'vue'
const photeFile = ref('')
const photeFileName = ref('')

const photeCropObj = ref({})
const stageObj = ref()

const targetKey = ref('')
const targetPos = ref('')
const updateImage = (file, name) => {
    photeFile.value = file
    photeFileName.value = name
}
const updateSize = (key) => {
    targetKey.value = key
}
const updateCropImg = (obj) => {
    photeCropObj.value = obj
}
const updateBg = (obj) => {
    stageObj.value = obj
}
// const updatePos = (key) => {
//     targetPos.value = key
// }
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
    <main>
        <div>
            <SizeSelect 
                @update="updateSize" 
            />
            <UploadFile @upload="updateImage" />
            <!-- <PosSelect @update="updatePos" /> -->
            <CropFile 
                :targetKey="targetKey" 
                :targetPos="targetPos" 
                :photoFile="photeFile"
                @uploadImg="updateCropImg"
                @uploadBg="updateBg"
            />
        </div>
        <div>
            <SaveAs 
                :photeCropFile="photeCropObj" 
                :stageObj="stageObj" 
                :fileName="photeFileName"
            />
        </div>
    </main>
</template>

<style>
  body{
    font-size: 16px;
    background-color: #2f3033;
  }
  main{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }
  section{
    margin: 0 0 2rem 1rem;
  }
  h2{
    font-size: 1.3rem;
    color: #e8dbd3;
  }
  p{
    margin-bottom: .25rem;
  }
  button{
    font-size: 1.2rem;
    outline: none;
    border: none;
    margin: .5rem .5rem .5rem 0;
    padding: .5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: #d5dfe0;
  }
  select{
    font-size: 1rem;
    outline: none;
    border: none;
    margin: .5rem 0;
    padding: .5rem;
    border-radius: 0.25rem;
  }
</style>
