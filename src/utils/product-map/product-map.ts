// пока работает без сохранения в LS , при перезагрузке будет асинхрон с корзиной.... )

class ProductMap {
  private map = new Map();

  public reset(): void {
    this.map.clear();
  }

  public setProduct(productId: string, lineItemID: string): void {
    this.map.set(productId, lineItemID);
  }

  public getLineItemId(productId: string): string {
    return this.map.get(productId);
  }

  public removeProduct(productId: string): void {
    this.map.delete(productId);
  }

  public hasProduct(productId: string): boolean {
    return this.map.has(productId);
  }

  public getQuantity(): number {
    return this.map.size;
  }
}

const productMap = new ProductMap();

export default productMap;
