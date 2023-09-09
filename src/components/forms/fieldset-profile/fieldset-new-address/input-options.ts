import { InputOptions } from './fieldset-interfaces';

const shippingCity: InputOptions = {
  ID: 'add-city',
  TYPE: 'text',
  NAME: 'add-city',
  PLACEHOLDER: 'Enter city',
  CONTENT_LABEL: 'City',
};

const shippingStreet: InputOptions = {
  ID: 'add-street',
  TYPE: 'text',
  NAME: 'add-street',
  PLACEHOLDER: 'Enter street',
  CONTENT_LABEL: 'Street',
};

const shippingStreetNumber: InputOptions = {
  ID: 'add-street-number',
  TYPE: 'text',
  NAME: 'add-street-number',
  PLACEHOLDER: 'Enter street number',
  CONTENT_LABEL: 'Street number',
};

const shippingPostal: InputOptions = {
  ID: 'add-postal',
  TYPE: 'text',
  NAME: 'add-postal',
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
