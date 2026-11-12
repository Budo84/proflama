import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true, // Legge l'inizio del testo
  transform(raw) {
    return raw
      // 1. FILTRO BOZZE
      // Se 'draft' è vero, nasconde l'articolo
      .filter(({ frontmatter }) => !frontmatter.draft)
      
      // 2. MAPPATURA DATI
      .map(({ url, frontmatter, excerpt }) => {
        // CATEGORIE MULTIPLE: in "category" si può scrivere "Arduino, Officina-Robotica" (o una lista YAML).
        // 'categories' è l'elenco completo; 'category' resta la prima (per chi lo usa ancora).
        const cats = (Array.isArray(frontmatter.category) ? frontmatter.category : String(frontmatter.category || '').split(','))
          .map(c => String(c).trim()).filter(Boolean)
        return {
        title: frontmatter.title,
        url,
        excerpt,
        date: frontmatter.date,
        image: frontmatter.image,
        category: cats[0] || '',
        categories: cats,
        
        // --- MODIFICA FONDAMENTALE ---
        // Leggiamo la classe. Se manca (vecchi post), assumiamo sia per 'Tutti'
        class_target: frontmatter.class_target || 'Tutti'
        // -----------------------------
        }
      })
      
      // 3. ORDINAMENTO
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
