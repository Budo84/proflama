---
title: Il mio Blog
---

# Il mio Blog

<script setup>
import { data } from './posts.data.mts'
</script>

<ul>
  <li v-for="post in data" :key="post.url">
    <a :href="post.url">{{ post.frontmatter.title }}</a>
    <span v-if="post.frontmatter.date"> - {{ new Date(post.frontmatter.date).toLocaleDateString() }}</span>
  </li>
</ul>
