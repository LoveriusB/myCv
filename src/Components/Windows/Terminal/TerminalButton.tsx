import { IconButton } from "@material-ui/core";
import { ReactComponent as BrandIcon } from "src/Icons/close-window.svg";
import React from "react";

interface TerminalButtonProps {
  backgroundColor: string;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({ backgroundColor }) => {
  return (
    <IconButton
      style={{
        borderRadius: "50%",
        border: "none",
        minWidth: 14,
        width: 14,
        height: 14,
        padding: 0,
        marginRight: "0.5rem",
        backgroundColor,
      }}
    >
      <BrandIcon />
    </IconButton>
  );
};

export default TerminalButton;
