import { InputOptions } from '../input-base/input-base-interfaces';

const emailOptions: InputOptions = {
  ID: 'login-email',
  TYPE: 'text',
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
