import { SelectOptions } from './select-interfaces';

const COUNTRIES: Record<string, string> = {
  Shipping: 'SHIP',
  Billing: 'BILL',
};

const TYPE: SelectOptions = {
  ID: 'address-type',
  NAME: 'address-type',
  LABEL_CONTENT: 'Address type',
};

export { COUNTRIES, TYPE };
