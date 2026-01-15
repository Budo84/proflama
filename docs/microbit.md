---
layout: doc
title: Laboratorio MicroBit
---

# 🤖 Tutto su MicroBit

Qui trovi tutte le lezioni e gli esercizi dedicati alla scheda MicroBit.

<script setup>
import { data as posts } from './.vitepress/theme/posts.data.ts'

// NOTA: Se i tuoi dati sono "piatti" (senza .frontmatter), usiamo direttamente le proprietà.
// Verifica se nel tuo file i campi si chiamano 'category', 'draft', ecc.
const filteredPosts = posts.filter(post => 
  post.category === 'MicroBit' && !post.draft
)
</script>

<div class="posts-grid">
  <div v-for="post in filteredPosts" :key="post.url" class="post-item">
    <a :href="post.url">
      <div v-if="post.image" class="image-wrapper">
        <img :src="post.image" :alt="post.title" />
      </div>
      <div class="content">
        <h3>{{ post.title }}</h3>
        <p v-if="post.date" class="date">
          {{ new Date(post.date).toLocaleDateString('it-IT') }}
        </p>
      </div>
    </a>
  </div>
</div>

<style>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.post-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--vp-c-brand-1);
}

.image-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 15px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

a { 
  text-decoration: none !important; 
  color: inherit; 
  display: block; 
  height: 100%;
}
</style>
