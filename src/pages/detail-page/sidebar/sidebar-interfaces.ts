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

export { IProductData, IProductAttribute };
