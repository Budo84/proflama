---
layout: doc
title: Officina Robotica
---

# 🤖 Lezioni generali per i progetti di Robotica

Qui trovi tutte le lezioni di preparazione per affrontare il tuo progetto di robotica.

<script setup>
import { data as posts } from './.vitepress/theme/posts.data.ts'

const ordina = (a, b) =>
  a.title.localeCompare(b.title, 'it', { numeric: true, sensitivity: 'base' })

const officina = posts.filter(p => p.category === 'Officina-Robotica' && !p.draft)

// Se nel titolo compare "micro:bit" o "microbit" -> colonna micro:bit, altrimenti Arduino
const isMicrobit = p => /micro:?bit/i.test(p.title)

const lezioniArduino = officina.filter(p => !isMicrobit(p)).sort(ordina)
const lezioniMicrobit = officina.filter(isMicrobit).sort(ordina)
</script>

<div class="two-cols">
  <section>
    <h2 class="col-title">🟩 Arduino</h2>
    <div class="post-list">
      <div v-for="post in lezioniArduino" :key="post.url" class="post-item">
        <a :href="post.url" class="post-link">
          <div v-if="post.image" class="post-image"><img :src="post.image" :alt="post.title" /></div>
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p v-if="post.date" class="date">{{ new Date(post.date).toLocaleDateString('it-IT') }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section>
    <h2 class="col-title">🟦 Micro:bit</h2>
    <div class="post-list">
      <div v-for="post in lezioniMicrobit" :key="post.url" class="post-item">
        <a :href="post.url" class="post-link">
          <div v-if="post.image" class="post-image"><img :src="post.image" :alt="post.title" /></div>
          <div class="post-content">
            <h3>{{ post.title }}</h3>
            <p v-if="post.date" class="date">{{ new Date(post.date).toLocaleDateString('it-IT') }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</div>

<style>
.two-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.col-title { margin: 0 0 8px; border-top: none; padding-top: 0; }
/* nelle colonne strette l'immagine va sopra il testo */
.two-cols .post-link { flex-direction: column; align-items: flex-start; }
.two-cols .post-image { width: 100%; height: 130px; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
@media (max-width: 800px) { .two-cols { grid-template-columns: 1fr; } }
.post-list { margin-top: 20px; }
.post-item {
  margin-bottom: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.2s;
}
.post-item:hover { border-color: var(--vp-c-brand-1); }

/* Layout orizzontale: Immagine a sinistra, testo a destra */
.post-link {
  display: flex; 
  flex-direction: row;
  align-items: center;
  text-decoration: none !important;
  color: inherit;
  height: 100%;
}

.post-image {
  flex-shrink: 0;
  width: 150px;
  height: 120px;
  overflow: hidden;
  border-right: 1px solid var(--vp-c-divider);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.post-content {
  padding: 15px 20px;
  flex-grow: 1;
}

h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  color: var(--vp-c-brand-1);
}

.date {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 600px) {
  .post-link { flex-direction: column; align-items: flex-start; }
  .post-image { width: 100%; height: 150px; border-right: none; border-bottom: 1px solid var(--vp-c-divider); }
}
</style>
