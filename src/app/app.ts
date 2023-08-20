import { Router } from '../router/router';
import Main from '../pages/main/main';
import Authorization from '../pages/authorization/authorization';
import Registration from '../pages/registration/registration';
import AboutUs from '../pages/abouts-us/about-us';
import NotFound from '../pages/not-found/not-found';
import Headphones from '../pages/headphones/headphones';
import Speakers from '../pages/speakers/speakers';
import Turntables from '../pages/turntables/turntables';
import Amplifiers from '../pages/amplifiers/amplifiers';
import Soundbars from '../pages/soundbars/soundbars';
import Controllers from '../pages/controllers/controllers';
import Profile from '../pages/profile/profile';
import Cart from '../pages/cart/cart';
import { APIUserActions } from '../api/api-user-actions';
import { EmailPasswordCheck } from '../utils/email_password_check';
import { AddressCheck } from '../utils/address_check';
import StateManager from '../state-manager/state-manager';

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

  private api: APIUserActions;

  private validatorEmail: EmailPasswordCheck;

  private validatorAddress: AddressCheck;

  private stateManager: StateManager;

  constructor() {
    this.api = new APIUserActions();
    this.validatorEmail = new EmailPasswordCheck();
    this.validatorAddress = new AddressCheck();
    this.main = new Main();
    this.authorization = new Authorization(this.api, this.validatorEmail);
    this.registration = new Registration(this.api, this.validatorEmail, this.validatorAddress);
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
    this.stateManager = new StateManager(this.api, this.router);
  }

  public start(): void {
    this.router.start();
    this.registration.setRouter(this.router).setStateManager(this.stateManager);
    this.authorization.setRouter(this.router).setStateManager(this.stateManager);
  }
}

export default App;
