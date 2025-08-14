import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminProvider from "./Context/AdminProvider.tsx";

createRoot(document.getElementById('root')!).render(
      <AdminProvider>
          <App />
      </AdminProvider>
)
