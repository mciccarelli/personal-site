<script setup>
defineProps({
  links: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <h5>Contact</h5>
  <ul>
    <li v-for="link in links" :key="link.title">
      <a :href="link.url" target="_blank">{{ link.title }} <span class="text-[14px]">↗</span></a>
    </li>
  </ul>
</template>
