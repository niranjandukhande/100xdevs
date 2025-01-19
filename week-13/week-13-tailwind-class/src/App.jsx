import './App.css'
import { Button } from './components/button'
import { Input } from './components/input'
import { Otp } from './components/Otp'

function App() {

  return (
    <div className="h-screen bg-[#002a5a]">
      <br></br>
      <br></br>
      <br></br>
      <Otp number={20}></Otp>
    </div>
  )
}

export default App
