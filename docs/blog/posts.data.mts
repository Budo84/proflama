import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/*.md', {
  excerpt: true, // Estrae l'inizio del testo per le anteprime
  transform(raw) {
    return raw
      // 1. FILTRO BOZZE (Draft)
      // Se nell'Admin hai messo "Bozza: Sì", l'articolo viene nascosto
      .filter(({ frontmatter }) => !frontmatter.draft)
      
      // 2. MAPPATURA DATI (Prepara i campi per le pagine dedicate)
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        excerpt,
        // Data formattata per essere letta facilmente
        date: frontmatter.date,
        // Immagine per le anteprime
        image: frontmatter.image,
        // Categoria (es. MicroBit) - Fondamentale per la tua pagina dedicata
        category: frontmatter.category,
        // Classe (es. 1A) - Fondamentale per la privacy
        class_target: frontmatter.class_target || 'Tutti'
      }))
      
      // 3. ORDINAMENTO (Dal più recente al più vecchio)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  }
})
