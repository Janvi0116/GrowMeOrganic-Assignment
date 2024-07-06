import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import UserForm from "./pages/UserForm";
import TableAndDropDown from "./pages/TableAndDropDown";

function App(): JSX.Element {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/data_table_dropdown" element={<TableAndDropDown/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
