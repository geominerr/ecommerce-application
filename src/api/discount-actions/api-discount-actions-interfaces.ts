interface IResponseDiscount {
  results: IDiscount[];
}

interface IDiscount {
  id: string;
  code: string;
  name: {
    en: string;
  };
}

export { IResponseDiscount };
