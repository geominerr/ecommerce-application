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

export { ICart, ICartProduct };
