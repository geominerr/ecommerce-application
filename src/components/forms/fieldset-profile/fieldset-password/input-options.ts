import { InputOptions } from './fieldset-interfaces';

const passwordOptions: InputOptions = {
  ID: 'old-password',
  TYPE: 'password',
  NAME: 'old-password',
  PLACEHOLDER: 'Enter password',
  CONTENT_LABEL: 'Old Password',
};

const newPasswordOptions: InputOptions = {
  ID: 'new-password',
  TYPE: 'password',
  NAME: 'new-password',
  PLACEHOLDER: 'Enter password',
  CONTENT_LABEL: 'New Password',
};

const confirmPasswordOptions: InputOptions = {
  ID: 'new-confirm-password',
  TYPE: 'password',
  NAME: 'new-confirm-password',
  PLACEHOLDER: 'Confirm password',
  CONTENT_LABEL: 'Confirm password',
};

const OPTIONS: InputOptions[] = [passwordOptions, newPasswordOptions, confirmPasswordOptions];

export { OPTIONS };
