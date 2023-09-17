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

interface ICartLocalData {
  customerToken?: string;
  anonymousToken?: string;
  id: string;
  anonymousId: string;
  version: number;
}

interface IConvertedLocalData {
  token: string;
  id: string;
  anonymousId: string;
  version: number;
}

export { IResponseCart, ICartLocalData, IConvertedLocalData };
