import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast'
import Create from './Pages/Create'
import  View  from './Components/View/View'
import Post from './Store/PostContext'

function App() {
  return (
    <div>
      <Post>
      <BrowserRouter>
      <Toaster/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sell' element={<Create />} />
          <Route path='/view' element={<View/>} />
          
        </Routes>
      </BrowserRouter>
      </Post>   
    </div>
  )
}

export default App
