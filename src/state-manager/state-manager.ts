import { APIUserActions } from '../api/api-user-actions';
import { Router } from '../router/router';
import startState from './start-options';
import { IStateOptions } from './state-manager-interfaces';

class StateManager {
  private api: APIUserActions;

  private router: Router;

  private state: IStateOptions;

  private loginLink: HTMLAnchorElement;

  private signupLink: HTMLAnchorElement;

  private profileLink: HTMLAnchorElement;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(api: APIUserActions, router: Router) {
    this.api = api;
    this.router = router;
    this.state = this.setState();
    this.loginLink = this.setElementLink('/authorization');
    this.signupLink = this.setElementLink('/registration');
    this.profileLink = this.setElementLink('/profile');
    this.updateApp(this.state.isLogin);
    this.addClickHandler();
  }

  public changeAuthorizationStatus(): void {
    this.state.isLogin = !this.state.isLogin;

    this.updateApp(this.state.isLogin);
  }

  private setElementLink(href: string): HTMLAnchorElement {
    const element: HTMLAnchorElement = document.querySelector(
      `a[href="${href}"]`
    ) as HTMLAnchorElement;

    return element;
  }

  private updateApp(isLogin: boolean): void {
    this.updateLoginLink(isLogin);
    this.updateSignupLink(isLogin);
    this.updateProfileLink(isLogin);
  }

  private updateLoginLink(isLogin: boolean): void {
    const textContent: string = isLogin ? 'Logout' : 'Login';

    this.loginLink.innerText = textContent;
  }

  private updateSignupLink(isLogin: boolean): void {
    const displayValue: string = isLogin ? 'none' : 'inline-flex';

    this.signupLink.style.display = displayValue;
  }

  private updateProfileLink(isLogin: boolean): void {
    const displayValue: string = isLogin ? 'inline-flex' : 'none';

    this.profileLink.style.display = displayValue;
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
        this.api.logoutUser();
        this.changeAuthorizationStatus();
      }
    });
  }
}

export default StateManager;
