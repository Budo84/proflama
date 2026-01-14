import { defineConfig } from 'vitepress'

export default defineConfig({

  title: "Proflama",
  description: "Il blog del Prof Lama",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
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
