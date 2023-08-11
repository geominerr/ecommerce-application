enum TagNames {
  DIV = 'div',
  H3 = 'h3',
  FORM = 'form',
  H5 = 'h5',
}

enum Styles {
  FORM = 'login-form',
  TITLE = 'login__title',
  INPUT_ERROR = 'input--error',
  SUBMIT_WRAPPER = 'submit-wrapper',
  TITLE_HINT = 'title-hint',
}

enum Content {
  TITLE = 'Welcome back',
  TITLE_HINT = "Don't Have an Account? Join Us!",
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
  ID_VALUE_FORM = 'login-form',
}

enum TypeButton {
  LOGIN = 'login',
  SIGN_UP = 'signup',
}

export { TagNames, Styles, Content, Events, FormFields, Attributes, TypeButton };
