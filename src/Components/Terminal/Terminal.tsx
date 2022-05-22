import { Grid, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import TerminalButton from "./TerminalButton";

const Terminal = ({ position = { x: 20, y: 20 } }) => {
  const [state, setState] = useState({
    isDragging: false,
    dX: position.x,
    dY: position.y,
  });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (state.isDragging) {
        setState((prevState) => ({
          ...prevState,
          dX: prevState.dX + e.movementX,
          dY: prevState.dY + e.movementY,
        }));
      }
    },
    [state.isDragging]
  );

  const onMouseDown = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isDragging: true,
    }));
  }, []);

  const onMouseUp = useCallback(() => {
    if (state.isDragging) {
      setState((prevState) => ({
        ...prevState,
        isDragging: false,
      }));
    }
  }, [state.isDragging]);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <Grid
      style={{
        display: "block",
        position: "absolute",
        backgroundColor: "transparent",
        width: 640,
        height: 480,
        borderRadius: 8,
        boxShadow: "10px 0px 70px 0px rgba(0, 0, 0, 0.56)",
        left: `${state.dX.toString().concat("px")}`,
        top: `${state.dY.toString().concat("px")}`,
      }}
    >
      <Grid
        style={{
          display: "flex",
          position: "relative",
          margin: 0,
          padding: "0.5rem",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          background: "black",
          width: "auto",
        }}
        onMouseDown={onMouseDown}
      >
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <TerminalButton backgroundColor="rgba(255, 59, 48, 1)" />
          <TerminalButton backgroundColor="rgba(255, 204, 0, 1)" />
          <TerminalButton backgroundColor="rgba(40, 205, 65)" />
        </Grid>
        <Typography
          style={{
            margin: "0 auto",
            color: "white",
            lineHeight: 1,
            height: 14,
            fontFamily:
              '--apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
            fontSize: 14,
            fontWeight: 400,
          }}
        >
          Children
        </Typography>
      </Grid>
      <Grid
        style={{
          //padding: "0.5rem",
          fontFamily: "Monaco, Menlo, monospace",
          fontWeight: "normal",
          fontSize: 12,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          color: "white",
          background: "rgba(0,0,0,0.9)",
          margin: 0,
          height: "calc(100% - 30px)",
        }}
      >
        Hello
      </Grid>
    </Grid>
  );
};

export default Terminal;
