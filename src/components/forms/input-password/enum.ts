enum TagNames {
  DIV = 'div',
  INPUT = 'input',
}

enum Styles {
  INPUT_CONTAINER = 'input-container',
  INPUT = 'input',
  INPUT_ERROR = 'input--error',
  INPUT_PASS = 'input--pass',
  CHECKBOX = 'checkbox',
}

enum Attributes {
  TYPE = 'type',
  TYPE_VALUE_TEXT = 'text',
  TYPE_VALUE_PASS = 'password',
  TYPE_VALUE_CHECKBOX = 'checkbox',
  PLACEHOLDER = 'placeholder',
  PLACEHOLDER_VALUE_PASS = 'password',
}

enum Events {
  INPUT = 'input',
  CHANGE = 'change',
}

export { TagNames, Styles, Events, Attributes };
