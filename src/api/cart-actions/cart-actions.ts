import { APIAcceesToken } from '../api-access-token';
import { IAnonymousResponse } from '../api-interfaces';

export class APICartActions {
  private APIAcceesToken: APIAcceesToken;

  constructor() {
    this.APIAcceesToken = new APIAcceesToken();
  }

  // Метод ниже исключительно для теста api. Его необходимо удалить по окончанию настройки.
  public async getAnon(): Promise<void> {
    const storageAnonymousToken = localStorage.getItem('anonymousAccessToken');

    if (!storageAnonymousToken) {
      const AnonymousToken: IAnonymousResponse = await this.APIAcceesToken.getAnonymousToken();
      localStorage.setItem('anonymousAccessToken', AnonymousToken.access_token);
      localStorage.setItem('anonymousRefreshToken', String(AnonymousToken.refresh_token));
    }

    console.log('anon: ', storageAnonymousToken);

    // TODO: добавить рефрешь если токен просрочился. Нужно проверить, если он просрочился.

    // const refresh = await this.APIAcceesToken.refreshToken(anon.refresh_token);
    // console.log('refreshed: ', refresh);
  }
}
