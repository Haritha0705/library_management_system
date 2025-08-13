
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminProvider from "./Context/AdminProvider.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <AdminProvider>
        <App />
      </AdminProvider>
    </BrowserRouter>
)
