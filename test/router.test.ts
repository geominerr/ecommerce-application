import AboutUs from '../src/pages/abouts-us/about-us';
import Amplifiers from '../src/pages/amplifiers/amplifiers';
import Authorization from '../src/pages/authorization/authorization';
import Cart from '../src/pages/cart/cart';
import Controllers from '../src/pages/controllers/controllers';
import Headphones from '../src/pages/headphones/headphones';
import Main from '../src/pages/main/main';
import NotFound from '../src/pages/not-found/not-found';
import Profile from '../src/pages/profile/profile';
import Registration from '../src/pages/registration/registration';
import Soundbars from '../src/pages/soundbars/soundbars';
import Speakers from '../src/pages/speakers/speakers';
import Turntables from '../src/pages/turntables/turntables';
import { Router } from '../src/router/router';

let router: Router;
let main: Main;
let authorization: Authorization;
let registration: Registration;
let aboutUs: AboutUs;
let notFound: NotFound;
let headphones: Headphones;
let speakers: Speakers;
let turntables: Turntables;
let amplifiers: Amplifiers;
let soundbars: Soundbars;
let controllers: Controllers;
let profile: Profile;
let cart: Cart;

beforeEach(() => {
  router = new Router(
    main,
    authorization,
    registration,
    aboutUs,
    notFound,
    headphones,
    speakers,
    turntables,
    amplifiers,
    soundbars,
    controllers,
    profile,
    cart
  );
});

test('should render valid page for a valid route', async () => {
  const validView = {
    getHtml: jest.fn().mockResolvedValue('<div>This is valid page</div>'),
    setTitle: jest.fn(),
  };
  const validRoute = { path: '/valid', view: validView };

  router.routes = [validRoute];

  history.pushState(null, '', '/valid');
  await router.router();

  expect(validView.getHtml).toHaveBeenCalled();
  expect(router.content.innerHTML).toBe('<div>This is valid page</div>');
});

test('should add event listeners on start', () => {
  const addEventListener = jest.spyOn(window, 'addEventListener');
  const removeEventListener = jest.spyOn(window, 'removeEventListener');

  router.start();

  expect(addEventListener).toHaveBeenCalledTimes(1);
  expect(addEventListener).toHaveBeenCalledWith('popstate', router.router);
  expect(removeEventListener).not.toHaveBeenCalled();
});
