<script setup>
// Importiamo tutti i dati (sia pubblici che privati) dal file centrale
import { data as allPosts } from './posts.data.ts'
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

// --- FILTRO DI SICUREZZA AGGIORNATO (Home) ---
// Accetta l'articolo se è "Tutti" OPPURE se la lista contiene "Tutti"
const publicPosts = allPosts.filter(post => {
  const target = post.class_target
  // Protezione: se il target è vuoto, lo scarta
  if (!target) return false

  // 1. Se è una STRINGA (es. "1, 2, Tutti") generata dal nuovo editor
  if (typeof target === 'string') {
    return target.includes('Tutti')
  }

  // 2. Se è un ARRAY (vecchi post o configurazioni diverse)
  if (Array.isArray(target)) {
    return target.includes('Tutti')
  }

  return false
})

// 1. Vetrina: Prendiamo i primi 4 articoli SOLO tra quelli pubblici
//const featured = publicPosts.slice(0, 4)

// Vetrina: all'inizio i 4 più recenti (è ciò che viene generato nel build),
// poi nel browser vengono sostituiti con 4 a caso a ogni visita
const featured = ref(publicPosts.slice(0, 4))

onMounted(() => {
  const mix = [...publicPosts]
  for (let i = mix.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[mix[i], mix[j]] = [mix[j], mix[i]]
  }
  featured.value = mix.slice(0, 4)
})

// 2. Colonne per categoria: 4 articoli più recenti (già ordinati per data) per ciascuna
const PER_COLONNA = 4
const colonne = [
  { nome: 'Microbit', titolo: 'Micro:bit', icona: '🟦', link: '/microbit' },
  { nome: 'Arduino',  titolo: 'Arduino',   icona: '🟩', link: '/arduino' },
  { nome: 'Scratch',  titolo: 'Scratch',   icona: '🟧', link: '/scratch' },
  { nome: 'Mbot',     titolo: 'Mbot',      icona: '🟪', link: '/mbot' }
].map(c => {
  const tutti = publicPosts.filter(p => p.category === c.nome)
  return { ...c, articoli: tutti.slice(0, PER_COLONNA), altri: tutti.length - PER_COLONNA }
})
</script>

<template>
  <Layout>
    <template #home-features-after>
      
      <div v-if="featured.length" class="featured-container">
        <div class="featured-grid">
          <a v-for="post in featured" :key="post.url" :href="post.url" class="featured-card">
            <div class="image-box" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></div>
            <div class="card-overlay">
              <div class="card-title">{{ post.title }}</div>
            </div>
          </a>
        </div>
      </div>

      <div class="cat-section">
        <div class="cat-grid">
          <section v-for="col in colonne" :key="col.nome" class="cat-col">
            <h2 class="cat-title"><a :href="col.link">{{ col.icona }} {{ col.titolo }}</a></h2>

            <p v-if="col.articoli.length === 0" class="cat-empty">Presto nuove lezioni.</p>

            <a v-for="post in col.articoli" :key="post.url" :href="post.url" class="cat-card">
              <span class="cat-thumb" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></span>
              <span class="cat-card-title">{{ post.title }}</span>
            </a>

            <a :href="col.link" class="cat-more">Mostra altri →</a>
          </section>
        </div>
      </div>

    </template>
  </Layout>
</template>

<style scoped>
/* --- STILE VETRINA --- */
.featured-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; max-width: 1200px; margin: 40px auto; padding: 0 20px; }
.featured-card { position: relative; height: 220px; border-radius: 12px; overflow: hidden; display: block; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.image-box { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.5s; }
.featured-card:hover .image-box { transform: scale(1.1); }
.card-overlay { position: absolute; bottom: 0; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 15px; }
.card-title { color: white; font-weight: bold; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }

/* --- COLONNE PER CATEGORIA --- */
.cat-section { max-width: 1200px; margin: 50px auto; padding: 0 20px; }
.cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; align-items: start; }
.cat-title { margin: 0 0 16px; padding: 0 0 10px; border-top: none; border-bottom: 3px solid var(--vp-c-brand-1); font-size: 1.3rem; }
.cat-title a { color: inherit; text-decoration: none; }
.cat-title a:hover { color: var(--vp-c-brand-1); }
.cat-card { display: block; margin-bottom: 14px; border: 1px solid var(--vp-c-divider); border-radius: 10px; background: var(--vp-c-bg-soft); overflow: hidden; text-decoration: none; color: inherit; transition: border-color 0.2s, transform 0.2s; }
.cat-card:hover { border-color: var(--vp-c-brand-1); transform: translateY(-2px); }
.cat-thumb { display: block; width: 100%; aspect-ratio: 16 / 9; background-size: cover; background-position: center; }
.cat-card-title { display: block; padding: 10px 12px; font-weight: 600; font-size: 0.95rem; line-height: 1.35; }
.cat-empty { color: var(--vp-c-text-2); font-style: italic; margin: 0 0 14px; }
.cat-more { display: inline-block; font-weight: 600; font-size: 0.95rem; color: var(--vp-c-brand-1); text-decoration: none; }
.cat-more:hover { text-decoration: underline; }
@media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px)  { .cat-grid { grid-template-columns: 1fr; } }

</style>
