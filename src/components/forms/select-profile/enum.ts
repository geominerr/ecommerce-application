enum TagNames {
  DIV = 'div',
  LABEL = 'label',
  SELECT = 'select',
  OPTION = 'option',
}

enum Styles {
  CONTAINER = 'input-container',
  LABEL = 'label',
  SELECT = 'select-custom',
  OPTION = 'option',
  SELECT_ERROR = 'select--error',
}

enum Events {
  CHANGE = 'change',
}

enum Address {
  BILLING = 'billing',
  SHIPPING = 'shipping',
  NEW_ADDRESS = 'new',
}

enum Attributes {
  ID = 'id',
  FOR = 'for',
  NAME = 'name',
  VALUE = 'value',
}

export { TagNames, Styles, Address, Attributes, Events };
