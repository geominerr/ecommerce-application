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

import { API } from '../api/api';
import { APIUserActions } from '../api/api-user-actions';

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
     // eslint-disable-next-line max-lines-per-function
  public startAPI(): void {
      async function getData(): Promise<void> {
        try {
          const DATA_FULL = await Api.getProjectData('categories');
          const DATA_BY_ID = await Api.searchByCategoryId('58b8811c-48c4-4b65-92ef-55607b7d0deb');
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
      // email: string, firstName: string, lastName: string, dateOfBirth: string YYYY-MM-DD, shippingAddresses: number[], billingAddresses: number[], password: string
      function register(): void {
        USER_ACTIONS.registerUser(
          'Shipiing street',
          '123-s',
          'Shipping City',
          '0000-s',
          'US',
          'Billing street',
          '123-b',
          'Billing city',
          '0000-b',
          'US',
          'user@mail.com',
          'FirstuserName',
          'FirstuserSurname',
          '2010-11-10',
          'pAssw0rd!'
        )
          .then(() => {
            console.log('success');
            // Действия после успешной регистрации
          })
          .catch((error) => {
            console.log('Register error in APP: ', error.message);
          });
      }
      register();
      USER_ACTIONS.loginUser('user@mail.com', 'pAssw0rd!')
        .then((data) => {
          console.log('login success', data);
          console.log(`Hi ${data.firstName} ${data.lastName}`);
        })
        .catch((error) => {
          console.log('Login error in APP: ', error.message);
        });
      setTimeout(() => USER_ACTIONS.logoutUser(), 5000);

    }
  }

  public start(): void {
    this.router.start();
    
    



export default App;
