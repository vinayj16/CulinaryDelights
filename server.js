import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer as createViteServer } from 'vite'
import compression from 'compression'
import helmet from 'helmet'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
async function createServer() {
  const app = express()

  // Add security and optimization middleware
  app.use(helmet())
  app.use(compression())

  // Add JSON body parsing middleware
  app.use(express.json())

  let vite
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    // Create Vite server in middleware mode for development
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    // Use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    // Serve production static assets
    app.use(express.static(path.resolve(__dirname, 'dist/client')))
  }

  // Serve public files
  app.use(express.static(path.resolve(__dirname, 'public')))

  // API endpoint for reservations
  app.post('/api/reservations', (req, res) => {
    const reservation = req.body;
    console.log('Received reservation:', reservation);
    // Here you could add DB save logic
    res.json({ success: true, message: 'Reservation received!' });
  });

  // API endpoint for contact form
  app.post('/api/contact', (req, res) => {
    const contact = req.body;
    console.log('Received contact message:', contact);
    // Here you could add DB/email logic
    res.json({ success: true, message: 'Contact message received!' });
  });

  // Serve index.html for all routes
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render

      if (!isProd) {
        // Development mode
        template = await vite.fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        // Production mode
        template = await import('fs').then(fs => fs.promises.readFile(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8'
        ))
        render = (await import('./dist/server/entry-server.js')).render
      }

      // Render the app HTML
      const { html: appHtml } = await render(url)
      
      // Inject the app-rendered HTML into the template
      const html = template.replace('<!--app-html-->', appHtml)
      
      // Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  // Error handling middleware should be last
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  const port = process.env.PORT || 5173
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer()
