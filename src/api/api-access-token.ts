import {
  AccessTokenResponse,
  IPassFlow,
  IAnonymousResponse,
  IAnonymousRefresh,
} from './api-interfaces';

import {
  USER_CTP_CLIENT_ID,
  USER_CTP_CLIENT_SECRET,
  USER_CTP_SCOPES,
  CTP_CLIENT_ID,
  CTP_AUTH_URL,
  CTP_CLIENT_SECRET,
  CTP_SCOPES,
  PROJECT_KEY,
} from './api-env-constants';

export class APIAcceesToken {
  public CTP_CLIENT_ID: string;

  public CTP_CLIENT_SECRET: string;

  public CTP_SCOPES: string;

  public CTP_AUTH_URL: string;

  public PROJECT_KEY: string;

  constructor() {
    this.CTP_CLIENT_ID = USER_CTP_CLIENT_ID;
    this.CTP_CLIENT_SECRET = USER_CTP_CLIENT_SECRET;
    this.CTP_SCOPES = USER_CTP_SCOPES;
    this.CTP_AUTH_URL = CTP_AUTH_URL;
    this.PROJECT_KEY = PROJECT_KEY;
  }

  //добавил чтобы можно было получить discounts под пользователським scope не работает
  public async getAdminAccessToken(): Promise<string> {
    const url = `${CTP_AUTH_URL}/oauth/token`;
    const credentials = `${CTP_CLIENT_ID}:${CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `${CTP_SCOPES}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as AccessTokenResponse;

      return responseData.access_token;
    } catch (error) {
      throw error;
    }
  }

  public async getAccessToken(): Promise<string> {
    const url = `${this.CTP_AUTH_URL}/oauth/token`;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `${this.CTP_SCOPES}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as AccessTokenResponse;

      return responseData.access_token;
    } catch (error) {
      throw error;
    }
  }

  public async getCustomerAccessToken(dataUser: IPassFlow): Promise<string> {
    const url = `${CTP_AUTH_URL}/oauth/${this.PROJECT_KEY}/customers/token`;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);

    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', `${dataUser.username}`);
    data.append('password', `${dataUser.password}`);
    data.append('scope', this.CTP_SCOPES);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as AccessTokenResponse;

      return responseData.access_token;
    } catch (error) {
      throw error;
    }
  }

  public async getAnonymousToken(): Promise<IAnonymousResponse> {
    const url = `${this.CTP_AUTH_URL}/oauth/${this.PROJECT_KEY}/anonymous/token`;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);

    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `${this.CTP_SCOPES}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as AccessTokenResponse;

      return {
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
        expires_in: responseData.expires_in,
      };
    } catch (error) {
      throw error;
    }
  }

  public async refreshToken(refreshToken: string | undefined): Promise<IAnonymousRefresh> {
    const url = `${this.CTP_AUTH_URL}/oauth/token`;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);

    if (!refreshToken) {
      refreshToken = '';
    }

    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', `${refreshToken}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      const responseData = (await response.json()) as IAnonymousRefresh;

      return {
        access_token: responseData.access_token,
        expires_in: responseData.expires_in,
      };
    } catch (error) {
      throw error;
    }
  }
}
