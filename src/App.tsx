import './App.css'
import { CustomerProvider } from './context/Customer'
import RoutesApp from './routes-app'

function App() {
  return (
    <>
      <CustomerProvider>
        <RoutesApp />
      </CustomerProvider>
    </>
  )
}

export default App
