export enum DefaultValueType {
  PERCENT_STRING = "PERCENT_STRING",
  NUMBER_STRING = "NUMBER_STRING",
  CLASSIC_NUMBER = "CLASSIC_NUMBER",
}

export interface Position {
  x: number | string;
  y: number | string;
}

export interface Size {
  width: number;
  height: number;
}

export interface OpenedWindow {
  component: FC<TerminalProps>;
  windowName: string;
}
[];

export {};
