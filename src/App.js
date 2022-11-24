import Todo from "./page/Todo";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//後臺次頁面
import Login from "./page/Vote/Be/Login";
import Vote from "./page/Vote/Be/Vote";
import Ranking from "./page/Vote/Be/Ranking";
import Map from "./page/Map";

function App() {
  const [name, setName] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login name={name} setName={setName} />} />
        <Route path="/vote" element={<Vote name={name} />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
