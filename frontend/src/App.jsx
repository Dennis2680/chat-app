import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat";
import Registration from "./pages/Registration";
import Login from "./pages/login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/"/>} />
      </Routes>
    </>
  );
}

export default App;
