<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import Projects from './components/Projects.vue'
import { links } from './data.json'

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  const titleText = new SplitType('.title', { types: 'chars' })

  tl.fromTo(
    titleText.chars,
    {
      y: 100,
      opacity: 0,
      duration: 2,
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
      duration: 1,
    })
    .to('.links', {
      x: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
    })
})
</script>

<template>
  <header>
    <div class="container mx-auto flex justify-center p-4 md:p-10 text-center">
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
    <Projects />
  </main>

  <footer class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 md-mb-0">
    <div class="p-4 md:p-10">
      <p class="mb-0">freelance developer <br />Brooklyn, New York</p>
    </div>
    <div class="p-4 md:p-10">
      <p class="mb-0 text-right md:text-center">
        <a href="mailto:mikecicc@gmail.com">email</a> — <a href="https://twitter.com/mciccarelli">twitter</a> <br />
        <a href="https://instagram.com/minorvillain">Instagram</a> — <a href="https://github.com/mciccarelli">Github</a>
      </p>
    </div>
    <div class="p-4 md:p-10 col-span-2 md:col-span-1">
      <p class="mb-0 text-center md:text-right">All Rights reserved. <br />Michael Ciccarelli &copy; 2023</p>
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
  @apply container mx-auto lg:w-[1100px] mx-auto px-4 md:px-10 relative opacity-0 translate-y-[50px] mb-32;
}
.intro p {
  @apply text-lg md:text-3xl lg:text-5xl leading-none tracking-tight;
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
