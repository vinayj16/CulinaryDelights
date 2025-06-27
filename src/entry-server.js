import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { createRouter } from './router'

export async function render(url) {
  const app = createSSRApp(App)
  const router = createRouter()
  
  app.use(router)
  await router.push(url)
  await router.isReady()
  
  const ctx = {}
  const html = await renderToString(app, ctx)
  
  // For now, return only the HTML string without streaming
  // This will use the fallback non-streaming approach in server.js
  return { html }
}
