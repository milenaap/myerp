

<template>
    <div class="m-32">
        <h1>Hola desde Prueba 2</h1>
        <div class="m-32">El resultado es: {{ resultado }}</div>
      
    </div>
</template>

<script setup>

import { ref } from 'vue';


const num1 = ref(0);
const num2 = ref(0);
const resultado = ref(0);

num1.value = 155;
num2.value = 286;


resultado.value = num1.value + num2.value;
console.log(resultado.value);


</script>

<style lang="scss" scoped>

</style>