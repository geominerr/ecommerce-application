import { SelectOptions } from './select-interfaces';

const COUNTRIES: Record<string, string> = {
  Belarus: 'BY',
  Lithuania: 'LT',
  Latvia: 'LV',
  Poland: 'PL',
  Russia: 'RU',
  Ukraine: 'UA',
};

const SHIPPING_OPTIONS: SelectOptions = {
  ID: 'shipping-country',
  NAME: 'shipping-country',
  LABEL_CONTENT: 'Shipping country',
};

const BILLING_OPTIONS: SelectOptions = {
  ID: 'billing-country',
  NAME: 'billing-country',
  LABEL_CONTENT: 'Billing country',
};

export { COUNTRIES, SHIPPING_OPTIONS, BILLING_OPTIONS };
