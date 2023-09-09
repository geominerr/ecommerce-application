import {
  IProductResponse,
  IProductData,
  IProductImage,
  IProductAttribute,
  ProductData,
  RawProductData,
  IResponseCart,
  ICart,
  ILineItem,
  ICartProduct,
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
  const key: string = response.key;
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
    key,
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
  const discountPriceNumber: number | undefined =
    masterVariant.prices[0]?.discounted?.value?.centAmount;
  const description = data.description?.en || '';
  const transformed: ProductData = {
    id,
    name: name.en,
    img: images,
    price: price,
    description: description,
  };

  if (discountPriceNumber) {
    const discountPrice: string = `€ ${(discountPriceNumber / 100).toFixed(2)}`;
    transformed.discountPrice = discountPrice;
  }

  return transformed;
}

function converteLineItem(lineItem: ILineItem): ICartProduct {
  const productId = lineItem?.productId;
  const lineItemId = lineItem?.id;
  const name = lineItem?.name?.en;
  const imageUrl = lineItem?.variant?.images[0]?.url;
  const quantity = lineItem.quantity;
  const priceNumber = lineItem?.price?.value?.centAmount;
  const price = `€ ${(priceNumber / 100).toFixed(2)}`;
  const discountPriceNumber = lineItem?.discountedPrice?.value?.centAmount;

  let totalPrice = `€ ${(lineItem?.totalPrice?.centAmount / 100).toFixed(2)}`;
  let discountPrice = '';
  let totalDiscountedPrice = '';

  // totalDiscountPrice (если используется скидка) === totalPrice  в теле ответа....
  // если скидки нет то и discountPriceNumber тоже не будет...
  if (discountPriceNumber) {
    totalDiscountedPrice = totalPrice;
    discountPrice = `€ ${(discountPriceNumber / 100).toFixed(2)}`;
    // не нашел totalPrice без скидки, если используется промо, поэтому считаем сами)
    totalPrice = `€ ${((priceNumber * quantity) / 100).toFixed(2)}`;
  }

  return {
    productId,
    lineItemId,
    name,
    imageUrl,
    quantity,
    price,
    totalPrice,
    discountPrice,
    totalDiscountedPrice,
  };
}

function converteResponseCartData(response: IResponseCart): ICart {
  const id = response?.id;
  const totalPrice = `€ ${(response?.totalPrice?.centAmount / 100)?.toFixed(2)}`;
  const totalProducts = response?.totalLineItemQuantity;
  // может быть пустой массив
  let products: ICartProduct[] = [];

  if (response?.lineItems?.length) {
    products = response?.lineItems?.map((lineItem) => converteLineItem(lineItem));
  }

  return {
    id: id,
    products: products,
    totalPrice: totalPrice,
    totalProducts: totalProducts,
  };
}

function extractEntries(response: IResponseCart): [string, string][] {
  const lineItems = response?.lineItems;

  return lineItems.map((lineItem) => [lineItem.productId, lineItem.id]);
}

function extractlineItemID(response: IResponseCart, productId: string): string {
  const lineItems = response?.lineItems;
  let lineItemId = '';

  if (lineItems) {
    lineItems.forEach((lineItem) => {
      if (lineItem?.productId === productId) {
        lineItemId = lineItem.id;
      }
    });
  }

  return lineItemId;
}

export default converteResponseData;
export { transform, converteResponseCartData, extractlineItemID, extractEntries };
