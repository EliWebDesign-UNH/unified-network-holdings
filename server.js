// Unified Network Holdings — governance site
// Stack: Node.js + Express (matches Zia Connections for consistency)

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Standard security headers (indexable, safe to surface in search results)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  // Disable caching so logo/content changes show up immediately
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'unifiednetworkholdings-site' });
});

app.use(express.static(path.join(__dirname, 'public')));

// Clean URL: /about → /about.html (Express serves .html automatically, this is just an alias)
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Unified Network Holdings] Listening on port ${PORT}`);
});
