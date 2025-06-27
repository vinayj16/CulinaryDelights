const port = process.env.PORT || 5173;
const express = require('express')
const path = require('path')
const { createServer: createViteServer } = require('vite')

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const compression = require('compression');
app.use(compression());
const helmet = require('helmet');
app.use(helmet());
async function createServer() {
  const app = express()

  // Add JSON body parsing middleware
  app.use(express.json())

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware
  app.use(vite.middlewares)

  // Serve static files
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

      // Read index.html
      let template = await vite.transformIndexHtml(
        url,
        await vite.fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
      )

      // Send the rendered HTML back
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  const port = 5173
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

createServer()
