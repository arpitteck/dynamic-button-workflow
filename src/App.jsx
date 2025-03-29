import { Routes, Route, Link } from "react-router-dom";
import ConfigPage from "./ConfigPage";
import OutputPage from "./OutputPage";
import './App.css'

function App() {
  return (
    <div>
      <h1>React App with Routing</h1>
      <nav>
        <Link to="/config">Go to Config Page</Link> | 
        <Link to="/output">Go to Output Page</Link>
      </nav>
      <Routes>
        <Route path="/config" element={<ConfigPage />} />
        <Route path="/output" element={<OutputPage />} />
      </Routes>
    </div>
  );
}

export default App;
