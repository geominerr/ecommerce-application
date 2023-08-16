export interface Route {
  path: string;
  view: View;
}

export interface View {
  setTitle(): void;
  getHtml(): Promise<string | HTMLElement>;
}
