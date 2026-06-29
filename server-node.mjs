import http from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PORT = process.env.PORT || 3000;
const clientDir = resolve(__dirname, "dist/client");
const serverEntry = resolve(__dirname, "dist/server/server.js");

console.log("Loading SSR handler from:", serverEntry);

// Load the Cloudflare Workers-style fetch handler
const mod = await import(pathToFileURL(serverEntry).href);
const handler = mod.default;

if (!handler || typeof handler.fetch !== "function") {
  console.error("ERROR: server.js does not export a fetch handler. Exports:", Object.keys(mod));
  process.exit(1);
}

console.log("SSR handler loaded successfully.");

const MIME = {
  ".js":      "application/javascript",
  ".css":     "text/css",
  ".png":     "image/png",
  ".jpg":     "image/jpeg",
  ".jpeg":    "image/jpeg",
  ".webp":    "image/webp",
  ".avif":    "image/avif",
  ".svg":     "image/svg+xml",
  ".ico":     "image/x-icon",
  ".json":    "application/json",
  ".geojson": "application/json",
  ".woff":    "font/woff",
  ".woff2":   "font/woff2",
};

const server = http.createServer(async (req, res) => {
  const urlStr = `http://localhost:${PORT}${req.url}`;
  const url = new URL(urlStr);

  // Serve static files from dist/client
  const filePath = join(clientDir, url.pathname);
  try {
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      const ext = extname(filePath);
      const mime = MIME[ext] || "application/octet-stream";
      res.writeHead(200, {
        "Content-Type": mime,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      });
      res.end(readFileSync(filePath));
      return;
    }
  } catch (_) {}

  // Forward to SSR fetch handler
  try {
    const reqHeaders = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (v != null) reqHeaders[k] = Array.isArray(v) ? v.join(", ") : String(v);
    }

    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise((resolve) => {
        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      });
      if (!body.length) body = undefined;
    }

    const request = new Request(urlStr, {
      method: req.method,
      headers: reqHeaders,
      body,
      duplex: body ? "half" : undefined,
    });

    const response = await handler.fetch(request, {}, {});

    const resHeaders = {};
    response.headers.forEach((v, k) => { resHeaders[k] = v; });
    res.writeHead(response.status, resHeaders);

    const buf = await response.arrayBuffer();
    res.end(Buffer.from(buf));
  } catch (err) {
    console.error("SSR error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✓ Server running on http://0.0.0.0:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});
