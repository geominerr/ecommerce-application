class ProductMap {
  private map = new Map();

  private storageKeyCart: string = '_cyber_(c@rt_ID)_punk_';

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

  public updateMap(entries: [string, string][]): void {
    entries.forEach((entrie) => this.map.set(entrie[0], entrie[1]));
  }
}

const productMap = new ProductMap();

export default productMap;
