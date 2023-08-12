import BaseComponent from '../../../base/base-component/base-component';
import SelectComponent from '../../select/select';
import InputBase from '../../input-base/input-base';
import InputPostal from '../../input-postal/input-postal';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetBill extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private select: SelectComponent;

  private inputPostal: InputPostal;

  private inputCity: InputBase;

  private inputStreet: InputBase;

  private inputStreetNumber: InputBase;

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
