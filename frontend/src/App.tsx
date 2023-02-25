import { useState } from 'react'
import './App.css'
import PrivatedRoute from './routes/PrivatedRoutes'
import PublicRoutes from './routes/PublicRoutes'

function App() {

  const isLogged = false;

  return (
    <div className="App">

      {isLogged ? (
        <PrivatedRoute />
      ) :
        <PublicRoutes />
      }


    </div>
  )
}

export default App
