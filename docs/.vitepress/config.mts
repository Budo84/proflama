import { defineConfig } from 'vitepress'

export default defineConfig({

  // --- PARTE 1: IDENTITÀ SITO PER GOOGLE ---
  
  // Il dominio ufficiale del sito (Serve per generare link corretti nella sitemap)
  hostname: 'https://www.proflama.it',

  // Generatore automatico della Mappa del Sito (sitemap.xml)
  sitemap: {
    hostname: 'https://www.proflama.it'
  },

  // --- PARTE 2: VERIFICA PROPRIETÀ (Il "Passaporto") ---
  head: [
    [
      'meta', 
      { 
        name: 'google-site-verification', 
        // 👇 SOSTITUISCI LA SCRITTA TRA APICI QUI SOTTO CON IL CODICE DI GOOGLE 👇
        content: 'GzkiBHjoPnp9tCGgPuNwO1EtNaBqY-5BOJ3tzW_4pGQ' 
      }
    ]
  ],

  title: "Proflama",
  description: "Il blog del Prof Lama",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Microbit', link: '/microbit' },
      { text: 'Admin', link: 'https://proflama.netlify.app/admin.html', target: '_blank' } // Link comodo per te
    ],

    sidebar: [
      {
        text: 'Articoli',
        items: [
          { text: 'Indice Blog', link: '/blog/' },
          // Qui potrai aggiungere altri link rapidi
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/budo84' }
    ]
  }
})
