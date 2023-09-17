import { InputOptions } from './fieldset-interfaces';

const emailOptions: InputOptions = {
  ID: 'registartion-email',
  TYPE: 'text',
  NAME: 'registartion-email',
  PLACEHOLDER: 'Enter email',
  CONTENT_LABEL: 'Email',
};

const firstNameOptions: InputOptions = {
  ID: 'first-name',
  TYPE: 'text',
  NAME: 'first-name',
  PLACEHOLDER: 'Enter Firstname',
  CONTENT_LABEL: 'Firstname',
};

const lastNameOptions: InputOptions = {
  ID: 'last-name',
  TYPE: 'text',
  NAME: 'last-name',
  PLACEHOLDER: 'Enter Lastname',
  CONTENT_LABEL: 'Lastname',
};

const dateDirthOptions: InputOptions = {
  ID: 'date-birth',
  TYPE: 'date',
  NAME: 'date-birth',
  PLACEHOLDER: 'Enter datebirth',
  CONTENT_LABEL: 'Date birth',
};

const OPTIONS: InputOptions[] = [emailOptions, firstNameOptions, lastNameOptions, dateDirthOptions];

export { OPTIONS };
