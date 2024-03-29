import { useState } from 'react'
import { signOut } from 'firebase/auth'
import {auth} from './firebase'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home"
import CreatePost from './pages/CreatePost'
import Login from './pages/Login'
import './App.css'

function App() {
  const[isAuth, setIsAuth] = useState(false)

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };
  

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        {!isAuth ? (
        <Link to='/login'>Login</Link>
        ) : ( 
          <>
            <Link to='/createpost'>Create Post</Link>
            <button onClick={signUserOut}>Log out</button>
          </>)}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
      </Routes>
    </Router>

  )
}

export default App
