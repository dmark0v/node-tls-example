import tls from 'tls';
import fs from 'fs';

const port = 8888;
const server = tls.createServer({
  key: fs.readFileSync('server/server.key'),
  cert: fs.readFileSync('server/server.crt'),
  ca: fs.readFileSync('ca.crt'),
  requestCert: true
}, (socket) => {
  socket.setEncoding('utf8');
  socket.pipe(socket);
});

server.on('connection', () => {
    console.log('insecure connection');
});

server.on('secureConnection', (c) => {
    console.log('secure connection; client authorized: ', c.authorized);
    c.write('Hello!\n');
});

server.listen(port, () => {
  console.log(`server listening on port ${port} \n`);
});