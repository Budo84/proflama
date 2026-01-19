<script setup>
// Importiamo tutti i dati (sia pubblici che privati) dal file centrale
import { data as allPosts } from './posts.data.ts'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme

// --- FILTRO DI SICUREZZA (Fondamentale) ---
// Questo codice controlla ogni articolo prima di mostrarlo.
// Se la "class_target" è "Tutti", l'articolo passa.
// Se è "1A", "2B", ecc., viene bloccato e non appare in Home.
const publicPosts = allPosts.filter(post => post.class_target === 'Tutti')

// 1. Vetrina: Prendiamo i primi 4 articoli SOLO tra quelli pubblici
const featured = publicPosts.slice(0, 4)

// 2. Lista: Mostriamo tutti gli articoli pubblici (nessun taglio)
const list = publicPosts
</script>

<template>
  <Layout>
    <template #home-features-after>
      
      <!-- === SEZIONE 1: VETRINA (4 BOX IN ALTO) === -->
      <div v-if="featured.length" class="featured-container">
        <div class="featured-grid">
          <a v-for="post in featured" :key="post.url" :href="post.url" class="featured-card">
            <!-- Immagine di sfondo con fallback a default.jpg -->
            <div class="image-box" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></div>
            <div class="card-overlay">
              <div class="card-title">{{ post.title }}</div>
            </div>
          </a>
        </div>
      </div>

      <!-- === SEZIONE 2: ULTIME NOTIZIE (LISTA DETTAGLIATA) === -->
      <div class="post-feed">
        <h2 class="section-title">Ultime Notizie</h2>
        
        <!-- Se non ci sono articoli pubblici, mostriamo un messaggio cortesia -->
        <div v-if="list.length === 0" style="text-align: center; color: gray; padding: 20px;">
          <p>Nessuna notizia pubblica al momento.</p>
        </div>

        <div v-for="post in list" :key="post.url" class="post-row">
          <!-- Immagine dell'articolo -->
          <a :href="post.url" class="post-thumb" :style="{ backgroundImage: 'url(' + (post.image || '/img/default.jpg') + ')' }"></a>
          
          <!-- Contenuto -->
          <div class="post-content">
            <a :href="post.url" class="title-link">
              <h3>{{ post.title }}</h3>
            </a>
            
            <!-- Mostra l'inizio del testo (l'excerpt) -->
            <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
            
            <!-- Pulsante colorato -->
            <a :href="post.url" class="read-more-btn">Continua a leggere →</a>
          </div>
        </div>
      </div>

    </template>
  </Layout>
</template>

<style scoped>
/* --- STILE VETRINA (4 BOX) --- */
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
  height: 220px; 
  border-radius: 12px; 
  overflow: hidden; 
  display: block; 
  box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
}
.image-box { 
  width: 100%; 
  height: 100%; 
  background-size: cover; 
  background-position: center; 
  transition: transform 0.5s; 
}
.featured-card:hover .image-box { transform: scale(1.1); }
.card-overlay { 
  position: absolute; 
  bottom: 0; 
  width: 100%; 
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); 
  padding: 15px; 
}
.card-title { 
  color: white; 
  font-weight: bold; 
  font-size: 1.1rem; 
  text-shadow: 0 2px 4px rgba(0,0,0,0.5); 
}

/* --- STILE ULTIME NOTIZIE --- */
.post-feed { max-width: 900px; margin: 60px auto; padding: 0 20px; }
.section-title { 
  border-bottom: 3px solid var(--vp-c-brand-1); 
  padding-bottom: 10px; 
  margin-bottom: 40px; 
  font-size: 2rem; 
}

.post-row { 
  display: flex; 
  gap: 30px; 
  margin-bottom: 50px; 
  align-items: flex-start; 
  border-bottom: 1px solid var(--vp-c-divider); 
  padding-bottom: 30px; 
}

.post-thumb { 
  width: 280px; 
  height: 180px; 
  background-size: cover; 
  background-position: center; 
  border-radius: 10px; 
  flex-shrink: 0; 
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  display: block; 
  transition: opacity 0.2s; 
}
.post-thumb:hover { opacity: 0.9; }

.post-content { flex: 1; display: flex; flex-direction: column; }
.title-link { text-decoration: none; color: inherit; }
.title-link h3 { 
  margin-top: 0; 
  font-size: 1.6rem; 
  margin-bottom: 10px; 
  transition: color 0.2s; 
}
.title-link:hover h3 { color: var(--vp-c-brand-1); }

.post-excerpt { 
  color: var(--vp-c-text-2); 
  font-size: 1.05rem; 
  line-height: 1.6; 
  margin-bottom: 20px; 
  /* Taglia il testo dopo 3 righe per ordine */
  display: -webkit-box; 
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical; 
  overflow: hidden; 
}

/* --- STILE PULSANTE --- */
.read-more-btn { 
  display: inline-block; 
  background-color: var(--vp-c-brand-1); 
  color: white !important; 
  padding: 10px 20px; 
  border-radius: 6px; 
  text-decoration: none; 
  font-weight: 600; 
  font-size: 0.95rem; 
  width: fit-content;
  transition: background-color 0.2s, transform 0.2s;
}
.read-more-btn:hover { 
  background-color: var(--vp-c-brand-2); 
  transform: translateY(-2px); 
}

/* --- MOBILE --- */
@media (max-width: 768px) {
  .post-row { flex-direction: column; gap: 15px; }
  .post-thumb { width: 100%; height: 200px; }
  .title-link h3 { font-size: 1.4rem; }
}
</style>
