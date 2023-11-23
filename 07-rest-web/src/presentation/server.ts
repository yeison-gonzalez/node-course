import express from 'express';
import path from 'path';

interface Options {
  port: number;
}

export class Server {
  private app = express();
  private readonly port: number;

  constructor(options: Options) {
    const { port } = options;
    this.port = port;
  }

  async start() {
    // Public Folder
    this.app.use(express.static('public'));

    // Routes
    this.app.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'Buy test 1', createdAt: new Date() },
        { id: 2, text: 'Buy test 2', createdAt: new Date() },
        { id: 3, text: 'Buy test 3', createdAt: new Date() },
      ])
    });

    // SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../public/index.html`);
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running in: http://localhost:${this.port}`)
    })
  }
}
