import BaseComponent from '../../../base/base-component/base-component';
import SelectComponentProfile from '../../select-profile/select';
import InputBase from '../../input-profile/input-base/input-base';
import InputPostal from '../../input-profile/input-postal/input-postal';
import CheckboxComponent from '../../checkbox/checkbox';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents, Attributes } from './enum';
import { OPTIONS } from './input-options';
import './fieldset-billing.scss';
//

class FieldsetBill extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  public select: SelectComponentProfile;

  public inputPostal: InputPostal;

  public inputCity: InputBase;

  public inputStreet: InputBase;

  public inputStreetNumber: InputBase;

  public checkboxBillDef: CheckboxComponent;

  constructor(validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.select = new SelectComponentProfile('billing');
    this.inputCity = new InputBase(validatorAdrress.cityCheck, OPTIONS[0]);
    this.inputStreet = new InputBase(validatorAdrress.streetCheck, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validatorAdrress.streetCheck, OPTIONS[2]);
    this.inputPostal = new InputPostal(validatorAdrress.postalCodeCheck, OPTIONS[3]);
    this.checkboxBillDef = new CheckboxComponent(Contents.LABEL, Attributes.ID_VALUE_BILL_DEF);
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
    const { inputCity, inputPostal, inputStreet, inputStreetNumber, select } = this;

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

    const checkboxBillDef: HTMLElement = this.checkboxBillDef.getElement();
    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach(
      (component: InputBase | InputPostal | SelectComponentProfile): void =>
        fieldsetElement.append(component.getElement())
    );
    fieldsetElement.append(checkboxBillDef);
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

export default FieldsetBill;
