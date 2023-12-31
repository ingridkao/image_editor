<script setup lang="ts">
import { ref, reactive, watch  } from 'vue'
const props = defineProps<{
    fileName: string,
    photeCropFile: any,
    stageObj: any
}>()

// 螢幕寬度的內距
// const windowPadding = 64
// 預留給瀏覽器的scrollbar寬度
// const scrollbar = 18
// const width = window.innerWidth - windowPadding - scrollbar
// 外殼stage
const aspectRatio:number = 418/333
const width:number = 600
const height:number = width/aspectRatio
const configStage = reactive ({
    width: width,
    height: height,
    fill: '#f7f7f7'
})

// 浮水印
const watermarkObj = new Image()
watermarkObj.src = '/D23-01940_1300X1656_h.png'
const watermarkRatio = 1300/1656
const configWatermark = reactive ({
    x: 0,
    y: 0,
    width: width,
    height: height,
    image: watermarkObj
})

watch(
    () => props.stageObj,
    (stageObj) => {
        if(stageObj.width && stageObj.height) {
            configStage.width = stageObj.width
            configStage.height = stageObj.height

            configWatermark.width = stageObj.width
            // 讓浮水印垂直置中
            const imgH = stageObj.width/watermarkRatio
            configWatermark.height = imgH
            configWatermark.y = -(imgH - stageObj.height) /2
        }
    },
    {deep: true}
)

// 照片
const imageObj = new Image()
const configImageRect = reactive ({
    name: 'downloadImage',
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: width,
    height: height,
    image: imageObj
})

watch(
    () => props.photeCropFile,
    () => {
        configImageRect.width = props.photeCropFile.width
        configImageRect.height = props.photeCropFile.height

        configImageRect.x = props.photeCropFile.x
        configImageRect.y = props.photeCropFile.y
        configImageRect.rotation = props.photeCropFile.rotation

        configImageRect.image = props.photeCropFile.image
        configImageRect.scaleX = props.photeCropFile.scaleX
        configImageRect.scaleY = props.photeCropFile.scaleY
    },
    {deep: true}
)

const stageRef = ref()
const downloadURI = () => {
    const dataURL = stageRef.value.getStage().toDataURL({ pixelRatio: 1.5 })
    const link = document.createElement('a')

    const simpleName = props.fileName.split('.')
    
    link.download = `${simpleName[0]}_${new Date().getTime()}.png`
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const watermark = ref(false)
</script>

<template>
    <section>
        <div class="cropFileBox">
            <div>
                <p>預覽</p>
                <input type="checkbox" v-model="watermark" />
                <label for="scales">浮水印</label>
            </div>
            <button @click="downloadURI" class="green">
                另存圖檔
            </button>
        </div>
        <div class="cropFileBoxKkonvaContent">
            <v-stage ref="stageRef" :config="configStage">
                <v-layer>
                    <v-image :config="configImageRect" />
                </v-layer>
                <v-layer v-if="watermark">
                    <v-image :config="configWatermark" />
                </v-layer>
            </v-stage>
        </div>

    </section>
</template>

<style>
.cropFileBox{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
}
.cropFileBox button{
    font-weight: bold;
}
.cropFileBoxKkonvaContent{
    background-color: #f7f7f7;
}
</style>
