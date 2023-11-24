<script setup lang="ts">
import { format, aspectRatio, type FormatItemTypes } from '../assets/format'

import { ref, reactive, watch  } from 'vue'
const props = defineProps<{
    targetKey: string,
    photoFile: string,
}>()

const width:number = 150
const height:number = Math.round(width*aspectRatio)

const configKonva = reactive ({
    width: width,
    height: height
})
const configBgRect = reactive ({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: "#ddd"
});

const imageObj = new Image()
imageObj.src = '/demo.jpg'
const configRect = reactive ({
    x: 0,
    y: 0,
    width: width,
    height: height,
    image: imageObj,
    draggable: true,
})
// 上傳圖片和width比率
// const updateRect = () => {
//     const targetFormat = (format[props.targetKey]? format[props.targetKey]: {}) as FormatItemTypes
//     const {w, h, row, col, gap} = targetFormat
//     const translateRatio = Math.round(width/width)

//     configRect.width = w*translateRatio || 0
//     configRect.height = h*translateRatio || 0
// }
const updateImage = () => {
    // ToDo 裁切圖片
    const images = new Image()
    images.src = props.photoFile    
    images.onload = (e:any) => {
        if(e && e.target){
            const translateRatio = e.target.width/width
            configRect.width = e.target.width/translateRatio || 0
            configRect.height = e.target.height/translateRatio || 0
        }
        configRect.image = images
    }
}
// watch(
//     () => props.targetKey,
//     (targetKey) => {
//         if(targetKey) updateRect()
//     },{ immediate: true }
// )
watch(
    () => props.photoFile,
    (photoFile) => {
        if(photoFile) updateImage()
    },{immediate: true}
)
const commitFile = (event:any) => {
  
}

</script>

<template>
    <section>
        <h2>
            編輯照片
        </h2>
        <div class="canvas">
            <v-stage ref="cropRef" :config="configKonva">
                <v-layer>
                    <v-rect :config="configBgRect" />
                    <v-image :config="configRect" />
                </v-layer>
            </v-stage>
        </div>
        <div>
            <button @click="commitFile">
                編輯完成
            </button>
        </div>
    </section>
</template>
