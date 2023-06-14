<script setup>
defineProps({
  projects: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul>
    <li v-for="project in projects" :key="project.id" class="flex justify-between">
      <span>
        <a :href="project.url" target="_blank">{{ project.title }} <span class="text-[14px]">↗</span></a>
      </span>
      <span>{{ project.year }}</span>
    </li>
  </ul>
</template>
