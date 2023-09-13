import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles, Events } from './enum';
import './popup.scss';

class Popup extends BaseComponent {
  private container: HTMLDivElement;

  private popupElement: HTMLDivElement;

  private popupDescription: HTMLDivElement;

  private buttonClose: HTMLButtonElement;

  private delayTime: number = 3800;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.POPUP_CONTAINER);
    this.popupElement = this.createElement(TagNames.DIV, Styles.POPUP);
    this.popupDescription = this.createElement(TagNames.DIV, Styles.POPUP_DESCRIPTION);
    this.buttonClose = this.createElement(TagNames.BUTTON, Styles.BTN_CLOSE);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public showAuthorizationMessage(): void {
    this.popupDescription.innerText = `Welcome! Your account has been successfully logged in. We are glad to see you again!`;
    this.popupDescription.classList.add(Styles.POPUP_SUCCESS);
    this.container.classList.add(Styles.POPUP_VISIBLE);

    this.removeStylesWithDelay();
  }

  public showChangePasswordMessage(): void {
    this.popupDescription.innerText = `You have successfully changed your password. Please login again!`;
    this.popupDescription.classList.add(Styles.POPUP_SUCCESS);
    this.container.classList.add(Styles.POPUP_VISIBLE);

    this.removeStylesWithDelay();
  }

  public showDiscountCodes(codes: string): void {
    this.popupDescription.innerText = `Today's codes is:\n ${codes}`;
    this.popupDescription.classList.add(Styles.POPUP_SUCCESS);
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  public showDiscountCodesEmpty(): void {
    this.popupDescription.innerText = `No discount codes today!`;
    this.popupDescription.classList.add(Styles.POPUP_ERROR);
    this.container.classList.add(Styles.POPUP_VISIBLE);

    this.removeStylesWithDelay();
  }

  public showOldPassNotConfirmErrorMessage(): void {
    this.popupDescription.innerText = 'Sorry, we you entered the wrong old password!';
    this.popupDescription.classList.add(Styles.POPUP_ERROR);
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  public showRegistrationMessage(): void {
    this.popupDescription.innerText = `We are glad to welcome you, to our Universe. Your account has been successfully created!`;
    this.popupDescription.classList.add(Styles.POPUP_SUCCESS);
    this.container.classList.add(Styles.POPUP_VISIBLE);

    this.removeStylesWithDelay();
  }

  public showAuthorizationErrorMessage(): void {
    this.popupDescription.innerText =
      "Sorry, we couldn't find the account. Please check that your email address and password are correct!";
    this.popupDescription.classList.add(Styles.POPUP_ERROR);
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  public showRegistrationErrorMessage(): void {
    this.popupDescription.innerText = `Account with the provided email already exists. 
    Please use a different email address to proceed, 
    or you can try signing in with the existing account.`;
    this.popupDescription.classList.add(Styles.POPUP_ERROR);
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  private createComponent(): void {
    const { container, popupElement, popupDescription, buttonClose } = this;

    [buttonClose, popupDescription].forEach((el: HTMLElement): void => popupElement.append(el));
    container.append(popupElement);
    document.body.append(container);

    this.addClickHandler();
  }

  private removeStylesWithDelay(): void {
    setTimeout((): void => {
      this.container.classList.remove(Styles.POPUP_VISIBLE);
    }, this.delayTime - 300);
    setTimeout((): void => {
      this.popupDescription.classList.remove(Styles.POPUP_SUCCESS);
    }, this.delayTime);
  }

  private addClickHandler(): void {
    document.addEventListener(Events.CLICK, (e: Event): void => {
      const { target } = e;

      if (target instanceof HTMLButtonElement) {
        e.preventDefault();
      }

      if (target instanceof HTMLElement) {
        if (
          !target.classList.contains(Styles.POPUP) &&
          !target.classList.contains(Styles.POPUP_DESCRIPTION)
        ) {
          this.container.classList.remove(Styles.POPUP_VISIBLE);
        }
      }
    });
  }
}

const popup = new Popup();

export { popup, Popup };
