---
layout: doc
title: Laboratorio MicroBit
---

# 🤖 Tutto su MicroBit

Qui trovi tutte le lezioni e gli esercizi dedicati alla scheda MicroBit.

<script setup>
import { data as posts } from './.vitepress/theme/posts.data.ts'

// Filtro: Categoria MicroBit + Nascondi Bozze
// Uso la struttura "piatta" (post.category) come nel file (1) che funzionava
const filteredPosts = posts.filter(post => 
  post.category === 'MicroBit' && !post.draft
)
</script>

<div class="post-list">
  <div v-for="post in filteredPosts" :key="post.url" class="post-item">
    <a :href="post.url" class="post-link">
      
      <div v-if="post.image" class="post-image">
        <img :src="post.image" :alt="post.title" />
      </div>

      <div class="post-content">
        <h3>{{ post.title }}</h3>
        <p v-if="post.date" class="date">
          {{ new Date(post.date).toLocaleDateString('it-IT') }}
        </p>
      </div>

    </a>
  </div>
</div>

<style>
/* Contenitore della lista */
.post-list {
  margin-top: 20px;
}

/* Stile della "Card" */
.post-item {
  margin-bottom: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.2s;
}

.post-item:hover {
  border-color: var(--vp-c-brand-1);
}

/* Layout Flessibile: Mette foto e testo sulla stessa riga */
.post-link {
  display: flex; 
  flex-direction: row; /* Allinea orizzontalmente */
  align-items: center; /* Centra verticalmente */
  text-decoration: none !important;
  color: inherit;
  height: 100%;
}

/* Stile Immagine (Sinistra) */
.post-image {
  flex-shrink: 0; /* Impedisce all'immagine di schiacciarsi */
  width: 150px;   /* Larghezza fissa dell'immagine */
  height: 120px;  /* Altezza fissa */
  overflow: hidden;
  border-right: 1px solid var(--vp-c-divider); /* Linea separatrice opzionale */
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Taglio perfetto */
  display: block;
}

/* Stile Testo (Destra) */
.post-content {
  padding: 15px 20px;
  flex-grow: 1; /* Prende tutto lo spazio rimanente */
}

h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: var(--vp-c-brand-1); /* Colore del brand come in microbit(1) */
}

.date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Mobile: Se lo schermo è piccolo, metti l'immagine sopra */
@media (max-width: 600px) {
  .post-link {
    flex-direction: column;
    align-items: flex-start;
  }
  .post-image {
    width: 100%;
    height: 150px;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
