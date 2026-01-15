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
  description: "Il blog del Lama",

  // --- INIZIO CODICE SEO AUTOMATICO ---
  transformHead: ({ pageData }) => {
    const head: [string, Record<string, string>][] = []

    // 1. Genera Titolo per Social
    if (pageData.frontmatter.title) {
      head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
      head.push(['meta', { name: 'twitter:title', content: pageData.frontmatter.title }])
    }

    // 2. Genera Descrizione (per Google e Social)
    if (pageData.frontmatter.description) {
      head.push(['meta', { name: 'description', content: pageData.frontmatter.description }])
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
      head.push(['meta', { name: 'twitter:description', content: pageData.frontmatter.description }])
    }

    // 3. Genera Immagine (Anteprima Social)
    if (pageData.frontmatter.image) {
      // Assicurati che 'https://www.proflama.it' sia il tuo dominio vero
      const imageUrl = `https://www.proflama.it${pageData.frontmatter.image}`
      head.push(['meta', { property: 'og:image', content: imageUrl }])
      head.push(['meta', { name: 'twitter:image', content: imageUrl }])
      head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    }

    return head
  },
  // --- FINE CODICE SEO AUTOMATICO ---

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
