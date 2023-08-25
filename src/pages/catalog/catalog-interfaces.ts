export interface RawProductData {
  id: string;
  name: { en: string };
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
}

export interface IProductImage {
  url: string;
  label: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface ProductData {
  id: string;
  name: string;
  img: string[];
  price: string;
}
