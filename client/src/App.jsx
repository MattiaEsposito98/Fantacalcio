import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalProvider from "./context/GlobalContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
