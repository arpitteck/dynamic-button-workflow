import { Routes, Route, Link } from "react-router-dom";
import './App.css'
import ConfigPage from "./components/ConfigPage";
import OutputPage from "./components/OutputPage";

function App() {
  return (
    <div>
      <h1>React App with Routing</h1>
      <nav>
        <Link to="/config">Go to Config Page</Link> | 
        <Link to="/output">Go to Output Page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </div>
  );
}

export default App;
