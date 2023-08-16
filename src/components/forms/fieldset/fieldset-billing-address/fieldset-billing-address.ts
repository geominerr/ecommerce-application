import BaseComponent from '../../../base/base-component/base-component';
import SelectComponent from '../../select/select';
import InputBase from '../../input-base/input-base';
import InputPostal from '../../input-postal/input-postal';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset-billing.scss';

class FieldsetBill extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private select: SelectComponent;

  private inputPostal: InputPostal;

  private inputCity: InputBase;

  private inputStreet: InputBase;

  private inputStreetNumber: InputBase;

  private isDisplayOn: boolean = true;

  constructor(validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.select = new SelectComponent('billing');
    this.inputCity = new InputBase(validatorAdrress.mainCheck, OPTIONS[0]);
    this.inputStreet = new InputBase(validatorAdrress.streetCheck, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validatorAdrress.streetCheck, OPTIONS[2]);
    this.inputPostal = new InputPostal(validatorAdrress.postalCodeCheck, OPTIONS[3]);
    this.select.setInputPostal(this.inputPostal);
    this.inputPostal.setSelectComponent(this.select);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public hideFromScreen(): void {
    this.isDisplayOn = !this.isDisplayOn;
    this.fieldsetElement.classList.add(Styles.FIELDSET_HIDE);
  }

  public showOnScreen(): void {
    this.isDisplayOn = !this.isDisplayOn;
    this.fieldsetElement.classList.remove(Styles.FIELDSET_HIDE);
  }

  public getData(): string[] | null {
    const { inputCity, inputPostal, inputStreet, inputStreetNumber, select } = this;
    const isDisplayOn: boolean = this.isDisplayOn;
    const result: string[] = [];

    if (isDisplayOn) {
      [inputStreet, inputStreetNumber, inputCity, inputPostal, select].forEach((input): number =>
        result.push(input.getValue())
      );

      return result;
    }

    return null;
  }

  public isValidData(): boolean {
    if (!this.isDisplayOn) {
      return true;
    }

    const { inputCity, inputPostal, inputStreet, inputStreetNumber, select } = this;

    const isValid: boolean = [inputCity, inputPostal, inputStreet, inputStreetNumber, select].every(
      (input): boolean => input.isValid()
    );

    if (!isValid && this.isDisplayOn) {
      [inputCity, inputPostal, inputStreet, inputStreetNumber, select].forEach((input): void =>
        input.showHintRequiredFieldIsEmpty()
      );
    }

    return isValid;
  }

  private createComponent(): void {
    const {
      fieldsetElement,
      legendElement,
      select,
      inputPostal,
      inputCity,
      inputStreet,
      inputStreetNumber,
    } = this;

    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach(
      (component: InputBase | InputPostal | SelectComponent): void =>
        fieldsetElement.append(component.getElement())
    );
  }
}

export default FieldsetBill;
