<script setup>
import { format } from '../assets/format'
defineEmits(["update"])
</script>

<template>
    <h2>
        1. 輸出尺寸格式
    </h2>
    <section>
        <p>選取輸出尺寸</p>
        <div>
            <button 
                v-for="(item, key) in format" 
                :key="key"
                @click="$emit('update', key)"
            >
                <h5>{{ item.name }}</h5>
                <h6>({{ item.w }} X {{ item.h }} px)</h6>
            </button>
        </div>
    </section>
</template>
