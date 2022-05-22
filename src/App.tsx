import { Grid } from "@material-ui/core";
import "./Components/Css/App.css";
import Terminal from "./Components/Terminal/Terminal";

const App = () => {
  return (
    <Grid style={{ width: "100%", height: "100vh" }} className={"master"}>
      <Terminal />
    </Grid>
  );
};

export default App;
