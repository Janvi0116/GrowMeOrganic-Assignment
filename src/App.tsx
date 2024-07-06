import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Component from "./pages/Component2";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/second" element={<Component />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
