<script setup>
import { ref  } from 'vue'
import { position } from '../assets/format'
defineEmits(["update"])
const clipSelect = ref('')

</script>

<template>
    <h2>
        2.選擇圖片位置
    </h2>
    <section>
        <select v-model="clipSelect" @change="$emit('update', clipSelect)">
            <option value="">請選擇</option>
            <option 
                v-for="(item, key) in position" 
                :key="key"
                :value="key"
                @click="$emit('update', key)"
            >
                {{ item.name }}
            </option>
        </select>
    </section>
</template>
