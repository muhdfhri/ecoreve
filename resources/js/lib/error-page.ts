export function renderErrorPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Server Error</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #0f172a; color: #f8fafc; }
    .card { text-align: center; max-width: 400px; padding: 2rem; background: #1e293b; border-radius: 12px; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem; }
    a { background: #38bdf8; color: #0f172a; padding: 0.5rem 1rem; text-decoration: none; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Something went wrong</h1>
    <p>An unexpected server error occurred. Please try again later.</p>
    <a href="/">Go Home</a>
  </div>
</body>
</html>`
}
