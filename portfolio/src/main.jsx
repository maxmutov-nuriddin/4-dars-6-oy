import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './context/AuthContext.jsx'
import StoreProvider from './redux/store/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <StoreProvider>
      <App />
    </StoreProvider>
  </AuthContextProvider>
)
