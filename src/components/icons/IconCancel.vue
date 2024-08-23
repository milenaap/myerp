<template>
    <svg xmlns="http://www.w3.org/2000/svg" :class="[className]" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"/></svg>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    className: {
        type: String,
        default: 'w-6 h-6 mr-1',
    }
})
</script>