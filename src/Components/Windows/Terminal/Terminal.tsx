import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { windowComponent } from "../../API/Types";
import WindowActionButtons from "../ui/WindowActionButtons";

interface TerminalProps extends windowComponent {}

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

const Terminal: React.FC<TerminalProps> = ({
  onMouseDown,
  onCloseButtonClick,
  onGrowButtonClick,
  onHideButtonClick,
}) => {
  const localStyles = useTerminalStyles();
  return (
    <>
      <Grid className={localStyles.windowHeader} onMouseDown={onMouseDown}>
        <Grid>
          <WindowActionButtons
            onCloseButtonClick={onCloseButtonClick}
            onGrowButtonClick={onGrowButtonClick}
            onHideButtonClick={onHideButtonClick}
          />
        </Grid>
        <Typography className={localStyles.headerText}>Terminal</Typography>
      </Grid>
      <Grid className={localStyles.windowBody}>Hello</Grid>
    </>
  );
};

export default Terminal;
