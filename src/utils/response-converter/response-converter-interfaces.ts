interface IProductResponse {
  id: string;
  name: { en: string };
  description: { en: string };
  masterVariant: IProductVariant;
  key: string;
}

interface IProductVariant {
  prices: IProductPrice[];
  images: IProductImage[];
  attributes: IProductAttribute[];
}

interface IProductPrice {
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  discounted?: {
    value: {
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      id: string;
    };
  };
}

interface IProductImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface IProductAttribute {
  name: string;
  value: string;
}

interface IProductData {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  attributes: IProductAttribute[];
  discountPrice?: string;
  key: string;
}

interface ProductData {
  id: string;
  name: string;
  img: string[];
  price: string;
  discountPrice?: string;
  description: string;
}

interface RawProductData {
  id: string;
  name: { en: string };
  description?: { en: string };
  masterVariant: MasterVariant;
}

interface MasterVariant {
  images: IProductImage[];
  prices: Price[];
}

interface Price {
  value: {
    centAmount: number;
  };
  discounted?: {
    value: {
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
}

interface IResponseCart {
  type: string;
  id: string;
  version: number;
  anonymousId: string;
  lineItems: ILineItem[];
  cartState: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  totalLineItemQuantity: number;
}

interface ILineItem {
  id: string;
  productId: string;
  name: {
    en: string;
  };
  variant: {
    images: IProductImage[];
    attributes: IProductAttribute;
  };
  price: IPrice;
  quantity: number;
  totalPrice: {
    centAmount: number;
  };
  discountedPrice: IDiscountedPrice;
  discountedPricePerQuantity?: IDiscountPerQuantity[];
  key?: string;
  productKey?: string;
}

interface ICart {
  id: string;
  products: ICartProduct[];
  totalPrice: string;
  totalProducts: number;
}

interface ICartProduct {
  productId: string;
  lineItemId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: string;
  discountPrice?: string;
  totalPrice?: string;
  totalDiscountedPrice?: string;
}

interface IProductImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface IProductAttribute {
  name: string;
  value: string;
}

interface IPrice {
  value: {
    centAmount: number;
  };
  discounted?: {
    value: {
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
}

interface IDiscountedPrice {
  value: {
    centAmount: number;
  };
  includedDiscounts: IDiscount[];
}

interface IDiscount {
  discount: {
    typeId: string;
    id: string;
  };
  discountedAmount: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface IDiscountPerQuantity {
  quantity: number;
  discountedPrice: {
    value: {
      centAmount: number;
    };
    includedDiscounts: [
      {
        discount: {
          typeId: string;
          id: string;
        };
        discountedAmount: {
          centAmount: number;
        };
      }
    ];
  };
}

export {
  IProductResponse,
  IProductData,
  IProductImage,
  IProductAttribute,
  ProductData,
  RawProductData,
  IResponseCart,
  ILineItem,
  ICartProduct,
  ICart,
};
