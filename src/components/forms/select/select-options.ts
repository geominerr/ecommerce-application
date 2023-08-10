import { SelectOptions } from './select-interfaces';

const COUNTRIES: Record<string, string> = {
  Belarus: 'BY',
  China: 'CN',
  Germany: 'DE',
  Spain: 'ES',
  Finland: 'FI',
  France: 'FR',
  Greece: 'GR',
  Hungary: 'HU',
  Italy: 'IT',
  Lithuania: 'LT',
  Latvia: 'LV',
  Moldova: 'MD',
  Mexico: 'MX',
  Norway: 'NO',
  Poland: 'PL',
  Portugal: 'PT',
  Romania: 'RO',
  Russia: 'RU',
  Slovakia: 'SK',
  Slovenia: 'SI',
  Turkey: 'TR',
  Ukraine: 'UA',
  'United Kingdom': 'GB',
  'United States': 'US',
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
