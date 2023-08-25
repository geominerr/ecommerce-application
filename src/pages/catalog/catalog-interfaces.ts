export interface RawProductData {
  id: string;
  name: { en: string };
  masterVariant: MasterVariant;
}

interface MasterVariant {
  images: [];
  prices: Price[];
}

interface Price {
  value: {
    centAmount: number;
  };
}

export interface ProductData {
  id: string;
  name: string;
  img: [];
  price: number;
}
