<script setup>
import { ref, onMounted } from 'vue'
import Links from './components/Links.vue'
import Projects from './components/Projects.vue'

const links = ref([
  { title: 'Email', url: 'mailto:mikecicc@gmail.com' },
  { title: 'Twitter', url: 'https://twitter.com/mciccarelli' },
  { title: 'Github', url: 'https://github.com/mciccarelli' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/mciccarelli/' },
  { title: 'Instagram', url: 'https://www.instagram.com/minorvillain/' },
])

const data = ref({ projects: [] })

const fetchData = async () => {
  await fetch('/data.json')
    .then((response) => response.json())
    .then((result) => (data.value.projects = result.projects))
}

onMounted(fetchData)
</script>

<template>
  <header class="flex justify-between items-center p-10">
    <div>
      <p class="w-[220px] leading-none">
        Michael Ciccarelli is a NYC based software engineer specializing in frontend & ui development
      </p>

      <Links :links="links" />
      <Projects :projects="data.projects" v-if="data && data?.projects?.length > 0" />
    </div>
  </header>

  <footer class="fixed bottom-0 left-0 w-full">
    <div class="flex items-end justify-between p-10 w-full">
      <div class="w-60">
        <p class="mb-0">[ ! ] available for freelance: <a href="mailto:mikecicc@gmail.com">july 2023</a></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
header h1 {
  @apply font-display leading-none mt-10 relative text-2xl;
  /* font-size: clamp(1rem, -0.875rem + 18vw, 16.2rem); */
}
</style>
