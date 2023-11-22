import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end('Hola mundo')
})

server.listen(8080, () => {
  console.log('Server running in port 8080')
});
