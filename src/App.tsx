import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Form from "./pages/Form";
import Component from "./pages/Component2";

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second" element={<Component />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
