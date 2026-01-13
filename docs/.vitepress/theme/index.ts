import DefaultTheme from 'vitepress/theme'
import HomeLayout from './HomeLayout.vue'

export default {
  extends: DefaultTheme,
  // Sovrascrive il layout solo quando serve (es. nella Home)
  Layout: HomeLayout
}
