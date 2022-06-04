import { Grid } from "@material-ui/core";
import "./Components/Css/App.css";
import DraggableAndResizableWindow from "./Components/Windows/Drag/DraggableAndResizableWindow";
import Terminal from "./Components/Windows/Terminal/Terminal";

const App = () => {
  const openedWindows = [
    {
      component: Terminal,
      windowName: "Terminal",
    },
  ];

  return (
    <Grid className={"master"}>
      {openedWindows.map((window) => {
        return (
          <DraggableAndResizableWindow key={window.windowName}>
            <window.component />
          </DraggableAndResizableWindow>
        );
      })}
    </Grid>
  );
};

export default App;
