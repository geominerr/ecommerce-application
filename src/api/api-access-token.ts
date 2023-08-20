import { AccessTokenResponse, IPassFlow } from './api-interfaces';

import { CTP_CLIENT_ID, CTP_CLIENT_SECRET, CTP_SCOPES, CTP_AUTH_URL } from './api-env-constants';

export class APIAcceesToken {
  public CTP_CLIENT_ID: string;

  public CTP_CLIENT_SECRET: string;

  public CTP_SCOPES: string;

  public CTP_AUTH_URL: string;

  public AUTH_URL: string;

  constructor() {
    this.CTP_CLIENT_ID = CTP_CLIENT_ID;
    this.CTP_CLIENT_SECRET = CTP_CLIENT_SECRET;
    this.CTP_SCOPES = CTP_SCOPES;
    this.CTP_AUTH_URL = CTP_AUTH_URL;

    this.AUTH_URL = `${this.CTP_AUTH_URL}/oauth/token`;
  }

  public async getAccessToken(): Promise<string> {
    const url = this.AUTH_URL;
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
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }

  public async getCustomerAccessToken(dataUser: IPassFlow): Promise<string> {
    const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/cyberpunk/customers/token`;
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
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }
}
