import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import WindowButton, { ButtonTypes } from "./WindowButton";

const useLocalStyles = makeStyles({
  headerButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
});

const WindowActionButtons = () => {
  const localStyles = useLocalStyles();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <Grid
      className={localStyles.headerButtons}
      onMouseEnter={() => setIsHovering((previousValue) => !previousValue)}
      onMouseLeave={() => setIsHovering((previousValue) => !previousValue)}
    >
      <WindowButton type={ButtonTypes.CLOSE} isHovering={isHovering} />
      <WindowButton type={ButtonTypes.HIDE} isHovering={isHovering} />
      <WindowButton type={ButtonTypes.FULL_SCREEN} isHovering={isHovering} />
    </Grid>
  );
};

export default WindowActionButtons;
