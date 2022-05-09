import React from "react"
import Home from "./component/Home/home";
import {
  Routes,
  Route
} from 'react-router-dom';
import Redirect from "./component/redirect";

function App() {
  return ( 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:code" element={<Redirect/>}/>
        </Routes>
  );
}

export default App;
