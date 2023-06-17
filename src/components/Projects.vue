<script setup>
import { onMounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { Collapse } from '../lib/collapse'
import { projects as projectData } from '../data.json'

const projects = reactive(
  projectData.map(({ id, title, description, year, role, image, url }, index) => ({
    title,
    description,
    year,
    role,
    image,
    url,
    isExpanded: false,
  }))
)

function handleAccordion(selectedIndex) {
  projects.forEach((_, index) => {
    projects[index].isExpanded = index === selectedIndex ? !projects[index].isExpanded : false
  })
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
      gsap.set(image, {
        x: e.offsetX,
        y: e.offsetY,
        xPercent: -100,
        yPercent: -10 * (index + 1),
        stagger: 0.05,
      })
    })
  })
})
</script>

<template>
  <div class="p-4 md:p-10 text-right overflow-hidden mb-20">
    <h5>Projects</h5>
    <div v-for="(project, index) in projects" :key="project.title" class="project-item">
      <div
        class="project-title"
        :class="[
          'panel',
          {
            Active: project.isExpanded,
            'text-green': project.isExpanded,
          },
        ]"
        @click="handleAccordion(index)"
      >
        <span>{{ project.title }}</span>
        <img :src="project.image" alt="" class="project-image" />
      </div>

      <Collapse as="section" :when="project.isExpanded" class="v-collapse">
        <div class="project-details">
          <img :src="project.image" alt="" class="project-thumbnail" />
          <p>{{ project.description }} — {{ project.year }}: {{ project.role }}</p>
          <p>
            <a :href="project.url" target="_blank">visit site <span class="text-[14px]">↗</span></a>
          </p>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<style scoped>
.project-item {
  @apply relative text-right flex flex-col items-end;
}

.project-title {
  @apply text-3xl xl:text-5xl font-display transition ease-in-out duration-300 cursor-pointer select-none flex items-center uppercase;
}

.project-item:hover .project-title {
  @apply text-green;
}

.project-thumbnail {
  @apply md:hidden block mb-4;
}

.project-image {
  @apply hidden md:block md:w-[440px] xl:w-[720px] opacity-0 absolute left-1/2 top-1/2 -translate-y-[-50%] -translate-x-[-50%] pointer-events-none;
}

.project-details {
  @apply flex flex-col items-end text-right m-0 pb-5;
}

.project-details p {
  @apply text-[12px] max-w-[350px] mb-2;
}
</style>
