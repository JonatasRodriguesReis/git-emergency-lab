import assert from 'node:assert/strict';
import test from 'node:test';
import { createApp } from '../src/server.js';

const catalog = [
  { id: 'p1', name: 'Field notebook', priceCents: 1250 },
  { id: 'p2', name: 'Mechanical pencil', priceCents: 350 },
  { id: 'p3', name: 'Canvas backpack', priceCents: 4800 },
];

test('GET /products returns the in-memory catalog as JSON', async () => {
  const app = createApp();
  await new Promise((resolve) => app.listen(0, '127.0.0.1', resolve));
  const { port } = app.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/products`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type') ?? '', /^application\/json/);
    assert.deepEqual(await response.json(), catalog);
  } finally {
    await new Promise((resolve, reject) => {
      app.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
