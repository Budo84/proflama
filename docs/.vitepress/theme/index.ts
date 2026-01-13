import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue' // <--- Importa il tuo layout
import './style.css'

export default {
  ...DefaultTheme,
  // Diciamo a VitePress di usare il nostro layout quando serve
  Layout: HomeLayout
}
