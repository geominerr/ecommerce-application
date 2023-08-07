/* eslint-disable max-lines-per-function */ //??????????????????
import Main from '../pages/Main';
import Auth from '../pages/Auth';
import Registr from '../pages/Registr';
import About from '../pages/AboutUs';
import { Route } from '../types/router.interfaces';

export class Router {
  public container: HTMLElement;

  public header: HTMLElement;

  public main: HTMLElement;

  public footer: HTMLElement;

  public navigation: HTMLElement;

  public content: HTMLElement;

  public routes: Route[];

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.header = document.createElement('header');
    this.header.classList.add('header');

    this.main = document.createElement('main');
    this.main.classList.add('main');

    this.footer = document.createElement('footer');
    this.footer.classList.add('footer');

    this.navigation = document.createElement('nav');
    this.navigation.classList.add('navigation');

    this.content = document.createElement('div');
    this.content.classList.add('content');

    const mainLink = this.createLink('/', 'Main');
    const authLink = this.createLink('/auth', 'Auth');
    const registrLink = this.createLink('/registr', 'Registr');
    const aboutLink = this.createLink('/about_us', 'About Us');

    this.header.append(this.navigation);
    this.navigation.append(mainLink, authLink, registrLink);
    this.main.append(this.content);
    this.footer.append(aboutLink);
    this.container.append(this.header, this.main, this.footer);

    const body = document.querySelector('body');
    body?.appendChild(this.container);

    this.routes = [
      { path: '/', view: new Main() },
      { path: '/auth', view: new Auth() },
      { path: '/registr', view: new Registr() },
      { path: '/about_us', view: new About() },
    ];

    this.router = this.router.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public createLink(path: string, label: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.classList.add('link');
    link.href = path;
    link.textContent = label;
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
      const defaultView = new Main();
      this.content.innerHTML = await defaultView.getHtml();
      defaultView.setTitle('Main');
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
