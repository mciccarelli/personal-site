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
  <ul class="w-[440px]">
    <li v-for="project in projects" :key="project.id" class="project-item" @click="toggleProject(project.id)">
      <div class="flex justify-between">
        <span
          class="cursor-pointer hover:text-green select-none"
          :class="{ 'text-green': activeProject === project.id }"
        >
          <span class="mr-2"><span v-if="activeProject === project.id">[ - ]</span><span v-else>[ + ]</span></span>
          <span>{{ project.title }}</span>
        </span>
        <span v-if="activeProject === project.id">
          <a :href="project.url" target="_blank">visit site <span class="text-[14px]">↗</span></a>
        </span>
      </div>
      <Transition duration="550" name="nested">
        <div v-if="activeProject === project.id" class="project-details flex flex-col space-y-4 py-4">
          <img :src="project.image" alt="" class="project-image" />
          <div class="flex justify-between">
            <p class="description pr-10 mb-0">{{ project.description }}</p>
            <p class="whitespace-nowrap mb-0">
              {{ project.year }}
            </p>
          </div>
        </div>
      </Transition>
    </li>
  </ul>
</template>

<style scoped>
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
