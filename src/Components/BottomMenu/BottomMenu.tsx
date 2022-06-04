import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { ReactComponent as TerminalIcon } from "../../Icons/TerminalIcon.svg";
import { WindowType } from "../API/Types";

interface BottomMenuProps {
  allWindows: WindowType[];
  setOpenedWindows: React.Dispatch<React.SetStateAction<WindowType[]>>;
}

const useGlossMorphismStyles = makeStyles({
  iconsMenu: {
    position: "absolute",
    bottom: -20,
    height: 65,
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  glass: {
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: 20,
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
    height: "100%",
  },
});

const BottomMenu: React.FC<BottomMenuProps> = ({
  allWindows,
  setOpenedWindows,
}) => {
  const localStyles = useGlossMorphismStyles();

  const { windowsInBottomMenuList, windowsOutOfBottomMenuList } =
    allWindows.reduce(
      (acc, currentWindowItem, index) => {
        if (currentWindowItem.isInBottomList) {
          acc.windowsInBottomMenuList.push(currentWindowItem);
        } else {
          acc.windowsOutOfBottomMenuList.push(currentWindowItem);
        }
        return acc;
      },
      { windowsInBottomMenuList: [], windowsOutOfBottomMenuList: [] } as {
        windowsInBottomMenuList: WindowType[];
        windowsOutOfBottomMenuList: WindowType[];
      }
    );

  const onIconClick = (windowIndex: number) => {
    const newlyUpdatedWindows = windowsInBottomMenuList.map(
      (openedWindow, index) => {
        if (index !== windowIndex) return openedWindow;
        return {
          ...openedWindow,
          isWindowHidden: false,
        };
      }
    );

    setOpenedWindows([...windowsOutOfBottomMenuList, ...newlyUpdatedWindows]);
  };

  return (
    <Grid className={localStyles.iconsMenu}>
      <Grid className={localStyles.glass}>
        {windowsInBottomMenuList.map((windowItem, index) => {
          return (
            <Grid>
              <IconButton
                key={windowItem.key}
                onClick={() => onIconClick(index)}
              >
                <TerminalIcon style={{ width: 42, height: 42 }} />
              </IconButton>
              {!windowItem.isAppStarted && (
                <Grid
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    position: "relative",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bottom: 7,
                  }}
                />
              )}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default BottomMenu;
