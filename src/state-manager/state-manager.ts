import { APIUserActions } from '../api/api-user-actions';
import { Router } from '../router/router';
import startState from './start-options';
import { IStateOptions } from './state-manager-interfaces';

class StateManager {
  private api: APIUserActions;

  private router: Router;

  private state: IStateOptions;

  private loginLink: HTMLAnchorElement;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(api: APIUserActions, router: Router) {
    this.api = api;
    this.router = router;
    this.state = this.setState();
    this.loginLink = this.setLoginLink();

    this.updateApp();
    this.addClickHandler();
  }

  public changeAuthorizationStatus(): void {
    this.state.isLogin = !this.state.isLogin;

    this.updateLoginLink(this.state.isLogin);
  }

  public setLoginLink(): HTMLAnchorElement {
    const element: HTMLAnchorElement = document.querySelector(
      `a[href='/authorization']`
    ) as HTMLAnchorElement;

    return element;
  }

  private updateApp(): void {
    this.updateLoginLink(this.state.isLogin);
  }

  private updateLoginLink(isLogin: boolean): void {
    const textContent: string = isLogin ? 'Logout' : 'Login';

    this.loginLink.innerText = textContent;
  }

  private setState(): IStateOptions {
    const accessToken: string | null = localStorage.getItem(this.keyAccessToken);

    if (accessToken) {
      return {
        isLogin: true,
        accessToken: accessToken,
      };
    }

    return JSON.parse(JSON.stringify(startState));
  }

  private addClickHandler(): void {
    document.addEventListener('click', (e: Event) => {
      const { target } = e;

      if (target === this.loginLink && this.state.isLogin) {
        history.pushState(null, '', '/');
        this.router.router();
        this.api.logoutUser();
        this.changeAuthorizationStatus();
      }
    });
  }
}

export default StateManager;
