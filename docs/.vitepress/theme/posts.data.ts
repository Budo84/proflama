import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true, // Legge l'inizio del testo
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
        image: frontmatter.image // Assicurati di avere questo campo nei post
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)) // Ordina dal più recente
  }
})
