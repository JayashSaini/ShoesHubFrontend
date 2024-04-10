import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./Pages";
import Layout from "./Layout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
