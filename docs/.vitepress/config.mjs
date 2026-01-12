import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Mio Sito",
  description: "Sito personale gestito via PWA",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/primo-post' }
    ],
    sidebar: [
      {
        text: 'Articoli',
        items: [
          // Qui aggiungerai man mano i tuoi link
          { text: 'Primo Post', link: '/blog/primo-post' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/IL_TUO_USER/IL_TUO_REPO' }
    ],
    search: {
      provider: 'local'
    }
  }
})
