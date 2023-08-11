/* eslint-disable max-lines-per-function */
import { createElement } from './createElement';
import { Route } from '../types/router.interfaces';
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

export class Router {
  public container: HTMLElement;

  public header: HTMLElement;

  public main: HTMLElement;

  public footer: HTMLElement;

  public navigation: HTMLElement;

  public navContainer: HTMLElement;

  public content: HTMLElement;

  public routes: Route[];

  constructor(
    // pages
    main: Main,
    authorization: Authorization,
    registration: Registration,
    aboutUs: AboutUs,
    notFound: NotFound,
    headphones: Headphones,
    speakers: Speakers,
    turntables: Turntables,
    amplifiers: Amplifiers,
    soundbars: Soundbars,
    conrollers: Controllers,
    profile: Profile,
    cart: Cart
  ) {
    this.container = createElement('div', 'container');
    this.header = createElement('header', 'header');
    this.main = createElement('main', 'main');
    this.footer = createElement('footer', 'footer');
    this.navigation = createElement('nav', 'navigation');
    this.content = createElement('div', 'content');
    this.navContainer = createElement('div', 'nav-container');

    const mainLink = this.createLink('/', 'Main', '../assets/img/logo.png');
    const headphonesLink = this.createLink('/headphones', 'Headphones');
    const speakersLink = this.createLink('/speakers', 'Speakers');
    const turntablesLink = this.createLink('/turntables', 'Turntables');
    const amplifiersLink = this.createLink('/amplifiers', 'Amplifiers');
    const soundbarsLink = this.createLink('/soundbars', 'Soundbars');
    const controllersLink = this.createLink('/controllers', 'Controllers');
    const authorizationLink = this.createLink('/authorization', 'Authorization');
    const registrationLink = this.createLink('/registration', 'Registration');
    const aboutUsLink = this.createLink('/about_us', 'About Us');
    const profileLink = this.createLink('/profile', 'Profile', '../assets/svg/profile.svg');
    const cartLink = this.createLink('/cart', 'Cart', '../assets/svg/cart.svg');

    this.header.append(this.navContainer);
    this.navContainer.append(this.navigation);
    this.navigation.append(
      mainLink,
      headphonesLink,
      speakersLink,
      turntablesLink,
      amplifiersLink,
      soundbarsLink,
      controllersLink,
      authorizationLink,
      registrationLink,
      profileLink,
      cartLink
    );
    this.main.append(this.content);
    this.footer.append(aboutUsLink);
    this.container.append(this.header, this.main, this.footer);

    const body = document.querySelector('body');
    body?.appendChild(this.container);

    this.routes = [
      { path: '/', view: main },
      { path: '/authorization', view: authorization },
      { path: '/registration', view: registration },
      { path: '/about_us', view: aboutUs },
      { path: '/headphones', view: headphones },
      { path: '/speakers', view: speakers },
      { path: '/turntables', view: turntables },
      { path: '/amplifiers', view: amplifiers },
      { path: '/soundbars', view: soundbars },
      { path: '/controllers', view: conrollers },
      { path: '/error/404', view: notFound },
      { path: '/profile', view: profile },
      { path: '/cart', view: cart },
    ];

    this.router = this.router.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public createLink(path: string, label: string, imagePath?: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.classList.add('link');
    link.href = path;

    if (imagePath) {
      const image = document.createElement('img');
      image.src = imagePath;
      link.appendChild(image);

      image.addEventListener('click', (e: Event) => {
        e.preventDefault();
        history.pushState(null, '', path);
        this.router();
      });
    } else {
      link.textContent = label;
    }

    return link;
  }

  public async router(): Promise<void> {
    const currentPath = location.pathname;
    const route = this.routes.find((r) => r.path === currentPath);

    if (route) {
      const view = route.view;
      this.content.innerHTML = await view.getHtml();
      view.setTitle(route.view.constructor.name);
    } else {
      const errorPage = new NotFound();
      this.content.innerHTML = await errorPage.getHtml();
      errorPage.setTitle('Not Found');
    }
  }

  public handleClick(e: Event): void {
    const target = e.target as HTMLElement;
    if (target instanceof HTMLAnchorElement) {
      e.preventDefault();
      const url = target.getAttribute('href');
      if (url) {
        history.pushState(null, '', url);
        this.router();
      }
    }
  }

  public start(): void {
    window.addEventListener('popstate', this.router);
    document.addEventListener('DOMContentLoaded', this.router);
    document.addEventListener('click', this.handleClick);
  }
}

//