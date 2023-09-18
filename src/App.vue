<script setup>
import Projects from './components/Projects.vue'
import { monthNames } from './data.json'

const currYear = new Date().getFullYear()
const currMonth = new Date().getMonth()
const nextMonth = currMonth + 1 < 12 ? currMonth + 1 : 0
const dateAvailable = `${monthNames[nextMonth]} ${currYear}`
</script>

<template>
  <main>
    <div class="intro">
      <p>
        michael ciccarelli is a software engineer based in brooklyn, new york. He specializes in frontend, bridging the
        gap between design and development. His primary focus revolves around creating user interfaces, responsive
        layouts, interactive elements, and accessible user experiences using javascript, html, and css.
      </p>
      <p>
        for over a decade, he has worked with early-stage technology companies and diverse businesses to build websites,
        apps, and bespoke digital products, engaging from their initial concept until they go live.
        <span class="opacity-[.5] font-bold">available for freelance {{ dateAvailable }}</span>
      </p>
      <div class="mb-2 text-sm md:text-lg uppercase font-bold">contact</div>
      <div class="mb-0 text-sm md:text-lg uppercase font-bold">
        Email: <a class="font-bold" href="mailto:mikecicc@gmail.com">mikecicc@gmail.com</a>
      </div>
      <div class="mb-0 text-sm md:text-lg uppercase font-bold">Phone: 917-783-3277</div>
    </div>

    <Projects />
  </main>
  <footer class="md:flex md:justify-between px-8 lg:px-16">
    <p class="mb-4 md:mb-0 text-xs">
      brooklyn, new york <br /><a href="mailto:mikecicc@gmail.com">Email</a> &bull;
      <a href="https://twitter.com/mciccarelli">Twitter</a> &bull;
      <a href="https://github.com/mciccarelli">Github</a>
    </p>
    <p class="md:text-right text-xs">All Rights reserved. <br />Michael Ciccarelli &copy; {{ currYear }}</p>
  </footer>
</template>

<style scoped>
.intro {
  @apply relative p-8 lg:p-16 max-w-7xl;
}

.intro p {
  @apply text-base md:text-3xl font-bold;
}
</style>
