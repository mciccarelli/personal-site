<script setup>
import { ref } from 'vue'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

const projects = ref(props.projects)
const activeProject = ref(null)

function toggleProject(id) {
  if (activeProject.value === id) {
    activeProject.value = null
    return
  } else {
    activeProject.value = id
  }
}
</script>

<template>
  <h5>Projects</h5>
  <ul class="w-full md:w-96">
    <li v-for="project in projects" :key="project.id" class="project-item" @click="toggleProject(project.id)">
      <div class="flex justify-between">
        <span class="project-title" :class="{ 'text-green': activeProject === project.id }">
          <span v-if="activeProject === project.id"
            >[
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
              <path d="M6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" />
            </svg>
            ]</span
          ><span v-else
            >[
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3">
              <path
                d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
              />
            </svg>
            ]</span
          >
          <span>{{ project.title }}</span>
        </span>
        <span v-if="activeProject === project.id">
          <a :href="project.url" target="_blank">visit site <span class="text-[14px]">↗</span></a>
        </span>
      </div>
      <Transition duration="550" name="nested">
        <div v-if="activeProject === project.id" class="project-details flex flex-col space-y-4 py-4">
          <a :href="project.url" target="_blank" class="project-image">
            <img :src="project.image" alt="" />
          </a>

          <div class="flex justify-between">
            <p class="description mb-0">{{ project.description }} — {{ project.year }}: {{ project.role }}</p>
          </div>
        </div>
      </Transition>
    </li>
  </ul>
</template>

<style scoped>
.project-title {
  @apply transition ease-in-out duration-300 cursor-pointer select-none flex items-center;
}

.project-title > span {
  @apply flex items-center mr-2;
}

.project-title > span > span {
  @apply flex items-center;
}

.project-item:hover .project-title {
  @apply text-green;
}

.project-details,
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.nested-enter-active .project-image,
.nested-leave-active .project-image {
  transition: all 0.3s ease-in-out;
}

.nested-enter-active .project-image {
  transition-delay: 0.25s;
}

.nested-enter-from .project-image,
.nested-leave-to .project-image {
  transform: translateX(-30px);
  opacity: 0.001;
}
</style>
