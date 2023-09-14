import { APIAcceesToken } from './api-access-token';
import { IAnonymousRefresh, IAnonymousResponse } from './api-interfaces';

export class APIAnonToken {
  private APIAcceesToken: APIAcceesToken;

  constructor() {
    this.APIAcceesToken = new APIAcceesToken();
  }

  // Метод получеает анонимный токен, обновляет, если просрочен.
  public async getAnon(): Promise<string> {
    const storageAnonymousToken = localStorage.getItem('anonymousAccessToken');
    const currentDate = new Date();
    const tokenExpirationDate = localStorage.getItem('anonymousTokenExpiration');

    if (!storageAnonymousToken) {
      const anonymousTokenResponse: IAnonymousResponse =
        await this.APIAcceesToken.getAnonymousToken();

      localStorage.setItem('anonymousAccessToken', anonymousTokenResponse.access_token);
      localStorage.setItem('anonymousRefreshToken', String(anonymousTokenResponse.refresh_token));

      const tokenExpiration =
        currentDate.getTime() + Number(anonymousTokenResponse.expires_in) * 1000;

      localStorage.setItem('anonymousTokenExpiration', String(tokenExpiration));
      return anonymousTokenResponse.access_token;
    }

    if (storageAnonymousToken && currentDate.getTime() > Number(tokenExpirationDate)) {
      const refreshToken = localStorage.getItem('anonymousRefreshToken');
      if (refreshToken) {
        const refreshedTokenResponse: IAnonymousRefresh = await this.APIAcceesToken.refreshToken(
          refreshToken
        );

        localStorage.setItem('anonymousAccessToken', refreshedTokenResponse.access_token);
        const tokenExpiration =
          currentDate.getTime() + Number(refreshedTokenResponse.expires_in) * 1000;

        localStorage.setItem('anonymousTokenExpiration', String(tokenExpiration));
        return refreshedTokenResponse.access_token;
      }
    }
    return storageAnonymousToken;
  }
}
