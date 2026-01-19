---
layout: doc 
title: Area Riservata 3
---

🔒 Area Riservata Classe 3

<script setup>
import { ref, onMounted } from 'vue'
import { data as posts } from './.vitepress/theme/posts.data.ts'

// --- PASSWORD ---
const passwordCorretta = 'terza2026'

const passwordInserita = ref('')
const sbloccato = ref(false)
const errore = ref(false)

const verifica = () => {
  if (passwordInserita.value === passwordCorretta) {
    sbloccato.value = true
    errore.value = false
    sessionStorage.setItem('sblocco_3', 'ok')
  } else {
    errore.value = true
  }
}

onMounted(() => {
  if (sessionStorage.getItem('sblocco_3') === 'ok') {
    sbloccato.value = true
  }
})

// FILTRO ROBUSTO: Accetta sia "3" che ["3", "1"]
const classPosts = posts.filter(post => {
  const target = post.class_target
  if (Array.isArray(target)) {
    return target.includes('3')
  }
  return target === '3'
})
</script>

<div v-if="!sbloccato" class="lock-screen">
  <div class="lock-box">
    <h3>Area Protetta</h3>
    <p>Questa pagina è riservata agli studenti della 3.</p>
    <p>Inserisci la password fornita dal prof.</p>
    <div class="input-group">
      <input type="password" v-model="passwordInserita" @keyup.enter="verifica" placeholder="Password..." />
      <button @click="verifica">Entra</button>
    </div>
    <p v-if="errore" class="error-msg">⚠️ Password errata, riprova.</p>
  </div>
</div>

<div v-else class="content animated-fade">
  <p class="welcome-msg">✅ Accesso effettuato. Ecco i materiali per la 3:</p>
  <div v-if="classPosts.length === 0" class="empty-msg"><p>Non ci sono ancora materiali per la classe 3.</p></div>
  <div class="blog-list">
    <div v-for="post in classPosts" :key="post.url" class="post-item">
      <a :href="post.url" class="post-link">
        <div v-if="post.image" class="post-thumb" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
        <div class="post-content">
          <h3>{{ post.title }}</h3>
          <div v-if="post.excerpt" class="post-excerpt" v-html="post.excerpt"></div>
          <p class="post-meta"><span class="badge-class">Classe 3</span> {{ new Date(post.date).toLocaleDateString('it-IT') }}</p>
        </div>
      </a>
    </div>
  </div>
</div>

<style>
/* Stili uguali */
.lock-screen { display: flex; justify-content: center; padding: 40px 20px; }
.lock-box { background: var(--vp-c-bg-soft); padding: 30px; border-radius: 12px; border: 1px solid var(--vp-c-divider); text-align: center; max-width: 400px; width: 100%; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.input-group { display: flex; gap: 10px; margin-top: 20px; }
input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-1); }
button { padding: 10px 20px; background: var(--vp-c-brand-1); color: white; border-radius: 6px; font-weight: bold; cursor: pointer; border: none; }
button:hover { background: var(--vp-c-brand-2); }
.error-msg { color: #e05e5e; margin-top: 15px; font-weight: bold; font-size: 0.9em; }
.welcome-msg { color: #10b981; font-weight: bold; margin-bottom: 20px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 6px; }
.empty-msg { text-align: center; color: var(--vp-c-text-2); margin-top: 20px; }
.animated-fade { animation: fadeIn 0.5s ease-in; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.badge-class { background-color: var(--vp-c-brand-1); color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; margin-right: 8px; }
.post-link { display: flex; text-decoration: none !important; color: inherit !important; margin-bottom: 20px; border: 1px solid var(--vp-c-divider); border-radius: 8px; overflow: hidden; background: var(--vp-c-bg-soft); transition: transform 0.2s, border-color 0.2s; }
.post-link:hover { transform: translateY(-2px); border-color: var(--vp-c-brand-1); }
.post-thumb { width: 180px; min-height: 140px; background-size: cover; background-position: center; flex-shrink: 0; border-right: 1px solid var(--vp-c-divider); }
.post-content { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
.post-excerpt { font-size: 0.95rem; color: var(--vp-c-text-2); margin: 8px 0; line-height: 1.5; }
.post-meta { color: var(--vp-c-text-3); font-size: 0.85rem; margin-top: auto; padding-top: 10px; }
h3 { margin: 0 0 5px 0; color: var(--vp-c-brand-1); font-size: 1.3rem; line-height: 1.3; }
@media (max-width: 600px) { .post-link { flex-direction: column; } .post-thumb { width: 100%; height: 160px; border-right: none; border-bottom: 1px solid var(--vp-c-divider); } }
</style>
