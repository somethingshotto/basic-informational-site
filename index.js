const http = require("http");
const fs = require("fs");
const path = require("path");

const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact-me.html",
};

const server = http.createServer((req, res) => {
  const fileName = routes[req.url];

  if (!fileName) {
  const filePath = path.join(__dirname, "404.html");

  fs.readFile(filePath, (err, data) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(data);
  });

  return;
}

  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});