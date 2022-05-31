import { IconButton, makeStyles } from "@material-ui/core";
import { ReactComponent as CloseIcon } from "../../../Icons/closeWindow.svg";
import { ReactComponent as DashIcon } from "../../../Icons/minusIcon.svg";
import { ReactComponent as PlusIcon } from "../../../Icons/plusIcon.svg";
import React, { CSSProperties } from "react";

interface TerminalButtonProps {
  type: ButtonTypes;
  isHovering?: boolean;
  style?: CSSProperties;
}

const useLocalStyles = makeStyles({
  buttonStyles: {
    borderRadius: "50%",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 14,
    width: 14,
    height: 14,
    padding: 0,
    marginRight: "0.5rem",
  },
});

export enum ButtonTypes {
  CLOSE = "CLOSE",
  HIDE = "HIDE",
  FULL_SCREEN = "FULL_SCREEN",
}

const getColor = (type: ButtonTypes) => {
  switch (type) {
    case ButtonTypes.CLOSE:
      return "rgba(255, 59, 48, 1)";
    case ButtonTypes.HIDE:
      return "rgba(255, 204, 0, 1)";
    case ButtonTypes.FULL_SCREEN:
      return "rgba(40, 205, 65, 1)";
  }
};

const getIcon = (type: ButtonTypes, style: CSSProperties) => {
  switch (type) {
    case ButtonTypes.CLOSE:
      return <CloseIcon style={style} />;
    case ButtonTypes.HIDE:
      return <DashIcon style={style} />;
    case ButtonTypes.FULL_SCREEN:
      return <PlusIcon style={style} />;
  }
};

const TerminalButton: React.FC<TerminalButtonProps> = ({
  type,
  isHovering,
  style,
}) => {
  const localClasses = useLocalStyles();
  return (
    <IconButton
      className={localClasses.buttonStyles}
      style={{ backgroundColor: getColor(type), ...style }}
    >
      {isHovering && getIcon(type, { width: 8, height: 8 })}
    </IconButton>
  );
};

export default TerminalButton;
