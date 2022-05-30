import { Grid } from "@material-ui/core";
import "./Components/Css/App.css";
import DraggableAndResizableWindow from "./Components/Windows/Drag/DraggableAndResizableWindow";
import Terminal from "./Components/Windows/Terminal/Terminal";

const App = () => {
  return (
    <Grid className={"master"}>
      <DraggableAndResizableWindow>
        <Terminal />
      </DraggableAndResizableWindow>
    </Grid>
  );
};

export default App;
