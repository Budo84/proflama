---
layout: doc
title: Laboratorio MicroBit
---

# 🤖 Tutto su MicroBit

Qui trovi tutte le lezioni e gli esercizi dedicati alla scheda MicroBit.

<script setup>
import { data as posts } from './.vitepress/theme/posts.data.ts'

// FILTRO MAGICO: Prende solo gli articoli con categoria 'MicroBit'
const filteredPosts = posts.filter(post => post.category === 'MicroBit')
</script>

<div v-for="post in filteredPosts" :key="post.url" class="post-item">
  <a :href="post.url">
    <h3>{{ post.title }}</h3>
    <p v-if="post.date">{{ new Date(post.date).toLocaleDateString('it-IT') }}</p>
  </a>
</div>

<style>
.post-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
}
.post-item:hover {
  border-color: var(--vp-c-brand-1);
}
h3 { margin-top: 0; color: var(--vp-c-brand-1); }
a { text-decoration: none; color: inherit; display: block; }
</style>
