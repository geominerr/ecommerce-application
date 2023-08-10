import BaseComponent from '../../../base/base-component/base-component';
import SelectComponent from '../../select/select';
import InputBase from '../../input-base/input-base';
import { TagNames, Styles, Contents } from './enum';
import { CallbackStub } from './fieldset-interfaces';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetBill extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private select: SelectComponent;

  private inputCity: InputBase;

  private inputStreet: InputBase;

  private inputStreetNumber: InputBase;

  private inputPostal: InputBase;

  constructor(validator: CallbackStub) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.select = new SelectComponent('billing');
    this.inputCity = new InputBase(validator, OPTIONS[0]);
    this.inputStreet = new InputBase(validator, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validator, OPTIONS[2]);
    this.inputPostal = new InputBase(validator, OPTIONS[3]);

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
      inputCity,
      inputStreet,
      inputStreetNumber,
      inputPostal,
    } = this;

    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [select, inputCity, inputStreet, inputStreetNumber, inputPostal].forEach(
      (component: InputBase | SelectComponent): void =>
        fieldsetElement.append(component.getElement())
    );
  }
}

export default FieldsetBill;
