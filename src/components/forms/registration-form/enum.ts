enum TagNames {
  DIV = 'div',
  H3 = 'h3',
  FORM = 'form',
  H5 = 'h5',
}

enum Styles {
  FORM = 'registration-form',
  TITLE = 'registration__title',
  INPUT_ERROR = 'input--error',
  LOGIN_WRAPPER = 'login-btn-wrapper',
  TITLE_HINT = 'title-hint',
}

enum Content {
  TITLE = 'Register account',
  TITLE_HINT = 'Already have an account? Join us now!',
  LABEL = 'Set default address',
  LABEL_ONE = 'Select only this address',
  ONLY_ONE_ADDRESS = 'Attention! You have set only one address. All invoices and deliveries will be sent to this address.',
}

enum Events {
  CLICK = 'click',
}

enum FormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

enum Attributes {
  ID = 'id',
  ID_VALUE_FORM = 'registration-form',
  ID_VALUE_SHIP = 'shipping-checkbox',
  ID_VALUE_BILL = 'billing-checkbox',
  ID_VALUE_SHIP_DEF = 'shipping-checkbox-default',
  ID_VALUE_BILL_DEF = 'billing-checkbox-default',
}

enum TypeButton {
  LOGIN = 'login',
  SIGN_UP = 'signup',
}

export { TagNames, Styles, Content, Events, FormFields, Attributes, TypeButton };
