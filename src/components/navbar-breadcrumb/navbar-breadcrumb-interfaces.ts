interface ILinkOptions {
  href: string;
  content: string;
  imgPath?: string;
}

interface IMapPaths {
  amp: ILinkOptions;
  ctr: ILinkOptions;
  hps: ILinkOptions;
  sys: ILinkOptions;
  trt: ILinkOptions;
}

export { ILinkOptions, IMapPaths };
