<script setup>
import { data as posts } from './posts.data.ts'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
// Prendiamo i primi 4 post per la griglia in alto
const featured = posts.slice(0, 4)
// Tutti gli altri per la lista
const list = posts  //.slice(4)
</script>

<template>
  <Layout>
    <template #home-features-after>
      
      <div class="featured-grid">
        <a v-for="post in featured" :key="post.url" :href="post.url" class="featured-card">
          <div class="image-box" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></div>
          <div class="card-title">{{ post.title }}</div>
        </a>
      </div>

      <div class="post-feed">
        <h2>Ultime Notizie</h2>
        <div v-for="post in list" :key="post.url" class="post-row">
          <div class="post-thumb" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></div>
          <div class="post-content">
            <a :href="post.url"><h3>{{ post.title }}</h3></a>
            <p v-if="post.excerpt" v-html="post.excerpt"></p>
            <a :href="post.url" class="read-more">Continua a leggere →</a>
          </div>
        </div>
      </div>

    </template>
  </Layout>
</template>

<style scoped>
/* GRIGLIA 4 TAB */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}
.featured-card {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
}
.image-box {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
}
.featured-card:hover .image-box { transform: scale(1.1); }
.card-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  font-weight: bold;
}

/* LISTA POST */
.post-feed {
  max-width: 800px;
  margin: 0 auto 60px;
  padding: 0 20px;
}
.post-row {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
.post-thumb {
  width: 200px;
  height: 120px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  flex-shrink: 0;
}
.post-content h3 { margin-top: 0; }
.read-more { color: var(--vp-c-brand-1); font-weight: bold; text-decoration: none; }

/* MOBILE */
@media (max-width: 768px) {
  .post-row { flex-direction: column; }
  .post-thumb { width: 100%; height: 180px; }
}
</style>
