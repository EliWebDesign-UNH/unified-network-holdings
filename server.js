// Unified Network Holdings — Governance placeholder
// Per business plan: "basic text-based placeholder, shielded from public view"
// Stack: Node.js + Express (matches Zia Connections for consistency)

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security: this domain is shielded — noindex, nofollow
// Apply headers BEFORE static serving so they're set on every response
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res) => {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'unifiednetworkholdings-site' });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Unified Network Holdings] Listening on port ${PORT}`);
});
