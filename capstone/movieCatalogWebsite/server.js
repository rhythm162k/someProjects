const http = require("http");
const fs = require("fs");
const replaceTamplate = require("../movieCatalogWebsite/modules/replaceTemplate");

const overView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const movie = fs.readFileSync(`${__dirname}/templates/movie.html`, "utf-8");
const movieCard = fs.readFileSync(
  `${__dirname}/templates/movieCard.html`,
  "utf-8"
);
const notFound = fs.readFileSync(`${__dirname}/templates/404.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/movies.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myUrl.pathname;

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const movies = dataObj
      .map((el) => replaceTamplate(movieCard, el))
      .join(" ");
    const home = overView.replace("{%MOVIE_CARDS%}", movies);
    res.end(home);
  } else if (pathname === "/movie") {
    res.writeHead(200, { "content-type": "text/html" });
    const id = Number(myUrl.searchParams.get("id"));
    const dataItem = dataObj.find((item) => item.id === id);
    const movieDetail = replaceTamplate(movie, dataItem);
    res.end(movieDetail);
  } else if (pathname.startsWith("/images/")) {
    const imagePath = `${__dirname}${pathname}`;

    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Image not found");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end(notFound);
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("server running on port 5000");
});
