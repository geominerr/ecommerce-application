/* eslint-disable max-lines-per-function */
import { createElement } from './createElement';
import { Route } from '../types/router.interfaces';
import Main from '../pages/main/main';
import Authorization from '../pages/authorization/authorization';
import Registration from '../pages/registration/registration';
import AboutUs from '../pages/abouts-us/about-us';
import NotFound from '../pages/not-found/not-found';
import Catalog from '../pages/catalog/catalog';
import Profile from '../pages/profile/profile';
import Cart from '../pages/cart/cart';
import DetailPage from '../pages/detail-page/detail-page';

export class Router {
  public container: HTMLElement;

  public main: HTMLElement;

  public content: HTMLElement;

  public routes: Route[];

  // это костыль, переделаю в новой ветке
  private pathLocation: string = '/detail-product';

  private detailedPage: DetailPage;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(
    // pages
    main: Main,
    authorization: Authorization,
    registration: Registration,
    aboutUs: AboutUs,
    notFound: NotFound,
    catalog: Catalog,
    profile: Profile,
    cart: Cart
  ) {
    this.container = createElement('div', 'container');
    this.main = createElement('main', 'main');
    this.content = createElement('div', 'content');
    this.main.append(this.content);
    this.container.append(this.main);

    this.detailedPage = new DetailPage();
    const body = document.querySelector('body');
    body?.appendChild(this.container);

    this.routes = [
      { path: '/', view: main },
      { path: '/authorization', view: authorization },
      { path: '/registration', view: registration },
      { path: '/about_us', view: aboutUs },
      { path: '/catalog', view: catalog },
      { path: '/error/404', view: notFound },
      { path: '/profile', view: profile },
      { path: '/cart', view: cart },
      { path: '/catalog/amplifiers', view: catalog },
      { path: '/catalog/headphones', view: catalog },
      { path: '/catalog/turntables', view: catalog },
      { path: '/catalog/sound-systems', view: catalog },
      { path: '/catalog/controllers', view: catalog },
      { path: '/catalog/soundbars', view: catalog },
    ];

    this.router = this.router.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public async router(): Promise<void> {
    let currentPath = location.pathname;

    // добавил проверку, теперь пользователь если продолжит путь после ID будет кидать на 404
    if (currentPath.includes(this.pathLocation)) {
      if (currentPath.split('/').length <= 3) {
        const id: string = currentPath.split('/')[2];

        this.content.innerHTML = '';
        const element = await this.detailedPage.getElement(id);

        this.content.append(element);

        return;
      }
    }

    if (localStorage.getItem(this.keyAccessToken)) {
      if (currentPath === '/authorization' || currentPath === '/registration') {
        history.replaceState(null, '', '/');
        currentPath = '/';
      }
    }

    if (!localStorage.getItem(this.keyAccessToken)) {
      if (currentPath === '/profile') {
        history.replaceState(null, '', '/authorization');
        currentPath = '/authorization';
      }
    }

    const route = this.routes.find((r) => r.path === currentPath);

    if (route) {
      const view = route.view;
      const element = await view.getHtml();

      if (element instanceof HTMLElement) {
        this.content.innerHTML = '';
        this.content.append(element);
      } else {
        this.content.innerHTML = element;
      }

      view.setTitle();

      document.documentElement.scrollTop = 0;
    } else {
      const errorPage = new NotFound();
      this.content.innerHTML = await errorPage.getHtml();

      errorPage.setTitle();
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

    if (target instanceof HTMLImageElement) {
      const anchor = target?.parentNode;

      if (anchor && anchor instanceof HTMLAnchorElement) {
        e.preventDefault();

        const url = anchor.getAttribute('href');

        if (url) {
          history.pushState(null, '', url);
          this.router();
        }
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
