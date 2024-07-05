import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form.tsx";
import Component from "./pages/Component2.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Form />}></Route>
        <Route path="/second" element={<Component />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
