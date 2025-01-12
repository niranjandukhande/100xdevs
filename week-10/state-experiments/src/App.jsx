import { createContext, useContext, useState } from "react"

const BulbContext = createContext();

function BulbProvider({children}){
  const [bulbOn, setBulbOn] = useState(true);
  return <BulbContext.Provider value={{
    bulbOn: bulbOn,
    setBulbOn: setBulbOn
  }}>
    {children}
  </BulbContext.Provider>
}

function App() {
  return (
    <div>
      <BulbProvider>
        <Light />
      </BulbProvider>
    </div>
  )
}

function Light(){
  return <div>
    <LightBulb />
    <LightSwitch />
  </div>
}

function LightBulb(){
  const {bulbOn} = useContext(BulbContext)
  return <div>
    {bulbOn ? "Bulb ON" : "Bulb OFF"}
  </div>
}

function LightSwitch(){
  const {bulbOn,setBulbOn} = useContext(BulbContext)
  function toggle(){
    // setBulbOn(currentState => !currentState)
    setBulbOn(!bulbOn);
  }

  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}

export default App
