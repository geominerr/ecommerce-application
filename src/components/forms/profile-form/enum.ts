enum TagNames {
  DIV = 'div',
  H3 = 'h3',
  FORM = 'form',
  H5 = 'h5',
  BUTTON = 'button',
}

enum Styles {
  FORM = 'profile-form',
  TITLE = 'profile__title',
  INPUT_ERROR = 'input--error',
  LOGIN_WRAPPER = 'login-btn-wrapper',
  TITLE_HINT = 'title-hint',
  INFO = 'personal-info',
  SHIPPING = 'shipping-addresses',
  BILLING = 'billing-addresses',
  BUTTON_ADD = 'add-button',
  BUTTON_CHANGE = 'change-button',
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
  ID_VALUE_FORM = 'profile-form',
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
