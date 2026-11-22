import { createServer } from "node:http";
import { pathToFileURL } from "node:url";

const products = [
  { id: "p1", name: "Field notebook", priceCents: 1250 },
  { id: "p2", name: "Mechanical pencil", priceCents: 350 },
  { id: "p3", name: "Canvas backpack", priceCents: 4800 },
  { id: "p6", name: "Canvas backpack2", priceCents: 6800 },
];

const orders = [
  { id: "o1", name: "order1", total: 10000 },
  { id: "o2", name: "order2", total: 20000 },
];

export function createApp() {
  return createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");

    if (req.method === "GET" && url.pathname === "/products") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(products));
      return;
    }

    if (req.method === "GET" && url.pathname === "/orders") {
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(orders));
      return;
    }

    res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "Not found" }));
  });
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const port = Number(process.env.PORT) || 3000;
  createApp().listen(port, () => {
    console.log(`Products API listening on http://127.0.0.1:${port}`);
  });
}
