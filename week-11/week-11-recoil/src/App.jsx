import { useState } from "react";
import {RecoilRoot,atom, useRecoilValue, useSetRecoilState} from "recoil";
import { counterAtom, evenSelector } from "./store/atoms/counter";


function App() {
  
  return (
    <>
    <RecoilRoot>
      <Buttons/>
      <Counter/>
      <IsEven/>
    </RecoilRoot>
    </>
  )
}

function Buttons(){

  const setCount = useSetRecoilState(counterAtom)
  function increase(){
    setCount(c => c + 2);
  }

  function decrease(){
    setCount(c => c - 1);
  }
  return<div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Counter(){
  const count = useRecoilValue(counterAtom);

  return <div>
    {count}
  </div>
}

function IsEven(){
  const even = useRecoilValue(evenSelector);
  return <div>
    {even ? "Even":"Odd"}
  </div>
}

export default App
