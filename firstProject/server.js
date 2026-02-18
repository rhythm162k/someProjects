const fs = require("fs");

// fs.readFile(`${__dirname}/txt/start.txt`, "utf-8", (err, data) => {
//   if (err) console.log("Error!");
//   fs.readFile(`${__dirname}/txt/${data}.txt`, "utf-8", (err, data1) => {
//     fs.writeFile(`${__dirname}/txt/finalOutput.txt`, `${data1}`, (err) => {
//       console.log("File Written");
//     });
//   });
// });

// console.log("Reading file...");

const http = require("http");
const url = require("url");

const replaceTemplate = (template, element) => {
  let output = template.replace(/{%productName%}/g, element.productName);
  output = output.replace(/{%productImage%}/g, element.image);
  output = output.replace(/{%quantity%}/g, element.quantity);
  output = output.replace(/{%price%}/g, element.price);
  output = output.replace(/{%from%}/g, element.from);
  output = output.replace(/{%nutrients%}/g, element.nutrients);
  output = output.replace(/{%ID%}/g, element.id);
  output = output.replace(/{%description%}/g, element.description);
  if (!element.organic) {
    output = output.replace(/{%notOrganic%}/g, "not-organic");
  }
  return output;
};

const overView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const productCards = fs.readFileSync(
  `${__dirname}/templates/productCard.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });
    const tcard = dataObj
      .map((el) => replaceTemplate(productCards, el))
      .join(" ");
    const output = overView.replace("{%productCard%}", tcard);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const que = dataObj[query.id];
    const output = replaceTemplate(productTemp, que);
    res.end(output);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server running in port 3000");
});
