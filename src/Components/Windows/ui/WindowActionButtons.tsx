import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { WindowButtunActions } from "../../API/Types";
import WindowButton, { ButtonTypes } from "./WindowButton";

const useLocalStyles = makeStyles({
  headerButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
  },
});

interface WindowActionButtonsProps extends WindowButtunActions {}

const WindowActionButtons: React.FC<WindowActionButtonsProps> = ({
  onCloseButtonClick,
  onGrowButtonClick,
  onHideButtonClick,
}) => {
  const localStyles = useLocalStyles();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <Grid
      className={localStyles.headerButtons}
      onMouseEnter={() => setIsHovering((previousValue) => !previousValue)}
      onMouseLeave={() => setIsHovering((previousValue) => !previousValue)}
    >
      <WindowButton
        type={ButtonTypes.CLOSE}
        isHovering={isHovering}
        onClick={onCloseButtonClick}
      />
      <WindowButton
        type={ButtonTypes.HIDE}
        isHovering={isHovering}
        onClick={onHideButtonClick}
      />
      <WindowButton
        type={ButtonTypes.FULL_SCREEN}
        isHovering={isHovering}
        onClick={onGrowButtonClick}
      />
    </Grid>
  );
};

export default WindowActionButtons;
