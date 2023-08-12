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

  private displaySwith: boolean = true;

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
    this.displaySwith = !this.displaySwith;
    this.fieldsetElement.classList.add(Styles.FIELDSET_HIDE);
  }

  public showOnScreen(): void {
    this.displaySwith = !this.displaySwith;
    this.fieldsetElement.classList.remove(Styles.FIELDSET_HIDE);
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
