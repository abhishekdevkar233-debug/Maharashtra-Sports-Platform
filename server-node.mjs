import http from "http";
import { readFileSync, existsSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Load the Cloudflare-style fetch handler built by Nitro
const { default: handler } = await import("./dist/server/server.js");

const MIME = {
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".geojson": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const PORT = process.env.PORT || 3000;
const clientDir = join(__dirname, "dist/client");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Serve static files from dist/client
  const filePath = join(clientDir, url.pathname);
  if (existsSync(filePath) && !filePath.endsWith("/")) {
    const ext = extname(filePath);
    const mime = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(readFileSync(filePath));
    return;
  }

  // Forward everything else to the SSR fetch handler
  try {
    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (v) headers[k] = Array.isArray(v) ? v.join(", ") : v;
    }

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await new Promise((resolve) => {
            const chunks = [];
            req.on("data", (c) => chunks.push(c));
            req.on("end", () => resolve(Buffer.concat(chunks)));
          })
        : undefined;

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body?.length ? body : undefined,
    });

    const response = await handler.fetch(request, {}, {});

    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    const buf = await response.arrayBuffer();
    res.end(Buffer.from(buf));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
