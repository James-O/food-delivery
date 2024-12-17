import './App.css'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Outlet } from 'react-router-dom'


export default function App() {
  return (
    <div className='mx-16'>
      <Navbar/>
      <div>
        <Outlet/>
      </div>
      <Footer/>
    </div>

    // <div className='mx-16'>
    //   <Navbar/>
    //   <Routes>
    //     <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
    //     <Route path='/login' element={<Login />} />
    //     <Route path='/register' element={<Register />} />
    //   </Routes>
    //   <Footer/>
    // </div>
  )
}