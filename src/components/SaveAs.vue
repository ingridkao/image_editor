<script setup lang="ts">
import { format, aspectRatio, printW, type FormatItemTypes } from '../assets/format'
import { ref, reactive, watch  } from 'vue'
const props = defineProps<{
    targetKey: string,
    photoFile: string,
}>()

// 螢幕寬度的內距
// const windowPadding = 64
// 預留給瀏覽器的scrollbar寬度
// const scrollbar = 18
// const width = window.innerWidth - windowPadding - scrollbar
const width:number = 320
const height:number = Math.round(width/aspectRatio)

const configKonva = reactive ({
    width: width,
    height: height,
});
const configBgRect = reactive ({
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: "#ddd"
});

const imageObj = new Image()
imageObj.src = '/demo.jpg'

// 螢幕上尺寸和實際列印比率
const translateRatio = Math.round(width/printW)
const configRect = reactive ({
    // x: 0,
    // y: 0,
    width: 28*translateRatio,
    height: 35*translateRatio,
    stroke: "#ddd",
    strokeWidth: 1,
    image: imageObj
});

const printLayout = reactive ({
    row: 2,
    col: 4,
    gap: 15
})

const updateRect = () => {
    const targetFormat = (format[props.targetKey]? format[props.targetKey]: {}) as FormatItemTypes
    const {w, h, row, col, gap} = targetFormat
    configRect.width = w*translateRatio || 0
    configRect.height = h*translateRatio || 0
    printLayout.row = row || 1
    printLayout.col = col || 1
    printLayout.gap = gap || 10
}
const updateImage = () => {
    // ToDo 裁切圖片
    const images = new Image()
    images.src = props.photoFile    
    images.onload = (e:any) => {
        if(e && e.target){
            console.log(e.target.width);
            console.log(e.target.height);
        }
        configRect.image = images
    }
}

watch(
    () => props.targetKey,
    (targetKey) => {
        if(targetKey) updateRect()
    },{ immediate: true }
)
watch(
    () => props.photoFile,
    (photoFile) => {
        if(photoFile) updateImage()
    },{immediate: true}
)

const stageRef = ref()
const downloadURI = () => {
    const dataURL = stageRef.value.getStage().toDataURL()

    const link = document.createElement('a')
    link.download = 'stage.png'
    link.href = dataURL
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
}

</script>

<template>
    <section>
        <h2>
            預覽
        </h2>
        <v-stage ref="stageRef" :config="configKonva">
            <v-layer>
                <v-rect :config="configBgRect" />
                <template v-for="rows in printLayout.row" :key="rows">
                    <v-image 
                        v-for="cols in printLayout.col"
                        :key="cols"
                        :config="{
                            ...configRect, 
                            x: ((cols-1)*(configRect.width + printLayout.gap) + printLayout.gap), 
                            y: ((rows-1)*(configRect.height + printLayout.gap) + printLayout.gap)
                        }"
                    />
                </template>
            </v-layer>
        </v-stage>
        <button @click="downloadURI">
            另存
        </button>
    </section>
</template>

<style>
</style>
