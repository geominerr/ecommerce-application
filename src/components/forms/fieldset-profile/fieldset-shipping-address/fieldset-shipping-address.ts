import BaseComponent from '../../../base/base-component/base-component';
import SelectComponentProfile from '../../select-profile/select';
import InputBase from '../../input-profile/input-base/input-base';
import InputPostal from '../../input-profile/input-postal/input-postal';
import CheckboxComponent from '../../checkbox/checkbox';
import { AddressCheck } from '../../../../utils/address_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset-shipping.scss';

class FieldsetShip extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private titleContainer: HTMLDivElement;

  private actionsContainer: HTMLDivElement;

  public edit: HTMLImageElement;

  public remove: HTMLImageElement;

  public select: SelectComponentProfile;

  public inputPostal: InputPostal;

  public inputCity: InputBase;

  public inputStreet: InputBase;

  public inputStreetNumber: InputBase;

  private buttonsContainer: HTMLDivElement;

  public buttonCancel: HTMLButtonElement;

  public buttonSave: HTMLButtonElement;

  public checkboxShipDef: CheckboxComponent;

  private static currentCheckboxId: number = 0;

  public addressId: string;

  constructor(validator: AddressCheck, addressId: string) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.titleContainer = this.createElement(TagNames.DIV, Styles.TITLE_CONTAINER);
    this.actionsContainer = this.createElement(TagNames.DIV, Styles.ACTIONS_CONTAINER);
    this.buttonCancel = this.createElement(TagNames.BUTTON, Styles.BUTTON_CANCEL);
    this.buttonCancel.innerHTML = 'Cancel';
    this.buttonSave = this.createElement(TagNames.BUTTON, Styles.BUTTON_SAVE);
    this.buttonSave.innerHTML = 'Save';
    this.buttonsContainer = this.createElement(TagNames.DIV, Styles.BUTTONS_CONTAINER);
    this.edit = this.createElement(TagNames.IMG, Styles.EDIT);
    this.edit.setAttribute('src', '../../../../assets/svg/edit.svg');
    this.remove = this.createElement(TagNames.IMG, Styles.CLOSE);
    this.remove.setAttribute('src', '../../../../assets/svg/close.svg');
    this.select = new SelectComponentProfile('shipping');
    this.inputPostal = new InputPostal(validator.postalCodeCheck, OPTIONS[3]);
    this.inputCity = new InputBase(validator.cityCheck, OPTIONS[0]);
    this.inputStreet = new InputBase(validator.streetCheck, OPTIONS[1]);
    this.inputStreetNumber = new InputBase(validator.streetCheck, OPTIONS[2]);
    this.checkboxShipDef = new CheckboxComponent(
      Contents.LABEL,
      `checkboxShip-${FieldsetShip.currentCheckboxId++}`
    );
    this.select.setInputPostal(this.inputPostal);
    this.inputPostal.setSelectComponent(this.select);

    this.createComponent();
    this.changeShippingData();
    this.cancelShippingData();
    this.addressId = addressId;
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public hideFromScreen(): void {
    this.buttonsContainer.classList.remove(Styles.BUTTONS_SHOW);
  }

  public showOnScreen(): void {
    this.buttonsContainer.classList.add(Styles.BUTTONS_SHOW);
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

  public inputEnable(): void {
    [
      this.select,
      this.inputPostal,
      this.inputCity,
      this.inputStreet,
      this.inputStreetNumber,
    ].forEach((input) => input.inputEnable());
  }

  public getData(): string[] | null {
    const { inputStreet, inputStreetNumber, inputCity, inputPostal, select } = this;

    const result: string[] = [];

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach((input): number =>
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
    this.titleContainer.append(legendElement, this.actionsContainer);
    this.actionsContainer.append(this.edit, this.remove);
    this.buttonsContainer.append(this.buttonCancel, this.buttonSave);
    fieldsetElement.append(this.titleContainer);

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach(
      (component: InputBase | InputPostal | SelectComponentProfile): void =>
        fieldsetElement.append(component.getElement())
    );
    fieldsetElement.append(this.buttonsContainer);
    fieldsetElement.append(checkboxShipDef);
  }

  public setInputValues(
    streetName: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    country: string
  ): void {
    this.select.setValue(country);
    this.inputCity.setValue(city);
    this.inputStreet.setValue(streetName);
    this.inputStreetNumber.setValue(streetNumber);
    this.inputPostal.setValue(postalCode);
  }

  public getInputValues(): {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    country: string;
  } {
    const streetName = this.inputStreet.getValue();
    const streetNumber = this.inputStreetNumber.getValue();
    const postalCode = this.inputPostal.getValue();
    const city = this.inputCity.getValue();
    const country = this.select.getValue();

    return { streetName, streetNumber, postalCode, city, country };
  }

  private changeShippingData(): void {
    this.edit.addEventListener('click', async () => {
      this.showOnScreen();
      this.inputEnable();
    });
  }

  private cancelShippingData(): void {
    this.buttonCancel.addEventListener('click', async () => {
      this.hideFromScreen();
      this.inputDisable();
    });
  }

  public async highlightInputs(duration: number): Promise<void> {
    const { select, inputPostal, inputCity, inputStreet, inputStreetNumber } = this;
    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach((input) => {
      const inputShipping = input.getElement().querySelector('.input-profile, .input-postal');
      if (inputShipping) {
        inputShipping.classList.add(Styles.HIGHLIGHT);
      }
    });

    const selectElement = select.getElement().querySelector('select');
    if (selectElement) {
      selectElement.classList.add(Styles.HIGHLIGHT);
    }

    await new Promise((resolve) => setTimeout(resolve, duration));

    [select, inputPostal, inputCity, inputStreet, inputStreetNumber].forEach((input) => {
      const inputShipping = input.getElement().querySelector('.input-profile, .input-postal');
      if (inputShipping) {
        inputShipping.classList.remove(Styles.HIGHLIGHT);
      }
    });

    if (selectElement) {
      selectElement.classList.remove(Styles.HIGHLIGHT);
    }
  }
}

export default FieldsetShip;
