<script setup>
import About from './components/About.vue'
import CMark from './components/CMark.vue'
import Links from './components/Links.vue'
import Logo from './components/Logo.vue'
import Projects from './components/Projects.vue'
</script>

<script>
export default {
  components: {
    About,
    CMark,
    Links,
    Logo,
    Projects,
  },
  data() {
    return {
      aboutmode: false,
      links: [
        { title: 'Email', url: 'mailto:mikecicc@gmail.com' },
        { title: 'Twitter', url: 'https://twitter.com/mciccarelli' },
        { title: 'Github', url: 'https://github.com/mciccarelli' },
        { title: 'LinkedIn', url: 'https://www.linkedin.com/in/mciccarelli/' },
        { title: 'Instagram', url: 'https://www.instagram.com/minorvillain/' },
      ],
      projects: [
        { title: 'pod.xyz', url: 'https://pod.xyz', year: 2022 },
        { title: 'The BAR', url: 'https://amazonthe.bar', year: 2022 },
        { title: 'ELARA.WORLD', url: 'https://elara.world', year: 2021 },
        { title: 'The Well', url: 'https://the-well.com', year: 2020 },
        { title: 'Revolve Law', url: 'https://revolvelawgroup.com', year: 2019 },
        { title: 'Common Studio', url: 'https://common.com/studio', year: 2018 },
        { title: 'G9 Ventures', url: 'https://g9.ventures', year: 2018 },
        { title: 'Venn Skincare', url: 'https://vennskincare.com', year: 2017 },
        { title: 'VICE TV', url: 'https://vicetv.com', year: 2016 },
        { title: 'Design Tool', url: 'https://dt.filzfelt.com', year: 2016 },
      ],
    }
  },
  methods: {
    toggleAbout() {
      this.aboutmode = !this.aboutmode
    },
  },
}
</script>

<template>
  <header class="flex justify-between items-center p-10">
    <div>
      <p class="w-[220px] mb-0 leading-none" v-if="!aboutmode">
        Michael Ciccarelli is a NYC based software engineer specializing in frontend & ui development
      </p>
      <Logo v-else />
    </div>
    <div class="items-center flex select-none">
      <p @click="toggleAbout()" v-if="!aboutmode" class="cursor-pointer mb-0 hover:text-green">( about )</p>
      <p @click="toggleAbout()" class="cursor-pointer mb-0 hover:text-green" v-else>( close )</p>
    </div>
  </header>

  <main>
    <CMark v-if="!aboutmode" />
    <About v-else />
  </main>
  <footer class="fixed bottom-0 left-0 w-full">
    <div class="flex items-end justify-between p-10 w-full">
      <div class="w-60">
        <Links :links="links" v-if="aboutmode" />
        <Projects :projects="projects" v-else />
      </div>
      <div class="w-60 text-right">
        <div class="text-[12px] leading-none uppercase" v-if="aboutmode">
          All rights reserved. <br />michael ciccarelli &copy; 2023
        </div>
        <div class="text-[12px] leading-none uppercase" v-else>
          Available for freelance <br /><a href="mailto:mikecicc@gmail.com">project inquiry</a>
        </div>
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
