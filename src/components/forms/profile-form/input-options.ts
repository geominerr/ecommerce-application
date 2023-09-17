import { InputOptions } from '../input-profile/input-base/input-base-interfaces';

const emailOptions: InputOptions = {
  ID: 'login-email',
  TYPE: 'email',
  NAME: 'email',
  PLACEHOLDER: 'Enter email',
  CONTENT_LABEL: 'Email',
};

const passwordOptions: InputOptions = {
  ID: 'login-password',
  TYPE: 'password',
  NAME: 'password',
  PLACEHOLDER: 'Enter password',
  CONTENT_LABEL: 'Password',
};

export { emailOptions, passwordOptions };
