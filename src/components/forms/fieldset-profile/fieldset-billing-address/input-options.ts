import { InputOptions } from './fieldset-interfaces';

const billingCity: InputOptions = {
  ID: 'billing-city',
  TYPE: 'text',
  NAME: 'billing-city',
  PLACEHOLDER: 'Enter billing city',
  CONTENT_LABEL: 'Billing city',
};

const billingStreet: InputOptions = {
  ID: 'billing-street',
  TYPE: 'text',
  NAME: 'billing-street',
  PLACEHOLDER: 'Enter billing street',
  CONTENT_LABEL: 'Billing street',
};

const billingStreetNumber: InputOptions = {
  ID: 'billing-street-number',
  TYPE: 'text',
  NAME: 'billing-street-number',
  PLACEHOLDER: 'Enter street number',
  CONTENT_LABEL: 'Street number',
};

const billingPostal: InputOptions = {
  ID: 'billing-postal',
  TYPE: 'text',
  NAME: 'billing-postal',
  PLACEHOLDER: 'Enter postal',
  CONTENT_LABEL: 'Postal',
};

const OPTIONS: InputOptions[] = [billingCity, billingStreet, billingStreetNumber, billingPostal];

export { OPTIONS };
