import { AccessTokenResponse, IPassFlow } from './api-interfaces';

import {
  USER_CTP_CLIENT_ID,
  USER_CTP_CLIENT_SECRET,
  USER_CTP_SCOPES,
  CTP_AUTH_URL,
} from './api-env-constants';

export class APIAcceesToken {
  public CTP_CLIENT_ID: string;

  public CTP_CLIENT_SECRET: string;

  public CTP_SCOPES: string;

  public CTP_AUTH_URL: string;

  public AUTH_URL: string;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  private keyRefreshToken: string = '_cyber_(^-^)_punk_R';

  private keyExpireTime: string = '_cyber_(^-^)_punk_T';

  constructor() {
    this.CTP_CLIENT_ID = USER_CTP_CLIENT_ID;
    this.CTP_CLIENT_SECRET = USER_CTP_CLIENT_SECRET;
    this.CTP_SCOPES = USER_CTP_SCOPES;
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
      this.saveTokensToLocalStorage(responseData);

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
      this.saveTokensToLocalStorage(responseData);

      return responseData.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }

  private saveTokensToLocalStorage(data: AccessTokenResponse): void {
    const accessToken: string = data.access_token;
    const refreshToken: string | undefined = data.refresh_token;
    const timeAction: number = data.expires_in;
    const currentTime: number = Math.floor(Date.now() / 1000);
    const tokenExpirationTime: string = (currentTime + timeAction - 3600).toString();

    if (accessToken && refreshToken && timeAction) {
      localStorage.setItem(this.keyAccessToken, accessToken);
      localStorage.setItem(this.keyExpireTime, tokenExpirationTime);

      if (refreshToken) {
        localStorage.setItem(this.keyRefreshToken, refreshToken);
      }
    }
  }

  public getTokenFromLocalStorage(): string | null {
    const accessToken: string | null = localStorage.getItem(this.keyAccessToken);
    const tokenExpirateTime: number | null = Number(localStorage.getItem(this.keyExpireTime));
    const currentTime: number = Math.floor(Date.now() / 1000);

    if (accessToken && tokenExpirateTime && tokenExpirateTime < currentTime) {
      return accessToken;
    }

    return null;
  }

  public async refreshAccessToken(): Promise<string | undefined> {
    const url = `https://auth.europe-west1.gcp.commercetools.com/oauth/token`;
    const credentials = `${this.CTP_CLIENT_ID}:${this.CTP_CLIENT_SECRET}`;
    const authHeader = 'Basic ' + btoa(credentials);
    const refreshToken = localStorage.getItem(this.keyRefreshToken);

    if (refreshToken) {
      const data = new URLSearchParams();
      data.append('grant_type', 'refresh_token');
      data.append('refresh_token', refreshToken);

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
        this.saveTokensToLocalStorage(responseData);

        return responseData.access_token;
      } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error;
      }
    } else {
      console.log('You need autorization');
    }
  }
}
