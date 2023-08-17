import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles, Events } from './enum';
import './popup.scss';

class Popup extends BaseComponent {
  private container: HTMLDivElement;

  private popupElement: HTMLDivElement;

  private popupDescription: HTMLDivElement;

  // private buttonClose: HTMLButtonElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.POPUP_CONTAINER);
    this.popupElement = this.createElement(TagNames.DIV, Styles.POPUP);
    this.popupDescription = this.createElement(TagNames.DIV, Styles.POPUP_DESCRIPTION);
    // this.buttonClose = this.createElement(TagNames.BUTTON, Styles.BTN_CLOSE);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public showAuthorizationMessage(): void {
    this.popupDescription.innerText = `Welcome! Your account has been successfully logged in. We are glad to see you again!`;
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  public showRegistrationMessage(userName: string): void {
    this.popupDescription.innerText = `We are glad to welcome you, ${userName}, to our Universe. Your account has been successfully created!`;
    this.container.classList.add(Styles.POPUP_VISIBLE);
  }

  private createComponent(): void {
    const { container, popupElement, popupDescription } = this;

    [popupDescription].forEach((el: HTMLElement): void => popupElement.append(el));
    container.append(popupElement);

    this.addClickHandler(container);
  }

  private addClickHandler(container: HTMLElement): void {
    container.addEventListener(Events.CLICK, (e: Event): void => {
      const { target } = e;

      if (target instanceof HTMLButtonElement) {
        e.preventDefault();
      }

      if (target instanceof HTMLElement) {
        if (
          !target.classList.contains(Styles.POPUP) &&
          !target.classList.contains(Styles.POPUP_DESCRIPTION)
        ) {
          container.classList.remove(Styles.POPUP_VISIBLE);
        }
      }
    });
  }
}

export default Popup;
