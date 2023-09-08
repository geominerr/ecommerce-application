import { APIAcceesToken } from '../api-access-token';
import { CTP_API_URL, CTP_PROJECT_KEY } from '../api-env-constants';
import { ICartLocalData, IResponseCart } from './api-cart-interfaces';

class APICartActions {
  private apiAccesToken: APIAcceesToken;

  private apiUrl: string = CTP_API_URL;

  private projectKey: string = CTP_PROJECT_KEY;

  private storageKey: string = '_cyber_(c@rt_ID)_punk_';

  constructor() {
    this.apiAccesToken = new APIAcceesToken();
  }

  // создаем анонимную корзину.
  public async createCart(): Promise<void> {
    const anonymousToken = (await this.apiAccesToken.getAnonymousToken()).access_token;
    const url = `${this.apiUrl}/${this.projectKey}/me/carts`;

    const headers = {
      Authorization: `Bearer ${anonymousToken}`,
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
        anonymousToken: anonymousToken,
        id: responseData.id,
        anonymousId: responseData.anonymousId,
        version: responseData.version,
      };

      console.log(responseData);
      localStorage.setItem(this.storageKey, JSON.stringify(localData));
    } catch (error) {
      throw error;
    }
  }

  // просто получаем корзину, при клике на иконку Cart получаем данные корзины, которые мы конвертируем уже на странице cart и отрисуем
  public async getCart(): Promise<IResponseCart | null> {
    /** Получаем из LS  данные корзины...если данные есть, получаем корзину,
     * если  во время сессии кто то почистить LS вернем null,
     * мб вместо return null стоит вызвать createCart... )*/
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');

    if (localData) {
      const idCart = localData.id;
      // после логина будем использовать customerToken, anonymous удалим из LS
      const token = localData.anonymousToken || localData.customerToken || '';
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
  public async addProductByID(id: string): Promise<void> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const idCart = localData.id;
    const token = localData.anonymousToken || localData.customerToken || '';
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
    } catch (error) {
      throw error;
    }
  }

  // передаем LineItemID , можем произвольно изменить количество товара, если количесвто указать 0 полностью удалить товар из корзины.
  public async changeAmountByLineItemID(itemId: string, quantity: number): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const idCart = localData.id;
    const token = localData.anonymousToken || localData.customerToken || '';
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
          action: 'changeLineItemQuantity"',
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

  // передаем LineItemID , если количесвто указать 0 полностью удалить товар из корзины.
  public async removetByLineItemID(itemId: string, quantity: number): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const idCart = localData.id;
    const token = localData.anonymousToken || localData.customerToken || '';
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

  public async addDicsount(): Promise<IResponseCart> {
    const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    const idCart = localData.id;
    const token = localData.anonymousToken || localData.customerToken || '';
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
          code: 'max',
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
    const idCart = localData.id;
    const token = localData.anonymousToken || localData.customerToken || '';
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

  //
  // private getCartDataFromLocalStorage(): IConvertedLocalData | null {
  //   const localData: ICartLocalData = JSON.parse(localStorage.getItem(this.storageKey) || '');

  //   if (!localData) {
  //     return null;
  //   }

  //   const id = localData.id;
  //   const anonymousId = localData.anonymousId;
  //   const token = localData.anonymousToken || localData.customerToken ?? '';
  //   const version = localData.version;

  //   return { token, version, id, anonymousId };
  // }

  private updateLocalData(version: number): void {
    const localCartData = JSON.parse(localStorage.getItem(this.storageKey) || '');
    localCartData.version = version;
    console.log(localCartData.version);
    localStorage.setItem(this.storageKey, JSON.stringify(localCartData));
  }
}

export default APICartActions;
