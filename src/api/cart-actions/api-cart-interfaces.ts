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
}

interface ILineItem {
  id: string;
  productId: string;
  name: {
    en: string;
  };
  variant: {
    images: IProductImage;
    attributes: IProductAttribute;
  };
  price: IPrice;
  quantity: number;
  totalPrice: ITotalPrice;
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

interface ITotalPrice {
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

interface ICartLocalData {
  customerToken?: string;
  anonymousToken?: string;
  id: string;
  anonymousId: string;
  version: number;
}

export { IResponseCart, ICartLocalData };
