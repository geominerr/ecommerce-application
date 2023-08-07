import BaseComponent from '../base-component/base-component';
import { TagNames, Styles } from './enum';
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

  public showErrorText(textError: string): void {
    this.element.innerText = textError;
    this.element.classList.add(Styles.VISIBLE);
  }

  public hideErrorText(): void {
    this.element.classList.remove(Styles.VISIBLE);
  }
}

export default ErrorHint;
