<!-- Breadcrumb.vue -->
<template>
    <nav aria-label="breadcrumb" class="mb-5">
      <ol class="breadcrumb">
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          class="breadcrumb-item text-md"
          :class="{ active: index === breadcrumbs.length - 1 }"
        >
          <router-link v-if="index < breadcrumbs.length - 1" :to="breadcrumb.path" class="mr-2 text-primary">{{ breadcrumb.name }}</router-link>
          <span v-else class="ml-2 text-primary">{{ breadcrumb.name }}</span>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
import Breadcrumb from '@/components/template/private/Breadcrumb.vue';
  
  const route = useRoute();
  const router = useRouter();
  
  const breadcrumbs = computed(() => {
    let matched = route.matched.filter(r => r.meta && r.meta.breadcrumb)
    return matched.map(r => {
      return {
        path: r.path,
        name: r.meta.breadcrumb
      }
    })
  })
  </script>
  
  <style scoped>
  .breadcrumb {
    /* padding: 0.5rem 1rem; */
    /* background-color: #f8f9fa; */
    border-radius: 0.25rem;
    display: flex;
  }
  .breadcrumb-item + .breadcrumb-item::before {
    content: "|";
    color: var(--color-primary);
  }
  .breadcrumb-item.active {
    font-weight: bold;
  }
  </style>
  