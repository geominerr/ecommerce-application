import {
  IProductResponse,
  IProductData,
  IProductImage,
  IProductAttribute,
  ProductData,
  RawProductData,
} from './response-converter-interfaces';

function normalizeAttributeName(name: string): string {
  return name
    .split('-')
    .map((partName, index) => {
      if (index === 0) {
        return partName[0].toUpperCase() + partName.slice(1);
      }
      return partName;
    })
    .join(' ');
}

function converteResponseData(response: IProductResponse): IProductData {
  const id: string = response.id;
  const title: string = response.name.en;
  const description: string = response.description.en;
  const priceNumber: number = response.masterVariant.prices[0].value.centAmount;
  const price: string = `€ ${(priceNumber / 100).toFixed(2)}`;
  const discountPriceNumber: number | undefined =
    response.masterVariant?.prices[0]?.discounted?.value?.centAmount;
  const images: string[] = response.masterVariant.images.map(
    (image: IProductImage): string => image.url
  );

  const attributes: IProductAttribute[] = response.masterVariant.attributes.map((attribute) => {
    const name = normalizeAttributeName(attribute.name);

    return { name: name, value: attribute.value };
  });

  const productData: IProductData = {
    id,
    title,
    description,
    price,
    images,
    attributes,
  };

  if (discountPriceNumber) {
    const discountPrice: string = `€ ${(discountPriceNumber / 100).toFixed(2)}`;
    productData.discountPrice = discountPrice;
  }

  return productData;
}

function transform(data: RawProductData): ProductData {
  const { id, name, masterVariant } = data;
  const images: string[] = data.masterVariant.images.map(
    (imageData: IProductImage): string => imageData.url
  );
  const priceNumber: number = masterVariant.prices[0].value.centAmount;
  const price: string = `€ ${(priceNumber / 100).toFixed(2)}`;

  const transformed: ProductData = {
    id,
    name: name.en,
    img: images,
    price: price,
  };

  return transformed;
}

export default converteResponseData;
export { transform };
