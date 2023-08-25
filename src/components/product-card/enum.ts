enum TagNames {
  DIV = 'div',
  H4 = 'h4',
  P = 'p',
  IMG = 'img',
  BUTTON = 'button',
  A = 'a',
}

enum Styles {
  PRODUCT_CARD = 'product-card',
  CONTAINER = 'container-card',
  LINK = 'link-card',
  CARD = 'card',
  IMG_WRAPPER = 'card__img-wrapper',
  IMG = 'card__img',
  TITLE = 'card__title',
  PRICE = 'card__price',
  PRICE_DISCOUNT = 'card__price-discount',
  PRICE_DISABLED = 'card__price--disabled',
  DESCRIPTION = 'card__description',
  BUTTON_CART = 'card__button-cart',
}

enum Events {
  CLICK = 'click',
}
enum Content {
  BUTTON_CART = 'Add to cart',
}

enum Attributes {
  ID = 'id',
  HREF = 'href',
  HREF_VALUE_DETAIL_PRODUCT = '/detail-product',
}

export { TagNames, Styles, Content, Events, Attributes };
