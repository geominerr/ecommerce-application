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
import { API } from '../api/api';
import { APIUserActions } from '../api/api-user-actions';
import { EmailPasswordCheck } from '../utils/email_password_check';
import { AddressCheck } from '../utils/address_check';

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
  }

  public start(): void {
    this.router.start();
    this.registration.setRouter(this.router);
    this.authorization.setRouter(this.router);

    const api = new API();

    async function getData(): Promise<void> {
      try {
        const DATA_FULL = await api.getProjectData('categories');
        const DATA_BY_ID = await api.searchByCategoryId('58b8811c-48c4-4b65-92ef-55607b7d0deb');
        console.log('Data from Api in App FULL', DATA_FULL);
        console.log('Data from Api in App BY_ID', DATA_BY_ID);
        // TEST_DATA.results.forEach(element => {
        //   console.log(element);
        // });
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getData();
  }
}

export default App;
