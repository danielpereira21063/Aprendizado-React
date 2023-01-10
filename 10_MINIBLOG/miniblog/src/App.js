import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

//pages

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadinUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadinUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />}></Route>
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/"></Navigate>}></Route>
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/"></Navigate>}></Route>
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login"></Navigate>}></Route>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login"></Navigate>}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
