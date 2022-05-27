import { Grid } from "@material-ui/core";
import "./Components/Css/App.css";
import DraggableWindow from "./Components/Drag/DraggableWindow";
import Terminal from "./Components/Terminal/Terminal";

const App = () => {
  return (
    <Grid style={{ width: "100%", height: "100vh" }} className={"master"}>
      <DraggableWindow>
        <Terminal />
      </DraggableWindow>
    </Grid>
  );
};

export default App;
