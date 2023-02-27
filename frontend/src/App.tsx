import { SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router';
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

      <div style={{ color: 'white', padding: '1rem' }}>
        <a 
        href='/login'
        onClick={() => 
          {localStorage.clear()
          }}>
        <SignOut size={32} />
        </a>
      </div>
    </div>
  )
}

export default App
