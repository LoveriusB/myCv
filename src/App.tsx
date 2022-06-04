import { Grid } from "@material-ui/core";
import { useState } from "react";
import { WindowType } from "./Components/API/Types";
import BottomMenu from "./Components/BottomMenu/BottomMenu";
import "./Components/Css/App.css";
import Terminal from "./Components/Windows/Terminal/Terminal";
import Windows from "./Components/Windows/Windows";
import { ReactComponent as TerminalIcon } from "./Icons/TerminalIcon.svg";

const allDefaultWindows: WindowType[] = [
  {
    key: "Terminal",
    component: Terminal,
    icon: TerminalIcon,
    isWindowHidden: false,
    isInBottomList: true,
    isAppStarted: true,
  },
];

const App = () => {
  const [allWindows] = useState<WindowType[]>(allDefaultWindows);
  const [openedWindows, setOpenedWindows] = useState<WindowType[]>([]);

  return (
    <Grid className={"master"}>
      <Windows
        openedWindows={openedWindows}
        setOpenedWindows={setOpenedWindows}
      />
      <BottomMenu allWindows={allWindows} setOpenedWindows={setOpenedWindows} />
    </Grid>
  );
};

export default App;
