class ProductMap {
  private map = new Map();

  private productCounter: HTMLElement | null = null;

  // selector cпециально с точкой, т.к. используется для querySelector
  private styleCounter: string = '.product-counter';

  private styleVisibleCounter: string = 'product-counter--visible';

  public reset(): void {
    this.map.clear();
    this.changeQuantityInProductCounter();
  }

  public setProduct(productId: string, lineItemID: string): void {
    this.map.set(productId, lineItemID);
    this.changeQuantityInProductCounter();
  }

  public getLineItemId(productId: string): string {
    return this.map.get(productId);
  }

  public removeProduct(productId: string): void {
    this.map.delete(productId);
    this.changeQuantityInProductCounter();
  }

  public hasProduct(productId: string): boolean {
    return this.map.has(productId);
  }

  public getQuantity(): number {
    return this.map.size;
  }

  public updateMap(entries: [string, string][]): void {
    this.setProductCounter();
    entries.forEach((entrie) => this.map.set(entrie[0], entrie[1]));
    this.changeQuantityInProductCounter();
  }

  private changeQuantityInProductCounter(): void {
    const { productCounter, styleVisibleCounter } = this;
    const valueCounter: number = this.map.size;

    if (productCounter) {
      if (valueCounter) {
        productCounter.innerText = `${valueCounter}`;

        if (!productCounter.classList.contains(styleVisibleCounter)) {
          productCounter.classList.add(styleVisibleCounter);
        }
      } else {
        productCounter.classList.remove(styleVisibleCounter);
      }
    }
  }

  private setProductCounter(): void {
    this.productCounter = document.querySelector(this.styleCounter);
  }
}

const productMap = new ProductMap();

export default productMap;
