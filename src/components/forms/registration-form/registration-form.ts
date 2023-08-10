import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import Button from '../button/button';
import { TagNames, Styles, Content } from './enum';
import './registration-form.scss';

const validator = (data: string): string | null => {
  const randomNumber: number = Math.floor(Math.random() * 10);
  console.log(data);

  if (randomNumber <= 5) {
    return 'Not correct email address';
  }

  return null;
};
class RegistrationForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private fieldSetPersonal: FieldsetPersonal;

  private button: Button;

  constructor() {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.fieldSetPersonal = new FieldsetPersonal(validator);
    this.button = new Button('signup');

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createComponent(): void {
    const { form, title, fieldSetPersonal, button } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();
    const buttonElement: HTMLElement = button.getElement();

    console.log(fieldsetPersonalElement);

    title.innerText = Content.TITLE;

    [title, fieldsetPersonalElement, buttonElement].forEach((el: HTMLElement): void =>
      form.append(el)
    );
  }
}

export default RegistrationForm;
