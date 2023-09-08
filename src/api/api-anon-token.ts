import { APIAcceesToken } from './api-access-token';
import { IAnonymousRefresh, IAnonymousResponse } from './api-interfaces';

export class APIAnonToken {
  private APIAcceesToken: APIAcceesToken;

  constructor() {
    this.APIAcceesToken = new APIAcceesToken();
  }

  // Метод получеает анонимный токен, обновляет, если просрочен.
  // eslint-disable-next-line max-lines-per-function
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

      console.log(
        'Получен свежий токен: ',
        anonymousTokenResponse.access_token,
        'Срок жизни: ',
        anonymousTokenResponse.expires_in
      );
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

        console.log(
          'Вернулся обновленный токен: ',
          refreshedTokenResponse.access_token,
          'Срок жизни: ',
          refreshedTokenResponse.expires_in
        );
        return refreshedTokenResponse.access_token;
      }
    }

    console.log(
      'Токен вернулся из памяти: ',
      storageAnonymousToken,
      ' Обновится через:',
      (Number(tokenExpirationDate) - currentDate.getTime()) / 1000,
      'cек'
    );
    return storageAnonymousToken;
  }
}
