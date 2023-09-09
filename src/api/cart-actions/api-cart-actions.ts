import { CTP_API_URL, CTP_PROJECT_KEY, LOCAL_KEY } from '../api-env-constants';
import { ICartLocalData, IResponseCart } from './api-cart-interfaces';
import { APIAnonToken } from '../api-anon-token';
import productMap from '../../utils/product-map/product-map';
import { extractlineItemID } from '../../utils/response-converter/response-converter';

class APICartActions {
  private productMap = productMap;

  private apiAnonToken: APIAnonToken;

  private apiUrl: string = CTP_API_URL;

  private projectKey: string = CTP_PROJECT_KEY;

  private storageKey: string = '_cyber_(c@rt_ID)_punk_';

  private storageKeyAccessToken: string = LOCAL_KEY;

  constructor() {
    this.apiAnonToken = new APIAnonToken();
  }

  // eslint-disable-next-line max-lines-per-function
  public async createCart(): Promise<void> {
    let token = '';
    const accessToken = localStorage.getItem(this.storageKeyAccessToken);
    // при создании новой коризины очищаем наш словарь продуктов
    this.productMap.reset();
    // проверяем залогинен ли пользователь чтобы не создавать анонимную корзину.
    if (accessToken) {
      token = accessToken;
    } else {
      token = await this.apiAnonToken.getAnon();
    }

    const url = `${this.apiUrl}/${this.projectKey}/me/carts`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      currency: 'EUR',
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData: IResponseCart = await response.json();

      // сохраняем данные корзины для дальнейшего взаимодесвтия с ней в LS
      const localData: ICartLocalData = {
        id: responseData.id,
        anonymousId: responseData.anonymousId,
        version: responseData.version,
      };

      if (accessToken) {
        localData.customerToken = token;
      }

      console.log(responseData);
      localStorage.setItem(this.storageKey, JSON.stringify(localData));
    } catch (error) {
      throw error;
    }
  }

  // просто получаем корзину, при клике на иконку Cart получаем данные корзины, которые мы конвертируем уже на странице cart и отрисуем
  public async getCart(): Promise<IResponseCart | null> {
    if (!this.isCreatedCart()) await this.createCart();

    /** Получаем из LS  данные корзины...если данные есть, получаем корзину,
     * если  во время сессии кто то почистить LS вернем null,
     * мб вместо return null стоит вызвать createCart... ) */
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();

    if (localData) {
      const idCart = localData.id;
      // после логина будем использовать customerToken, anonymous удалим из LS
      const token = localData.customerToken || anonymousToken || '';
      const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        const response: Response = await fetch(url, {
          method: 'GET',
          headers: headers,
        });

        const responseData: IResponseCart = await response.json();

        return responseData;
      } catch (error) {
        throw error;
      }
    }

    return null;
  }

  // передаем ID товара, если повторно вызывать с одинаковым id товара, то будет увелечивать количество товара + 1
  public async addProductByID(id: string): Promise<string> {
    if (!this.isCreatedCart()) await this.createCart();

    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart = localData.id;
    const token = localData.customerToken || anonymousToken || '';
    const version = localData.version;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const data = {
      version: version,
      actions: [
        {
          action: 'addLineItem',
          productId: id,
          variantId: 1,
          quantity: 1,
        },
      ],
    };
    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
      const responseData: IResponseCart = await response.json();
      const newVersion: number = responseData.version;
      if (newVersion) this.updateLocalData(newVersion);
      // этот метод будет возваращать lineItemID, чтобы на детальной старнице мы могли удалить этот товал
      return extractlineItemID(responseData, id);
    } catch (error) {
      throw error;
    }
  }

  // передаем LineItemID , можем произвольно изменить количество товара, если количесвто указать 0 полностью удалить товар из корзины.
  public async changeAmountByLineItemID(itemId: string, quantity: number): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart = localData.id;
    const token = localData.customerToken || anonymousToken || '';
    const version = localData.version;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      version: version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: itemId,
          quantity: quantity,
        },
      ],
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData: IResponseCart = await response.json();
      const newVersion: number = responseData.version;
      if (newVersion) this.updateLocalData(newVersion);

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  // передаем LineItemID , если количесвто не передавать quantity в тело запроса полностью удалить товар из корзины.
  public async removetByLineItemID(itemId: string, quantity: number): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart = localData.id;
    const token = localData.customerToken || anonymousToken || '';
    const version = localData.version;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      version: version,
      actions: [
        {
          action: 'removeLineItem',
          lineItemId: itemId,
          quantity: quantity,
        },
      ],
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData: IResponseCart = await response.json();
      const newVersion: number = responseData.version;
      if (newVersion) this.updateLocalData(newVersion);

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  public async addDicsount(discountCode: string): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart = localData.id;
    const token = localData.customerToken || anonymousToken || '';
    const version = localData.version;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const data = {
      version: version,
      actions: [
        {
          action: 'addDiscountCode',
          code: discountCode,
        },
      ],
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData: IResponseCart = await response.json();
      const newVersion: number = responseData.version;
      if (newVersion) this.updateLocalData(newVersion);

      return responseData;
    } catch (error) {
      throw error;
    }
  }

  // idDiscount отличается от ID самого промо кода, после добавления скидки, необходимо из ответа брать єтот id  и писать его в LS
  public async removeDicsount(idDiscount: string): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart = localData.id;
    const token = localData.customerToken || anonymousToken || '';
    const version = localData.version;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts/${idCart}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const data = {
      version: version,
      actions: [
        {
          action: 'removeDiscountCode',
          discountCode: {
            typeId: 'discount-code',
            id: idDiscount,
          },
        },
      ],
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });

      const responseData: IResponseCart = await response.json();
      const newVersion: number = responseData.version;
      if (newVersion) this.updateLocalData(newVersion);
      return responseData;
    } catch (error) {
      throw error;
    }
  }

  private updateLocalData(version: number): void {
    const localCartData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    localCartData.version = version;

    localStorage.setItem(this.storageKey, JSON.stringify(localCartData));
  }

  private isCreatedCart(): boolean {
    if (localStorage.getItem(this.storageKey)) {
      return true;
    }

    return false;
  }
}

const APICart = new APICartActions();

export default APICart;
