<script setup>
import { onMounted, reactive } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger.js'
import { Collapse } from '../lib/collapse'
import { projects as projectData } from '../data.json'

gsap.registerPlugin(ScrollTrigger)

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
  gsap.to('.projects-cta', {
    duration: 0.3,
    x: -20,
    opacity: 0,
    scrollTrigger: { start: 2, end: 3, toggleActions: 'play none none reverse' },
  })

  // reveal project list on scroll
  gsap.from('.projects-label', {
    duration: 0.3,
    x: 20,
    opacity: 0,
    scrollTrigger: { start: 2, end: 3, toggleActions: 'play none none reverse' },
  })
  gsap.from('.project-item', {
    duration: 0.3,
    delay: 0.6,
    x: 20,
    opacity: 0,
    stagger: 0.05,
    scrollTrigger: { start: 2, end: 3, toggleActions: 'play none none reverse' },
  })

  // reveal project images on title hover
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
        xPercent: -50,
        yPercent: -10 * (index + 1),
        stagger: 0.05,
      })
    })
  })
})
</script>

<template>
  <div class="projects">
    <div class="projects-cta mb-20 flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        class="w-6 h-6 -translate-x-[50%]"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
      </svg>
    </div>
    <h5 class="projects-label font-body text-xs mb-20">recent projects</h5>
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
        <span class="font-bold">{{ project.title }}</span>
        <img :src="project.image" alt="" class="project-image" />
      </div>

      <Collapse as="section" :when="project.isExpanded" class="v-collapse">
        <div class="project-details">
          <img :src="project.image" alt="" class="project-thumbnail" />
          <p>{{ project.description }} — {{ project.year }}: {{ project.role }}</p>
          <p>
            <a :href="project.url" target="_blank" className="flex items-center gap-1">
              visit site
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </p>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<style scoped>
.projects {
  @apply p-8 md:p-16 max-w-7xl overflow-hidden mb-20;
}

.project-item {
  @apply relative flex flex-col items-start;
}

.project-title {
  @apply leading-none text-2xl lg:text-5xl font-body transition ease-in-out duration-300 cursor-pointer select-none flex items-center uppercase;
}

.project-item:hover .project-title {
  @apply text-green;
}

.project-thumbnail {
  @apply md:hidden block my-4;
}

.project-image {
  @apply hidden md:block md:w-[440px] xl:w-[720px] opacity-0 absolute left-1/2 top-1/2 -translate-y-[-50%] -translate-x-[-50%] pointer-events-none;
}

.project-details {
  @apply flex flex-col items-start m-0 pb-5;
}

.project-details p {
  @apply text-[12px] max-w-[350px] my-2;
}
</style>
