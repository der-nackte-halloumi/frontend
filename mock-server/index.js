const fastify = require('fastify');

const shops = require('./shops.json');

const app = fastify({ logger: true });

app.register(require('fastify-cors'), {
  origin: true,
});

app.get('/shops', (req, reply) => {
  // TODO: add pagination headers
  reply.send(shops);
});

app.listen(3003, (err, address) => {
  if (err) throw err;

  app.log.info(`mock server listening on ${address}`);
});
