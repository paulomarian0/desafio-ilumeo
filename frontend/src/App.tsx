import { useState } from 'react'
import './App.css'
import AuthProvider from './context/AuthContext';
import PrivatedRoute from './routes/PrivatedRoutes'
import PublicRoutes from './routes/PublicRoutes'

function App() {

  const isLogged = !!localStorage.getItem('token');

  return (
    <div className="App">

      <AuthProvider>
        {isLogged ? (
          <PrivatedRoute />
        ) :
          <PublicRoutes />
        }
      </AuthProvider>
    </div>
  )
}

export default App
