import BaseComponent from '../../../base/base-component/base-component';
import SelectComponentProfile from '../../select-profile/select';
import InputBase from '../../input-profile/input-base/input-base';
import InputPostal from '../../input-profile/input-postal/input-postal';
import CheckboxComponent from '../../checkbox/checkbox';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents, Attributes } from './enum';
import { OPTIONS } from './input-options';
import './fieldset-shipping.scss';

class FieldsetShip extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  public select: SelectComponentProfile;

  public inputPostal: InputPostal;

  public inputCity: InputBase;

  public inputStreet: InputBase;

  public inputStreetNumber: InputBase;

  private checkboxShipDef: CheckboxComponent;

  constructor(validator: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.select = new SelectComponentProfile('shipping');
    this.inputPostal = new InputPostal(validator.postalCodeCheck, OPTIONS[3]);
    this.inputCity = new InputBase(validator.cityCheck, OPTIONS[0]);
    this.inputStreet = new InputBase(validator.streetCheck, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validator.streetCheck, OPTIONS[2]);
    this.checkboxShipDef = new CheckboxComponent(Contents.LABEL, Attributes.ID_VALUE_SHIP_DEF);
    this.select.setInputPostal(this.inputPostal);
    this.inputPostal.setSelectComponent(this.select);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public inputDisable(): void {
    [
      this.select,
      this.inputPostal,
      this.inputCity,
      this.inputStreet,
      this.inputStreetNumber,
    ].forEach((input) => input.inputDisable());
  }

  public getData(): string[] | null {
    const { inputStreet, inputStreetNumber, inputCity, inputPostal, select } = this;

    const result: string[] = [];

    [inputStreet, inputStreetNumber, inputCity, inputPostal, select].forEach((input): number =>
      result.push(input.getValue())
    );

    return result;
  }

  public isValidData(): boolean {
    const { inputCity, inputPostal, inputStreet, inputStreetNumber, select } = this;

    const isValid: boolean = [inputCity, inputPostal, inputStreet, inputStreetNumber, select].every(
      (input): boolean => input.isValid()
    );

    if (!isValid) {
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

    const checkboxShipDef: HTMLElement = this.checkboxShipDef.getElement();
    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach(
      (component: InputBase | InputPostal | SelectComponentProfile): void =>
        fieldsetElement.append(component.getElement())
    );
    fieldsetElement.append(checkboxShipDef);
  }

  public setInputValues(
    streetName: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    country: string
  ): void {
    this.inputCity.setValue(city);
    this.inputStreet.setValue(streetName);
    this.inputStreetNumber.setValue(streetNumber);
    this.inputPostal.setValue(postalCode);
    this.select.setValue(country);
  }
}

export default FieldsetShip;
