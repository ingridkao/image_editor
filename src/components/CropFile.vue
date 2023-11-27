<script setup lang="ts">
import { format, type FormatItemTypes } from '../assets/format'
import { ref, reactive, watch  } from 'vue'
const emit = defineEmits(["uploadBg", "uploadImg"])
const props = defineProps<{
    targetKey: string,
    targetPos: string,
    photoFile: string,
}>()

// 外殼stage
const aspectRatio:number = 6/4
const width:number = 600
const height:number = width/aspectRatio
const configStage = reactive ({
    width: width,
    height: height
})



// 底圖
const configBackRect = reactive ({
    name: 'backColor',
    width: width,
    height: height,
    fill: "#ddd"
})



// 照片
const imageObj = new Image()
// imageObj.src = '/D23-01940_1656X890_v.png'
const configImageRect = reactive ({
    name: 'uploadImage',
    x: 0,
    y: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    width: width,
    height: height,
    image: imageObj,
    draggable: true
})
const updateImage = () => {
    const images = new Image()
    images.src = props.photoFile    
    images.onload = (e:any) => {
        if(e && e.target){
            const translateRatio = e.target.width/configStage.width
            configImageRect.width = e.target.width/translateRatio || 0
            configImageRect.height = e.target.height/translateRatio || 0
        }
        configImageRect.image = images
        emit('uploadImg', configImageRect)
    }
}
watch(
    () => props.photoFile,
    (photoFile) => {
        if(photoFile) updateImage()
    }
)

// Transformer: 調整尺寸及旋轉節點
const selectedShapeName = ref('')
const transformer = ref()
const handleStageMouseDown = (e) => {
    //沒有上傳不顯示Transformer
    if(!props.photoFile) return
    
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
        selectedShapeName.value = ''
        updateTransformer()
        return
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer'
    if (clickedOnTransformer) return

    // clicked on img
    const name = e.target.name()
    selectedShapeName.value = (name === 'uploadImage') ? name: ''
    updateTransformer()
}

const updateTransformer = () => {
    const transformerNode = transformer.value.getNode()
    const stage = transformerNode.getStage()
    const selectedNode = stage.findOne('.' + selectedShapeName.value)
    
    if (selectedNode === transformerNode.node()) return

    if (selectedNode) {
        // attach to another node
        transformerNode.nodes([selectedNode])
        
    }else{
        // remove transformer
        transformerNode.nodes([]);
    }
    // 希望盡可能快地更新 Konva 形狀，但不會導致太多的重繪。
    transformerNode.getLayer().batchDraw()
}

const handleTransformEnd = (e) => {
    // 旋轉伸縮才會觸發
    // 移動不會觸發
    configImageRect.x = e.target.x()
    configImageRect.y = e.target.y()
    configImageRect.rotation = e.target.rotation()
    configImageRect.scaleX = e.target.scaleX()
    configImageRect.scaleY = e.target.scaleY()

    emit('uploadImg', configImageRect)
}

const handleDragEnd = () =>{
    const transformerNode = transformer.value.getNode()
    if(!transformerNode.attrs) return

    const stage = transformerNode.getStage()
    const selectedNode = stage.findOne('.' + selectedShapeName.value)
    if(!selectedNode.attrs) return

    if (selectedNode.attrs.name !== 'uploadImage') return
    // deep clone
    emit('uploadImg', {...selectedNode.attrs})

}

// 變更輸出尺寸格式
const updateRect = () => {
    const targetFormat = (format[props.targetKey]? format[props.targetKey]: {}) as FormatItemTypes
    const {w, h} = targetFormat
    const translateRatio = (w/h)
    configStage.width = 600
    configStage.height = width/translateRatio
    configBackRect.width = configStage.width
    configBackRect.height = configStage.height
    configImageRect.width = configStage.width
    configImageRect.height = configStage.height

    emit('uploadBg', configStage)
}

watch(
    () => props.targetKey,
    (targetKey) => {
        if(targetKey) updateRect()
    }
)

// const commitFile = (event:any) => {
//     emit('upload', configImageRect)
// }

// 下拉選單選取圖片位置
// const applyCrop = (pos) => {
//     // const img = layer.findOne('.image');
//     // img.setAttr('lastCropUsed', pos);
//     // const crop = getCrop(
//     //     img.image(),
//     //     { width: img.width(), height: img.height() },
//     //     pos
//     // );
//     // img.setAttrs(crop);
// }
// watch(
//     ()=>props.targetPos,
//     (newOption, oldOption) => {
// //     // if (newOption === '' || newOption === '--') return 
// //     // applyCrop(newOption)
//     }
// )

</script>

<template>
    <h2>3. 拖拉及旋轉照片</h2>
    <section>
        <p>依據步驟一、二、三設定更新預覽圖檔</p>
        <div class="canvas">
            <v-stage 
                ref="cropRef" 
                :config="configStage"
                @mousedown="handleStageMouseDown"
                @touchstart="handleStageMouseDown"  
            >
                <v-layer>
                    <v-rect 
                        :config="configBackRect"
                    />
                    <v-image 
                        :config="configImageRect"
                        @dragend="handleDragEnd"
                        @transformend="handleTransformEnd"
                    />
                    <v-transformer 
                        ref="transformer" 
                        :config="{
                            keepRatio: true,
                            centeredScaling: true,
                            rotationSnaps: [0, 90, 180, 270]
                        }"
                    />
                </v-layer>
            </v-stage>
        </div>
        <!-- <div>
            <button @click="commitFile">
                編輯完成
            </button>
        </div> -->
    </section>
</template>
