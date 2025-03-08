import { useState } from "react";
import Home from "./Pages/Home/Home";
import "./App.css";
import Spiriter from "./Pages/Spiriter";

function App() {
  const [count, setCount] = useState(0);

  return <Home />;
}

export default App;
