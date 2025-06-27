const express = require('express')
const path = require('path')
const fs = require('fs').promises

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Create http server
const app = express()

// Add Vite middleware
if (!isProduction) {
  const { createServer } = require('vite')
  const vite = createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Initialize Vite middleware
  const viteMiddleware = vite.middlewares
  app.use(viteMiddleware)
}

// Create server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

// Handle SSR
const handleSSR = async (req, res) => {
  try {
    const url = req.originalUrl
    const templatePath = path.resolve(__dirname, isProduction ? 'dist/client/index.html' : 'index.html')
    const template = await fs.readFile(templatePath, 'utf-8')

    // Load the entry server
    const render = isProduction
      ? (await import('./dist/server/entry-server.js')).render
      : (await import('./src/entry-server.js')).render

    // Render the app
    const { html } = await render(url)

    // Send response
    res.status(200).set({ 'Content-Type': 'text/html' })
    res.end(html)
  } catch (err) {
    console.error('SSR Error:', err)
    res.status(500).end('Internal Server Error')
  }
}

// Serve static files
app.use(express.static(path.resolve(__dirname, isProduction ? 'dist/client' : '.')))

// Handle all routes with SSR
app.use('/*', handleSSR)
