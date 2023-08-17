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
  DEFAULT_SHIP_ADDRESS = 'Attention! You have set a default shipping address. All invoices will be sent to this address',
  DEFAULT_BILL_ADDRESS = 'Attention! You have set a default account address. All deliveries will be to this address.',
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
  ID_VALUE_CHECKBOX_SHIP = 'shipping-checkbox',
  ID_VALUE_CHECKBOX_BILL = 'billing-checkbox',
}

enum TypeButton {
  LOGIN = 'login',
  SIGN_UP = 'signup',
}

export { TagNames, Styles, Content, Events, FormFields, Attributes, TypeButton };
