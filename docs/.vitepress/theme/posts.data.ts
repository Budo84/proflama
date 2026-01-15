import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true, // Legge l'inizio del testo
  transform(raw) {
    return raw
      // 1. FILTRO BOZZE (La modifica fondamentale)
      // Se 'draft' è vero (true), l'articolo viene nascosto.
      // Se 'draft' non esiste (vecchi articoli), l'articolo viene mostrato.
      .filter(({ frontmatter }) => !frontmatter.draft)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
        image: frontmatter.image, // Assicurati di avere questo campo nei post
        category: frontmatter.category
      }))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date)) // Ordina dal più recente
  }
})
