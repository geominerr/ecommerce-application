import { Customer } from './api-interfaces';
import { APIAcceesToken } from './api-access-token';
import { CTP_PROJECT_KEY, CTP_API_URL, STORE_KEY } from './api-env-constants';

const API_ACCESS_TOKEN = new APIAcceesToken();

export class APIUserActions {
  public CTP_PROJECT_KEY: string;

  public CTP_API_URL: string;

  public STORE_KEY: string;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  private keyRefreshToken: string = '_cyber_(^-^)_punk_R';

  private keyExpireTime: string = '_cyber_(^-^)_punk_T';

  constructor() {
    this.CTP_PROJECT_KEY = CTP_PROJECT_KEY;
    this.CTP_API_URL = CTP_API_URL;
    this.STORE_KEY = STORE_KEY;
  }

  // eslint-disable-next-line max-lines-per-function
  public async registerUser(
    // поля нужно будет добавить, если возникнет необходимость
    // https://docs.commercetools.com/api/projects/customers#ctp:api:type:CustomerDraft
    streetName_shipping: string,
    streetNumber_shipping: string,
    city_shipping: string,
    postalCode_shipping: string,
    country_shipping: string, // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    streetName_billing: string,
    streetNumber_billing: string,
    city_billing: string,
    postalCode_billing: string,
    country_billing: string,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string, // YYYY-MM-DD
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
      addresses: [
        {
          streetName: streetName_shipping,
          streetNumber: streetNumber_shipping,
          city: city_shipping,
          postalCode: postalCode_shipping,
          country: country_shipping,
        },
        {
          streetName: streetName_billing,
          streetNumber: streetNumber_billing,
          city: city_billing,
          postalCode: postalCode_billing,
          country: country_billing,
        },
      ],
      email,
      firstName,
      lastName,
      dateOfBirth,
      shippingAddresses: [0],
      billingAddresses: [1],
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
        const errorMessage = await response.text();
        throw new Error(JSON.parse(errorMessage).message);
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
        localStorage.setItem('userID', data.customer.id);
        return data.customer;
      } else {
        throw new Error(`${await response.json().then((data) => data.message)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  //eslint-disable-next-line
  public async loginUserPassFlow(
    email: string,
    password: string,
    anonymousCart?: { id: string; typeId: string }
  ): Promise<Customer> {
    const ACCESS_TOKEN = await API_ACCESS_TOKEN.getCustomerAccessToken({
      username: email,
      password: password,
    });
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
        localStorage.setItem('userID', data.customer.id);

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
      localStorage.removeItem(this.keyAccessToken);
      localStorage.removeItem(this.keyRefreshToken);
      localStorage.removeItem(this.keyExpireTime);
    }
  }
}
