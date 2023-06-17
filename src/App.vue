<script setup>
import { ref, onMounted } from 'vue'
import Projects from './components/Projects.vue'
import { gsap } from 'gsap'
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin.js'
import SplitType from 'split-type'

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

onMounted(() => {
  fetchData()
  const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power4.out' } })
  const titleText = new SplitType('.title', { types: 'chars' })

  tl.fromTo(
    titleText.chars,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 2,
      ease: 'power4.out',
    }
  )
    .to('.intro', {
      y: 0,
      opacity: 1,
      stagger: 0.05,
    })
    .to('.links', {
      x: 0,
      opacity: 1,
      stagger: 0.05,
    })
})
</script>

<template>
  <header>
    <div class="container mx-auto flex justify-center p-8 text-center">
      <h1 class="title">Ciccarelli</h1>
    </div>
  </header>

  <main>
    <div class="intro">
      <p class="xl:indent-32 mb-0">
        <span class="font-display italic">Michael Ciccarelli</span> is a software engineer living in brooklyn, new york
        focusing on javascript & ui development for over a decade, he has worked with companies, creative agencies,
        startups, and individuals to build websites, web apps, and other digital products.
      </p>
      <p class="mb-8">Available for freelance: july 2023</p>

      <ul class="links mb-0">
        <li v-for="link in links" :key="link.title" class="text-[16px]">
          <a :href="link.url" target="_blank">{{ link.title }}<span>↗</span></a>
        </li>
      </ul>
    </div>

    <Projects :projects="data.projects" v-if="data && data?.projects?.length > 0" />
  </main>

  <footer class="grid grid-cols-3 gap-4 opacity-50">
    <div class="p-10">
      <p class="mb-0">freelance developer <br />Brooklyn, New York</p>
    </div>
    <div class="p-10 text-center">
      <p class="mb-0">
        <a href="mailto:mikecicc@gmail.com">email</a> — <a href="https://twitter.com/mciccarelli">twitter</a> <br />
        <a href="https://instagram.com/minorvillain">Instagram</a> — <a href="https://github.com/mciccarelli">Github</a>
      </p>
    </div>
    <div class="p-10">
      <p class="mb-0 text-right">All Rights reserved. <br />Michael Ciccarelli &copy; 2023</p>
    </div>
  </footer>
</template>

<style scoped>
.title {
  @apply font-display leading-none will-change-transform whitespace-nowrap;
  font-size: clamp(1rem, -0.875rem + 18vw, 16.2rem);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
.intro {
  @apply container mx-auto lg:w-[1100px] mx-auto px-8 relative opacity-0 translate-y-[50px] mb-32;
}
.intro p {
  @apply text-2xl lg:text-5xl leading-none tracking-tight;
}
.links {
  @apply xl:absolute xl:bottom-[6px] xl:right-32 opacity-0 -translate-x-[50px];
}
.links li:hover span {
  @apply opacity-100;
}

.links li span {
  @apply text-[20px] opacity-0 transition-opacity duration-300 ease-in-out ml-px;
}
</style>
