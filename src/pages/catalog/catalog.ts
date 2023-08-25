import TemplateView from '../template-view/template-view';
import './catalog.scss';
import { APIProductActions } from '../../api/product-actions/api-product-actions';
import { RawProductData, ProductData } from './catalog-interfaces';

import ProductCard from '../../components/product-card/product-card';

export default class Catalog extends TemplateView {
  private api: APIProductActions;

  constructor(api: APIProductActions) {
    super();
    this.api = api;
  }

  private documentTitle: string = 'Catalog';

  public async getHtml(): Promise<string> {
    return `<div class="catalog">This is Catalog page</div>`;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
    this.makeCard();
  }

  private async makeCard(): Promise<void> {
    const CARD_DATA = await this.api.getProjectData('product-projections', 20, 0);

    CARD_DATA.results.forEach((res) => {
      console.log('transformed', this.transform(res));
      new ProductCard(this.transform(res));
    });
  }

  private transform(data: RawProductData): ProductData {
    const { id, name, masterVariant } = data;

    const transformed: ProductData = {
      id,
      name: name.en,
      img: masterVariant.images,
      price: masterVariant.prices[0].value.centAmount / 100,
    };

    return transformed;
  }
}
