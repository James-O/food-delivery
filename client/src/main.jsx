import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from '../src/shared/router.jsx'
import { UserProvider } from '../context/userContext'

import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>,
)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <UserProvider>
//         <App />
//       </UserProvider>
//     </BrowserRouter>
//   </StrictMode>,
// )