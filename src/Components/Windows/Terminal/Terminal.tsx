import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { DraggableWindowProps } from "../Drag/DraggableAndResizableWindow";
import TerminalButton from "./TerminalButton";

interface TerminalProps extends DraggableWindowProps {}

export const useTerminalStyles = makeStyles({
  windowHeader: {
    display: "flex",
    position: "relative",
    margin: 0,
    padding: "0.5rem",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    background: "black",
    width: "auto",
  },
  headerButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
  headerText: {
    margin: "0 auto",
    color: "white",
    lineHeight: 1,
    height: 14,
    fontFamily:
      '--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontSize: 14,
    fontWeight: 400,
    caretColor: "transparent",
    userSelect: "none",
  },
  windowBody: {
    fontFamily: "Monaco, Menlo, monospace",
    fontWeight: "normal",
    fontSize: 12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    color: "white",
    background: "rgba(0,0,0,0.9)",
    margin: 0,
    height: "calc(100% - 30px)",
  },
});

const Terminal: React.FC<TerminalProps> = ({ onMouseDown }) => {
  const localStyles = useTerminalStyles();
  return (
    <>
      <Grid className={localStyles.windowHeader} onMouseDown={onMouseDown}>
        <Grid className={localStyles.headerButtons}>
          <TerminalButton backgroundColor="rgba(255, 59, 48, 1)" />
          <TerminalButton backgroundColor="rgba(255, 204, 0, 1)" />
          <TerminalButton backgroundColor="rgba(40, 205, 65, 1)" />
        </Grid>
        <Typography className={localStyles.headerText}>Children</Typography>
      </Grid>
      <Grid className={localStyles.windowBody}>Hello</Grid>
    </>
  );
};

export default Terminal;
