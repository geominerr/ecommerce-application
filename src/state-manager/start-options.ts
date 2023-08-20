import { IStateOptions } from './state-manager-interfaces';

const startState: IStateOptions = {
  isLogin: false,
  accessToken: null,
  refreshToken: null,
  tokenExpirateTime: null,
};

export default startState;
