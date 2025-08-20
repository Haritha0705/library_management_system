
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminContextProvider from "./Context/AdminContext.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </BrowserRouter>
)
