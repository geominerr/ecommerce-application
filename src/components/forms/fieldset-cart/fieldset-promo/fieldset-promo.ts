import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-base/input-base';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles } from './enum';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetPromo extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private inputPromo: InputBase;

  private buttonsContainer: HTMLDivElement;

  public buttonCancel: HTMLButtonElement;

  public buttonSave: HTMLButtonElement;

  constructor(validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);

    this.inputPromo = new InputBase(validatorAdrress.promoCheck, OPTIONS[0]);
    this.buttonsContainer = this.createElement(TagNames.DIV, Styles.BUTTONS_CONTAINER);
    this.buttonCancel = this.createElement(TagNames.BUTTON, Styles.BUTTON_CANCEL);
    this.buttonCancel.innerHTML = 'Cancel';
    this.buttonSave = this.createElement(TagNames.BUTTON, Styles.BUTTON_SAVE);
    this.buttonSave.innerHTML = 'Apply';

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public isValidData(): boolean {
    const { inputPromo } = this;

    const isValid: boolean = [inputPromo].every((input): boolean => input.isValid());

    if (!isValid) {
      [inputPromo].forEach((input): void => input.showHintRequiredFieldIsEmpty());
    }

    return isValid;
  }

  private createComponent(): void {
    const { fieldsetElement, inputPromo } = this;

    fieldsetElement.append(inputPromo.getElement());

    this.buttonsContainer.append(this.buttonCancel, this.buttonSave);

    fieldsetElement.append(this.buttonsContainer);
  }

  public getInputValues(): {
    promo: string;
  } {
    const promo = this.inputPromo.getValue();

    return { promo };
  }

  public clearPromo(): void {
    this.inputPromo.clearValue();
  }

  public hidePromo(): void {
    this.fieldsetElement.classList.remove(Styles.FIELDSET_SHOW);
  }

  public showPromo(): void {
    this.fieldsetElement.classList.add(Styles.FIELDSET_SHOW);
  }
}

export default FieldsetPromo;
