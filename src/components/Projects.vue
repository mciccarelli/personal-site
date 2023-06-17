<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

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

onMounted(() => {
  let targets = gsap.utils.toArray('.project-item')

  targets.forEach((el, index) => {
    const text = el.querySelector('.project-title')
    const image = el.querySelector('.project-image')

    text.addEventListener('mouseenter', (e) => {
      gsap.to(image, { autoAlpha: 1 })
    })

    text.addEventListener('mouseleave', (e) => {
      gsap.to(image, { autoAlpha: 0 })
    })

    text.addEventListener('mousemove', (e) => {
      //gsap.set(image, { x: e.offsetX - 200 })
      gsap.set(image, {
        x: e.offsetX,
        y: e.offsetY,
        xPercent: -175,
        yPercent: -10 * (index + 1),
        stagger: 0.05,
      })
    })
  })
})
</script>

<template>
  <div class="p-10 text-right overflow-hidden mb-20">
    <h5>Projects</h5>
    <ul class="w-full text-right p-0 m-0">
      <li
        v-for="project in projects"
        :key="project.id"
        class="project-item text-right flex flex-col items-end"
        @click="toggleProject(project.id)"
      >
        <div class="flex justify-end relative">
          <span class="project-title" :class="{ 'text-green': activeProject === project.id }">
            <span>{{ project.title }}</span>
          </span>
          <img
            :src="project.image"
            alt=""
            class="project-image"
            :class="{ 'project-image--active': activeProject === project.id }"
          />
        </div>
        <Transition duration="550" name="nested">
          <div v-if="activeProject === project.id" class="project-details flex flex-col space-y-4 py-4 mb-4">
            <!-- <img :src="project.image" alt="" class="project-image" /> -->

            <div class="flex flex-col items-end text-right m-0">
              <p class="description mb-4 p-0 max-w-[280px]">
                {{ project.description }} — {{ project.year }}: {{ project.role }}
              </p>
              <a :href="project.url" target="_blank">visit site <span class="text-[14px]">↗</span></a>
            </div>
          </div>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project-details {
  @apply flex flex-row space-x-4;
}

.project-title {
  @apply text-5xl font-display transition ease-in-out duration-300 cursor-pointer select-none flex items-center;
}

.project-title > span {
  @apply flex items-center ml-2;
}

.project-title > span > span {
  @apply flex items-center;
}

.project-item:hover .project-title {
  @apply text-green;
}

.project-image {
  @apply max-w-[300px] md:max-w-[500px] xl:max-w-[720px] opacity-0 absolute left-1/2 top-1/2 -translate-y-[-50%] -translate-x-[-50%] pointer-events-none;
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
