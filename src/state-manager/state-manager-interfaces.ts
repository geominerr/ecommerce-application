interface IStateOptions {
  isLogin: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  tokenExpirateTime?: string | null;
}

export { IStateOptions };
