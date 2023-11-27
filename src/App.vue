<script setup>
import UploadFile from './components/UploadFile.vue'
import SizeSelect from './components/SizeSelect.vue'
import CropFile from './components/CropFile.vue'
import SaveAs from './components/SaveAs.vue'

import { ref } from 'vue'
const photeFile = ref('')
const photeFileName = ref('')

const photeCropObj = ref({})
const stageObj = ref()

const targetKey = ref('')
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
            <CropFile 
                :targetKey="targetKey" 
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
    font-size: 14px;
    background-color: #fff;
    color: #3c3a3a;
    padding-top: 1rem;
  }
  main{
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 1rem;
  }
  section{
    margin: 0 0 1.5rem 1.5rem;
  }
  h2{
    font-size: 1.1rem;
    color: #3c3a3a;
    font-weight: bold;
  }
  p{
    margin-bottom: .25rem;
  }
  button{
    font-size: 1.2rem;
    outline: none;
    border: none;
    margin: .3rem .3rem .3rem 0;
    padding: 0.3rem 1.5rem;
    border-radius: 2.5rem;
    cursor: pointer;
    background-color: #fff;
    color: #00a161;
    border: 1px solid #00a161;
    box-shadow: 0px 8px 15px rgba(60, 58, 58, 0.15);
  }
  button.green{
    background-color: #00a161;
    color: #fff;
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
