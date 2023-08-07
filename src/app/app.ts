import { Router } from '../router/router';

class App {
  public start(): void {
    const router = new Router();
    router.start();
  }
}

export default App;
