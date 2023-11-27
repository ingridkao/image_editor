<script setup>
import { ref } from 'vue'
// window.URL = window.URL || window.webkitURL

const emit = defineEmits(["upload"])
const fileEl = ref()
const img = ref()
const imgFileName = ref('')
// const previewMap = ref()

const uploadFileHandle = (event) => {
    const imgFile = event.target.files[0]
    img.value = imgFile
    imgFileName.value = imgFile.name
    // 讀取 image 資料
    // previewMap.value = window.URL.createObjectURL(imgFile)
    getBase64(imgFile)

    event.target.value = null    
}

const getBase64 = (file) =>{
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        emit('upload', reader.result, imgFileName.value)
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
    <h2>2. 上傳照片</h2>
    <section>
        <p>僅支援png, jpeg, jpg，建議使用較為清晰的圖片</p>
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
                上傳照片
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
