import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes
  }

  async start() {
    // Public Folder
    this.app.use(express.static('public'));

    // Routes
    this.app.use(this.routes)

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
