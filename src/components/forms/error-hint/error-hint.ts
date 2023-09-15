import BaseComponent from '../../base/base-component/base-component';
import { TagNames, Styles, StrengthPassword } from './enum';
import './error-hint.scss';

class ErrorHint extends BaseComponent {
  private element: HTMLElement;

  constructor() {
    super();
    this.element = this.createElement(TagNames.DIV, Styles.ERROR_HINT);
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public showPassHint(textHint: string): void {
    let style: string = Styles.VISIBLE_PASS_WEAK;

    switch (textHint) {
      case StrengthPassword.MEDIUM:
        style = Styles.VISIBLE_PASS_MEDIUM;
        break;
      case StrengthPassword.STRONG:
        style = Styles.VISIBLE_PASS_STRONG;
        break;
    }

    this.removePassHintStyles();
    this.element.innerText = textHint;
    this.element.classList.add(style);
  }

  public showErrorText(textError: string): void {
    this.removePassHintStyles();

    this.element.innerText = textError;
    this.element.classList.add(Styles.VISIBLE);
  }

  public hideErrorText(): void {
    this.element.classList.remove(Styles.VISIBLE);
  }

  public showAddressWarning(text: string): void {
    this.element.innerText = text;
    this.element.classList.add(Styles.VISIBLE_WARNING);
  }

  public hideAddressWarning(): void {
    this.element.classList.remove(Styles.VISIBLE_WARNING);
  }

  public removePassHintStyles(): void {
    this.element.classList.remove(
      Styles.VISIBLE_PASS_WEAK,
      Styles.VISIBLE_PASS_MEDIUM,
      Styles.VISIBLE_PASS_STRONG
    );
  }
}

export default ErrorHint;
