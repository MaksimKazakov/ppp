const Hapi = require('@hapi/hapi');
const { NodeSSH } = require('node-ssh');

const ssh = new NodeSSH();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT ?? 3777,
    host: '0.0.0.0',
    routes: {
      cors: true
    }
  });

  server.route({
    method: 'GET',
    path: '/ping',
    handler: () => 'pong'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request) => {
      return `https://${request.headers.host}`;
    }
  });

  server.route({
    method: 'GET',
    path: '/ssh',
    handler: (request, h) => {
      // TODO
      return request.headers['user-agent'];
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

void init();
