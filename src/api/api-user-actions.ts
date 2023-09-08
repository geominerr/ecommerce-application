import { Customer, CustomerResponse, ICustomerAndCart } from './api-interfaces';
import { APIAcceesToken } from './api-access-token';
import { APIAnonToken } from './api-anon-token';
import { CTP_PROJECT_KEY, CTP_API_URL, STORE_KEY, LOCAL_KEY } from './api-env-constants';
import { IUserData } from './api-interfaces';
import { ICartLocalData } from './cart-actions/api-cart-interfaces';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class APIUserActions {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public STORE_KEY: string;

  private keyAccessToken: string = LOCAL_KEY;

  private keyUserId: string = 'userID';

  private apiAnonToken: APIAnonToken;

  private storageKeyCart: string = '_cyber_(c@rt_ID)_punk_';

  constructor() {
    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
    this.STORE_KEY = STORE_KEY;
    this.apiAnonToken = new APIAnonToken();
  }

  public async registerUser(userData: IUserData): Promise<void> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/signup`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        this.saveTokensToLocalStorage(ACCESS_TOKEN);
      } else {
        const errorMessage = await response.text();
        throw new Error(JSON.parse(errorMessage).message);
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async loginUser(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    console.log(ACCESS_TOKEN);

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/login`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,
      anonymousCart,
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data: ICustomerAndCart = await response.json();
        this.saveTokensToLocalStorage(ACCESS_TOKEN);
        localStorage.setItem(this.keyUserId, data.customer.id);
        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async loginUserPassFlow(email: string, password: string): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getCustomerAccessToken({
      username: email,
      password: password,
    });
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/login`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,
    };

    try {
      if (this.isHasLocalCartData()) {
        await this.loginUserPassFlowWithAnonumyosToken(email, password);
      }

      const response: Response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        // interface Custmomer необходимо будет модифийировать теперь там два поля Сart и Customer
        const data: ICustomerAndCart = await response.json();
        localStorage.setItem('userID', data.customer.id);
        this.saveTokensToLocalStorage(ACCESS_TOKEN);

        // проверка, если в LS нет корзины то мы ее не прокидывали при авторизации значит и нет в ответе cart.id
        if (this.isHasLocalCartData()) {
          const newIdCart = data.cart.id;
          const newVersion = data.cart.version;
          this.updateLocalCartData(ACCESS_TOKEN, newIdCart, newVersion);
        }

        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  private async loginUserPassFlowWithAnonumyosToken(
    email: string,
    password: string
  ): Promise<Customer> {
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/login`;
    const anonymousToken = await this.apiAnonToken.getAnon();
    const idCart: string = JSON.parse(localStorage.getItem(this.storageKeyCart) || '')?.id;

    const headers = {
      Authorization: `Bearer ${anonymousToken}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      password,

      // данные анонимной корзины
      anonymousCart: {
        id: idCart,
        typeId: 'cart',
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
        updateProductData: true,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data = await response.json();

        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  public logoutUser(): void {
    const accessToken: string | null = localStorage.getItem(this.keyAccessToken);

    if (accessToken) {
      localStorage.removeItem(this.storageKeyCart);
      localStorage.removeItem(this.keyAccessToken);
      localStorage.removeItem(this.keyUserId);
      localStorage.removeItem('requestVersion');
    }
  }

  private saveTokensToLocalStorage(accessToken: string): void {
    if (accessToken) {
      localStorage.setItem(this.keyAccessToken, accessToken);
    }
  }

  public async getPersonalInfo(): Promise<CustomerResponse> {
    const ACCESS_TOKEN_LOCAL = localStorage.getItem(this.keyAccessToken);

    if (!ACCESS_TOKEN_LOCAL) throw new Error('Failed to obtain access token.');

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN_LOCAL}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async updatePersonalInfo(
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string
  ): Promise<void> {
    const requestVersion = localStorage.getItem('requestVersion');
    const requestData = {
      version: requestVersion !== null ? parseInt(requestVersion) : 0,
      actions: [
        {
          action: 'changeEmail',
          email: email,
        },
        {
          action: 'setFirstName',
          firstName: firstName,
        },
        {
          action: 'setLastName',
          lastName: lastName,
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: dateOfBirth,
        },
      ],
    };

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(this.keyAccessToken)}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Success
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async updateAddressesInfo(
    addressId: string,
    streetName: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    country: string
  ): Promise<void> {
    const requestVersion = localStorage.getItem('requestVersion');
    const requestData = {
      version: requestVersion !== null ? parseInt(requestVersion) : 0,
      actions: [
        {
          action: 'changeAddress',
          addressId: addressId,
          address: {
            country: country,
            postalCode: postalCode,
            city: city,
            streetName: streetName,
            streetNumber: streetNumber,
          },
        },
      ],
    };

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(this.keyAccessToken)}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Success
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  public async removeShippingAddress(shippingAddressId: string): Promise<void> {
    const requestVersion = localStorage.getItem('requestVersion');
    const requestData = {
      version: requestVersion !== null ? parseInt(requestVersion) : 0,
      actions: [
        {
          action: 'removeAddress',
          addressId: shippingAddressId,
        },
      ],
    };

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(this.keyAccessToken)}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Success
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  public async removeBillingAddress(billingAddressId: string): Promise<void> {
    const requestVersion = localStorage.getItem('requestVersion');
    const requestData = {
      version: requestVersion !== null ? parseInt(requestVersion) : 0,
      actions: [
        {
          action: 'removeAddress',
          addressId: billingAddressId,
        },
      ],
    };

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(this.keyAccessToken)}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        // Success
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  }

  public async changeUserPassword(currentPassword: string, newPassword: string): Promise<void> {
    const requestVersion = localStorage.getItem('requestVersion');
    const requestData = {
      version: requestVersion !== null ? parseInt(requestVersion) : 0,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/me/password`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(this.keyAccessToken)}`,
      'Content-Type': 'application/json',
    };

    try {
      const response: Response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      throw error;
    }
  }

  private isHasLocalCartData(): boolean {
    const localCartData = localStorage.getItem(this.storageKeyCart);
    if (localCartData) {
      return true;
    }

    return false;
  }

  private updateLocalCartData(customerToken: string, id: string, version: number): void {
    const localData = localStorage.getItem(this.storageKeyCart);

    if (localData) {
      const cartData: ICartLocalData = JSON.parse(localData);
      cartData.anonymousId = '';
      cartData.customerToken = customerToken;
      cartData.id = id;
      cartData.version = version;

      localStorage.setItem(this.storageKeyCart, JSON.stringify(cartData));
    }
  }
}
