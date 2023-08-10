import { Router } from '../router/router';
import Main from '../pages/Main';
import Authorization from '../pages/Authorization';
import Registration from '../pages/Registration';
import AboutUs from '../pages/AboutUs';
import NotFound from '../pages/NotFound';
import Headphones from '../pages/Headphones';
import Speakers from '../pages/Speakers';
import Turntables from '../pages/Turntables';
import Amplifiers from '../pages/Amplifiers';
import Soundbars from '../pages/Soundbars';
import Controllers from '../pages/Controllers';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';

class App {
  private main: Main;

  private authorization: Authorization;

  private registration: Registration;

  private aboutUs: AboutUs;

  private notFound: NotFound;

  private headphones: Headphones;

  private speakers: Speakers;

  private turntables: Turntables;

  private amplifiers: Amplifiers;

  private soundbars: Soundbars;

  private controllers: Controllers;

  private profile: Profile;

  private cart: Cart;

  private router: Router;

  constructor() {
    this.main = new Main();
    this.authorization = new Authorization();
    this.registration = new Registration();
    this.aboutUs = new AboutUs();
    this.notFound = new NotFound();
    this.headphones = new Headphones();
    this.speakers = new Speakers();
    this.turntables = new Turntables();
    this.amplifiers = new Amplifiers();
    this.soundbars = new Soundbars();
    this.controllers = new Controllers();
    this.profile = new Profile();
    this.cart = new Cart();
    this.router = new Router(
      this.main,
      this.authorization,
      this.registration,
      this.aboutUs,
      this.notFound,
      this.headphones,
      this.speakers,
      this.turntables,
      this.amplifiers,
      this.soundbars,
      this.controllers,
      this.profile,
      this.cart
    );
  }

  public start(): void {
    this.router.start();
  }
}

export default App;
