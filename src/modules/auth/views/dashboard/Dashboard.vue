<template>
  <div v-animate>
    <h1>Dashboard</h1>

    <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Card 1: Resumen de Ventas del Día -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Resumen de Ventas del Día</h2>
        <p class="text-gray-700">Total Ventas: €</p>
        <p class="text-gray-700">Dispositivos Vendidos: </p>
        <p class="text-gray-700">Promedio por Venta: €</p>
      </div>

      <!-- Card 2: Alquileres Activos -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Alquiler Dispositivos</h2>
        <p class="text-gray-700">Dispositivos en Alquiler: </p>
        <p class="text-gray-700">Importe Total: €</p>
        <p class="text-gray-700">Próxima Fecha de Devolución: </p>
      </div>

      <!-- Card 3: Clientes Recientes -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold mb-4">Clientes Recientes</h2>
        <ul class="list-disc list-inside text-gray-700">
          <li>Cliente 1</li>
          <li>Cliente 2</li>
          <li>Cliente 3</li>
        </ul>
        <p class="text-gray-700 mt-2">Total Clientes Nuevos: 3</p>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>