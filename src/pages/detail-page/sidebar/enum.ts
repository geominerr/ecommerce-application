enum TagNames {
  ASIDE = 'aside',
  DIV = 'div',
  H3 = 'h3',
  H4 = 'h4',
  P = 'p',
  BUTTON = 'button',
  SPAN = 'span',
}

enum Styles {
  SIDEBAR = 'sidebar',
  TITLE = 'product__title',
  PRODUCT = 'product',
  PRICE_WRAPPER = 'product__price-wrapper',
  PRICE = 'product__price',
  PRICE_DISABLED = 'product__price--disabled',
  PRICE_DISCOUNT = 'product__price-discount',
  BUTTON = 'product__button',
  BUTTON_CREDIT = 'product__button--credit',
  BUTTON_WRAPPER = 'product__button-wrapper',
  DESCRIPTION = 'description',
  DESCRIPTION_TITLE = 'description__title',
  DESCRIPTION_TEXT = 'description__text',
  ATTRIBUTES = 'attributes',
  ATTRIBUTES_TITLE = 'attributes__title',
  ATTRIBUTES_ITEM_WRAP = 'attributes__item-wrapper',
  ATTRIBUTES_NAME = 'attributes__name',
  ATTRIBUTES_NAME_WRAP = 'attributes__name-wrapper',
  ATTRIBUTES_NAME_DECOR = 'attributes__name-decor',
  ATTRIBUTES_VALUE = 'attributes__value',
  STARS_WRAPPER = 'stars',
  STAR = 'star',
  STAR_ACTIVE = 'star--active',
}

enum Content {
  TITLE_DESCRIPTION = 'Description',
  TITLE_ATTRIBUTES = 'Characteristics',
  BUTTON_BUY = 'Add to cart',
  BUTTON_CREDIT = 'Buy in credit',
}

enum Events {
  CLICK = 'click',
}

enum Attributes {
  SRC = 'src',
  HREF = 'href',
}

export { TagNames, Styles, Events, Attributes, Content };
