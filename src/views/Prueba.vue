
<template>
    <div class="m-32">
        <h1>Hola desde Test</h1>
        <div>{{ mensaje }}</div>
        <div class="mt-10 text-red-400 bg-slate-600">El resultado es: {{ resultado }}</div>

    </div>
</template>

<script setup>
import { ref } from 'vue';

const mensaje = ref('variable');

// Declaracion e inicialización
const num1 = ref(0);
const num2 = ref(0);
const resultado = ref(0);

// Asignando valor
num1.value = 10;
num2.value = 20;

// Procesando
resultado.value = num1.value + num2.value;
console.log(resultado.value);


</script>

<style lang="scss" scoped>

</style>