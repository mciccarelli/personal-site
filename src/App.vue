<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import SplitType from 'split-type'
import Projects from './components/Projects.vue'
import { links } from './data.json'

onMounted(() => {
  const tl = gsap.timeline()
  const titleText = new SplitType('.title__text', { types: 'chars' })

  tl.fromTo(
    titleText.chars,
    {
      y: 100,
      opacity: 0,
      duration: 1,
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
    }
  )
    .from('.intro__text', {
      y: 10,
      opacity: 0,
      blur: 8,
      duration: 0.2,
    })
    .to('.links', {
      opacity: 1,
      duration: 0.2,
    })
    .to('.links__link', { duration: 0.3, x: 0, opacity: 1, stagger: 0.05 })
})
</script>

<template>
  <header>
    <div class="title">
      <h1 class="title__text">Ciccarelli</h1>
    </div>
  </header>
  <main>
    <div class="intro">
      <p class="intro__text">
        <span class="font-display italic mb-8">Michael Ciccarelli</span> is a software engineer living in brooklyn, new
        york focused on frontend and javascript development. he works with companies, agencies, startups, and
        individuals to build websites, apps, and bespoke digital products. Available for freelance work
      </p>
      <ul class="links">
        <li v-for="link in links" :key="link.title" class="links__link">
          <a :href="link.url" target="_blank">{{ link.title }}<span>↗</span></a>
        </li>
      </ul>
    </div>
    <Projects />
  </main>
  <footer class="flex justify-between">
    <p class="mb-0 p-10">
      freelance developer<br />bk, ny &bull; <a href="mailto:mikecicc@gmail.com">Email</a> &bull;
      <a href="https://twitter.com/mciccarelli">Twitter</a>
    </p>
    <p class="p-10 mb-0 text-right">All Rights reserved. <br />Michael Ciccarelli &copy; 2023</p>
  </footer>
</template>

<style scoped>
.title {
  @apply container mx-auto flex justify-center p-10 text-center;
}
.title__text {
  @apply font-display leading-none will-change-transform whitespace-nowrap;
  font-size: clamp(1rem, -0.875rem + 18vw, 16.2rem);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.intro {
  @apply container mx-auto lg:w-[1100px] mx-auto px-10 relative mb-10 lg:mb-32;
}

.intro__text {
  @apply text-2xl md:text-3xl lg:text-5xl leading-none tracking-tight xl:indent-32 mb-8 xl:mb-0;
}

.links {
  @apply xl:absolute xl:-bottom-[120px] xl:left-10 opacity-0 mb-0;
}

.links__link:hover span {
  @apply opacity-100;
}

.links__link {
  @apply text-[16px] ml-px opacity-0 translate-x-[-50px];
}
</style>
