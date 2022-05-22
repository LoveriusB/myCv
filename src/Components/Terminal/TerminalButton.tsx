import { Button } from "@material-ui/core";
import React from "react";

interface TerminalButtonProps {
  backgroundColor: string;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({ backgroundColor }) => {
  return (
    <Button
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
    ></Button>
  );
};

export default TerminalButton;
