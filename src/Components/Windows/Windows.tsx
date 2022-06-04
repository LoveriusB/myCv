import { Grid } from "@material-ui/core";
import { WindowType } from "../API/Types";
import Window from "./Window";

interface WindowsProps {
  openedWindows: WindowType[];
  setOpenedWindows: React.Dispatch<React.SetStateAction<WindowType[]>>;
}

const Windows: React.FC<WindowsProps> = ({
  openedWindows,
  setOpenedWindows,
}) => {
  return (
    <Grid style={{ width: "100%", height: "100%" }}>
      {openedWindows.map((openWindow, index) => {
        return (
          <Window
            openWindow={openWindow}
            key={openWindow.key}
            index={index}
            openedWindows={openedWindows}
            setOpenedWindows={setOpenedWindows}
          />
        );
      })}
    </Grid>
  );
};

export default Windows;
