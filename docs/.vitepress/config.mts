import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

export default defineConfig({
  // --- 1. CONFIGURAZIONE SITO ---
  hostname: 'https://www.proflama.it',
  title: "Proflama",
  description: "Il blog del Lama",
  
  sitemap: {
    hostname: 'https://www.proflama.it'
  },

  // --- 2. PLUGIN MATEMATICA (KATEX) ---
  // Vedi? Ora è FUORI da sitemap
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },

  // --- 3. META TAG & HEAD ---
  head: [
    ['meta', { name: 'google-site-verification', content: 'GzkiBHjoPnp9tCGgPuNwO1EtNaBqY-5BOJ3tzW_4pGQ' }],
    // Stile formule
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
  
  // AGGIUNGI QUESTA RIGA QUI SOTTO:
    ['link', { rel: 'icon', href: '/favicon.png' }], // ⬅️ Questa è la Favicon
  
    ['link', { rel: 'apple-touch-icon', href: '/favicon.png' }] // Smartphone

  ],

  // --- 4. SEO AUTOMATICO ---
  transformHead: ({ pageData }) => {
    const head: any[] = []
    if (pageData.frontmatter.title) {
      head.push(['meta', { property: 'og:title', content: pageData.frontmatter.title }])
      head.push(['meta', { name: 'twitter:title', content: pageData.frontmatter.title }])
    }
    if (pageData.frontmatter.description) {
      head.push(['meta', { name: 'description', content: pageData.frontmatter.description }])
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
      head.push(['meta', { name: 'twitter:description', content: pageData.frontmatter.description }])
    }
    if (pageData.frontmatter.image) {
      const imageUrl = `https://www.proflama.it${pageData.frontmatter.image}`
      head.push(['meta', { property: 'og:image', content: imageUrl }])
      head.push(['meta', { name: 'twitter:image', content: imageUrl }])
      head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    }
    return head
  },

  // --- 5. TEMA E MENU ---
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Microbit', link: '/microbit' },
      { text: 'Admin', link: 'https://proflama.netlify.app/admin.html', target: '_blank' }
    ],
    sidebar: [
      {
        text: 'Articoli',
        items: [
          { text: 'Indice Blog', link: '/blog/' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/budo84' }
    ]
  }
})