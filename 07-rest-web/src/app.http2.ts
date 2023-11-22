import fs from 'fs';
import http2 from 'http2'

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('Hola mundo')
})

server.listen(8080, () => {
  console.log('Server running in port 8080')
});
