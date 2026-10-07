const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const APP_DOMAIN = process.env.APP_DOMAIN || "cleratianuniversitymanagement.com";
const PUBLIC_DIR = path.join(__dirname, "public");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "X-App-Domain": APP_DOMAIN
  });
  res.end(JSON.stringify(payload));
}

function serveStatic(req, res) {
  const requested = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const filePath = path.normalize(path.join(PUBLIC_DIR, decodeURIComponent(requested)));

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile(path.join(PUBLIC_DIR, "index.html"), (fallbackError, fallback) => {
        if (fallbackError) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": contentTypes[".html"], "X-App-Domain": APP_DOMAIN });
        res.end(fallback);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "X-App-Domain": APP_DOMAIN
    });
    res.end(content);
  });
}

http
  .createServer((req, res) => {
    if (req.url === "/api/health") {
      sendJson(res, 200, {
        ok: true,
        app: "Cleratian School Portal",
        domain: APP_DOMAIN
      });
      return;
    }

    serveStatic(req, res);
  })
  .listen(PORT, () => {
    console.log(`Cleratian School Portal running at http://localhost:${PORT}`);
  });
