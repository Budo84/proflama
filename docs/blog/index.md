---
title: Il mio Blog
---

# Il mio Blog

<script setup>
import { data } from './posts.data.mts'
import { computed } from 'vue'

// Creiamo una lista filtrata che esclude le bozze
const publishedPosts = computed(() => {
  return data.filter(post => !post.frontmatter.draft)
})
</script>

<ul>
  <li v-for="post in publishedPosts" :key="post.url">
    <a :href="post.url">{{ post.frontmatter.title }}</a>
    <span v-if="post.frontmatter.date"> - {{ new Date(post.frontmatter.date).toLocaleDateString() }}</span>
  </li>
</ul>
