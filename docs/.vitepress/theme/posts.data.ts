import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true, // Legge l'inizio del testo
  transform(raw) {
    return raw
      // 1. FILTRO BOZZE
      // Se 'draft' è vero, nasconde l'articolo
      .filter(({ frontmatter }) => !frontmatter.draft)
      
      // 2. MAPPATURA DATI
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
        image: frontmatter.image,
        category: frontmatter.category,
        
        // --- MODIFICA FONDAMENTALE ---
        // Leggiamo la classe. Se manca (vecchi post), assumiamo sia per 'Tutti'
        class_target: frontmatter.class_target || 'Tutti'
        // -----------------------------
      }))
      
      // 3. ORDINAMENTO
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
