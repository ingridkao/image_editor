<script setup lang="ts">
import { ref } from 'vue'
window.URL = window.URL || window.webkitURL

const emit = defineEmits(["upload"])
const fileEl = ref()
const img = ref<File>()
// const previewMap = ref()

const uploadFileHandle = (event:any) => {
    const imgFile = event.target.files[0]
    img.value = imgFile
    // console.log(imgFile);
    
    // 讀取 image 資料
    // previewMap.value = window.URL.createObjectURL(imgFile)
    getBase64(imgFile)

    event.target.value = null    
}

const getBase64 = (file:any) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        emit('upload', reader.result)
    }
    reader.onerror = (error) => {
        console.log('Error: ', error);
    }
}
const uploadFile = () => {
    fileEl.value.click()
}

</script>

<template>
    <section>
        <h2>
            拍照/上傳照片
        </h2>
        <input 
            ref="fileEl"
            type="file" 
            accept="image/png, image/jpeg, image/jpg"
            capture="user"
            @change="uploadFileHandle" 
            v-show="false"
        />
        <div>
            <button @click="uploadFile">
                拍照/上傳照片
            </button>
            <!-- <div class="img_box">
                <img :src="previewMap" alt="" />
            </div> -->
            <!-- <div v-if="img">
                <p>{{ img.name }}</p>
                <p>{{ img.size }}</p>
                <p>{{ img.type }}</p>
            </div> -->
        </div>
    </section>
</template>

<style scoped>
/* .img_box{
    width: 160px;
}
.img_box img{
    width: 100%;
} */
</style>
