interface IProductResponse {
  id: string;
  name: { en: string };
  description: { en: string };
  masterVariant: IProductVariant;
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
}

export { IProductResponse, IProductData, IProductImage, IProductAttribute };
