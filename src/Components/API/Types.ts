import { FC } from "react";

export interface DraggableWindowProps {
  onMouseDown?: () => void;
}

export interface WindowButtunActions {
  onCloseButtonClick: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onHideButtonClick: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onGrowButtonClick: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface WindowButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

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
  width: number | string;
  height: number | string;
}

export interface windowComponent
  extends WindowButtunActions,
    DraggableWindowProps {}

export interface WindowType {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  key: string;
  component: FC<windowComponent>;
  isAppStarted?: boolean;
  initialPosition?: Position;
  initialSize?: Size;
  isFullScreen?: boolean;
  isWindowHidden?: boolean;
  isInBottomList?: boolean;
}

export {};
