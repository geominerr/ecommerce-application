type CallbackStub = (inuptValue: string) => string | null;

type InputOptions = {
  ID: string;
  TYPE: string;
  NAME: string;
  PLACEHOLDER: string;
  CONTENT_LABEL: string;
};

export { CallbackStub, InputOptions };
