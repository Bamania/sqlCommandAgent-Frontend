import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatInterface from './components/ChatInterface'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <div className="App w-full h-full">
      <ChatInterface />
    </div>
    </>
  )
}

export default App
