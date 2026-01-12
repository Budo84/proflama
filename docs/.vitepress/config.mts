import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Proflama",
  description: "Il sito del Prof Lama",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Admin', link: '/admin.html' } // Link comodo per te
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
