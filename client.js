import tls from 'tls';
import fs from 'fs';

const port = 8888;
const socket = tls.connect({
  port,
  host: 'localhost',
  key: fs.readFileSync('client/client.key'),
  cert: fs.readFileSync('client/client.crt'),
  ca: fs.readFileSync('ca.crt')
}, () => {
  console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized');

  process.stdin.pipe(socket);
  process.stdin.resume();

  socket.end();
});

socket.setEncoding('utf8');

socket.on('data', (data) => {
  console.log(data);
});

socket.on('end', () => {
  console.log("End connection");
});