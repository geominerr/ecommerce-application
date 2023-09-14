import { Router } from '../router/router';
import Main from '../pages/main/main';
import Authorization from '../pages/authorization/authorization';
import Registration from '../pages/registration/registration';
import AboutUs from '../pages/abouts-us/about-us';
import NotFound from '../pages/not-found/not-found';
import Catalog from '../pages/catalog/catalog';
import Profile from '../pages/profile/profile';
import Cart from '../pages/cart/cart';
import { APIUserActions } from '../api/api-user-actions';
import { APIProductActions } from '../api/product-actions/api-product-actions';
import { EmailPasswordCheck } from '../utils/email_password_check';
import { AddressCheck } from '../utils/address_check';
import StateManager from '../state-manager/state-manager';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

class App {
  private header: Header;

  private footer: Footer;

  private main: Main;

  private authorization: Authorization;

  private registration: Registration;

  private aboutUs: AboutUs;

  private notFound: NotFound;

  private catalog: Catalog;

  private profile: Profile;

  private cart: Cart;

  private router: Router;

  private api: APIUserActions;

  private apiProducts: APIProductActions;

  private validatorEmail: EmailPasswordCheck;

  private validatorAddress: AddressCheck;

  private stateManager: StateManager;

  constructor() {
    this.api = new APIUserActions();
    this.apiProducts = new APIProductActions();
    this.validatorEmail = new EmailPasswordCheck();
    this.validatorAddress = new AddressCheck();
    this.header = new Header();
    this.main = new Main();
    this.authorization = new Authorization(this.api, this.validatorEmail);
    this.registration = new Registration(this.api, this.validatorEmail, this.validatorAddress);
    this.aboutUs = new AboutUs();
    this.notFound = new NotFound();
    this.catalog = new Catalog(this.apiProducts);
    this.profile = new Profile(this.api, this.validatorEmail, this.validatorAddress);
    this.cart = new Cart(this.validatorAddress);
    this.router = new Router(
      this.main,
      this.authorization,
      this.registration,
      this.aboutUs,
      this.notFound,
      this.catalog,
      this.profile,
      this.cart
    );
    this.stateManager = new StateManager(this.api, this.router);
    this.footer = new Footer();
  }

  public start(): void {
    this.router.start();
    this.registration.setRouter(this.router).setStateManager(this.stateManager);
    this.authorization.setRouter(this.router).setStateManager(this.stateManager);
    this.profile.setRouter(this.router).setStateManager(this.stateManager);
  }
}

export default App;
