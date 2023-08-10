enum TagNames {
  DIV = 'div',
  LABEL = 'label',
  INPUT = 'input',
}

enum Styles {
  INPUT_CONTAINER = 'input-container',
  INPUT = 'input',
  INPUT_ERROR = 'input--error',
  INPUT_PASS = 'input--pass',
  LABEL = 'label',
  CHECKBOX = 'checkbox',
}

enum Attributes {
  TYPE = 'type',
  TYPE_VALUE_TEXT = 'text',
  TYPE_VALUE_PASS = 'password',
  TYPE_VALUE_CHECKBOX = 'checkbox',
  ID = 'id',
  ID_VALUE_INPUT = 'password',
  FOR = 'for',
  NAME = 'name',
  NAME_VALUE = 'password',
  PLACEHOLDER = 'placeholder',
  PLACEHOLDER_VALUE_PASS = 'Enter password',
}

enum Events {
  INPUT = 'input',
  CHANGE = 'change',
}

export { TagNames, Styles, Events, Attributes };
