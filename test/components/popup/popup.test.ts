import Popup from '../../../src/components/popup/popup';
import { Styles } from '../../../src/components/popup/enum';

describe('Popup', () => {
  const popup: Popup = new Popup();
  const popupDescription: HTMLElement = popup
    .getElement()
    .querySelector(`.${Styles.POPUP_DESCRIPTION}`) as HTMLElement;

  it('should create an instance of Popup component', () => {
    expect(popup).toBeInstanceOf(Popup);
  });

  it('showAuthorizationMessage should display success message', () => {
    const successMessage: string =
      'Welcome! Your account has been successfully logged in. We are glad to see you again!';

    popup.showAuthorizationMessage();

    expect(popupDescription.innerText).toContain(successMessage);
    expect(popupDescription.classList.contains(Styles.POPUP_SUCCESS)).toBe(true);
    expect(popup.getElement().classList.contains(Styles.POPUP_VISIBLE)).toBe(true);
  });

  it('showAuthorizationErrorMessage should display error message', () => {
    const errorMesage: string =
      "Sorry, we couldn't find the account. Please check that your email address and password are correct!";

    popup.showAuthorizationErrorMessage();

    expect(popupDescription.innerText).toContain(errorMesage);
    expect(popupDescription.classList.contains(Styles.POPUP_ERROR)).toBe(true);
    expect(popup.getElement().classList.contains(Styles.POPUP_VISIBLE)).toBe(true);
  });
});
