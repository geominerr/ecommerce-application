export interface Route {
  path: string;
  view: View;
}

export interface View {
  setTitle(path: string): unknown;
  getHtml(): Promise<string>;
}
