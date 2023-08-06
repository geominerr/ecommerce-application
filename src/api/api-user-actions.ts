import { Customer } from './api-interfaces';
import { APIAcceesToken } from './api-acces-token';
import { CTP_PROJECT_KEY, CTP_API_URL, STORE_KEY } from './api-env-constants';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class APIUserActions {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public STORE_KEY: string;

  constructor() {
    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
    this.STORE_KEY = STORE_KEY;
  }

  // eslint-disable-next-line max-lines-per-function
  public async registerUser(
    // поля нужно будет добавить, если возникнет необходимость
    // https://docs.commercetools.com/api/projects/customers#ctp:api:type:CustomerDraft
    email: string,
    firstName: string,
    lastName: string,
    title: string,
    shippingAddresses: number[],
    billingAddresses: number[],
    password: string
  ): Promise<void> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/in-store/key=${this.STORE_KEY}/me/signup`;

    if (!ACCESS_TOKEN) throw new Error('Failed to obtain access token.');

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const userData = {
      email,
      firstName,
      lastName,
      title,
      shippingAddresses,
      billingAddresses,
      password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        console.log('User registration successful.');
      } else {
        throw new Error(`User registration failed: ${await response.text()}`);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  public async loginUser(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getAccessToken();
    const url = `${this.CTP_API_URL}/${this.CTP_PROJECT_KEY}/in-store/key=${this.STORE_KEY}/me/login`;

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
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('User log in successful.');
        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }
}
