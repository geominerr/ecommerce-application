import BaseComponent from '../../../base/base-component/base-component';
import SelectComponent from '../../select/select';
import InputBase from '../../input-base/input-base';
import InputPostal from '../../input-postal/input-postal';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset-shipping.scss';

class FieldsetShip extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private select: SelectComponent;

  private inputPostal: InputPostal;

  private inputCity: InputBase;

  private inputStreet: InputBase;

  private inputStreetNumber: InputBase;

  private isDisplayOn: boolean = true;

  constructor(validator: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.select = new SelectComponent('shipping');
    this.inputPostal = new InputPostal(validator.postalCodeCheck, OPTIONS[3]);
    this.inputCity = new InputBase(validator.mainCheck, OPTIONS[0]);
    this.inputStreet = new InputBase(validator.streetCheck, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validator.streetCheck, OPTIONS[2]);
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
    const { inputStreet, inputStreetNumber, inputCity, inputPostal, select } = this;
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

    const { inputCity, inputPostal, inputStreet, inputStreetNumber } = this;

    const isValid: boolean = [inputCity, inputPostal, inputStreet, inputStreetNumber].every(
      (input): boolean => input.isValid()
    );

    if (!isValid && this.isDisplayOn) {
      [inputCity, inputPostal, inputStreet, inputStreetNumber].forEach((input): void =>
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

export default FieldsetShip;
