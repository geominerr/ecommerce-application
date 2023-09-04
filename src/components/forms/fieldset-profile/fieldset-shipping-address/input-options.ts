import { InputOptions } from './fieldset-interfaces';

const shippingCity: InputOptions = {
  ID: 'shipping-city',
  TYPE: 'text',
  NAME: 'shipping-city',
  PLACEHOLDER: 'Enter shipping city',
  CONTENT_LABEL: 'Shipping city',
};

const shippingStreet: InputOptions = {
  ID: 'shipping-street',
  TYPE: 'text',
  NAME: 'shipping-street',
  PLACEHOLDER: 'Enter shipping street',
  CONTENT_LABEL: 'Shipping street',
};

const shippingStreetNumber: InputOptions = {
  ID: 'shipping-street-number',
  TYPE: 'text',
  NAME: 'shipping-street-number',
  PLACEHOLDER: 'Enter street number',
  CONTENT_LABEL: 'Street number',
};

const shippingPostal: InputOptions = {
  ID: 'shipping-postal',
  TYPE: 'text',
  NAME: 'shipping-postal',
  PLACEHOLDER: 'Enter postal',
  CONTENT_LABEL: 'Postal',
};

const OPTIONS: InputOptions[] = [
  shippingCity,
  shippingStreet,
  shippingStreetNumber,
  shippingPostal,
];

export { OPTIONS };
