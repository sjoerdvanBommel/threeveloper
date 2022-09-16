import { Leva } from "leva";
import "./App.css";
import FolioCanvas from "./folio/src/javascript/FolioCanvas";
import "./folio/src/style/main.css";

const isLevaDebug = window.location.hash === "#leva";

function App() {
  return (
    <div className="w-screen h-screen">
      <Leva hidden={!isLevaDebug} collapsed oneLineLabels />
      <FolioCanvas />
    </div>
  );
}

export default App;
