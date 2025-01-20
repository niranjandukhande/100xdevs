import { useState } from 'react';
import './App.css'
import { SidebarClass1 } from './components/answers/1-basic-project'
import { SidebarToggle } from './components/icons/SidebarToggle';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <div className='flex h-screen'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}></Sidebar>
      <MainComponent sidebarOpen={sidebarOpen}></MainComponent>
    </div>
  )
}

function Sidebar({sidebarOpen,setSidebarOpen}){
  if(!sidebarOpen){
    return <div className='fixed top-0 left-0'>
      <div className='cursor-pointer bg-slate-300' onClick={()=>{
      setSidebarOpen(!sidebarOpen);
    }}>
      <SidebarToggle></SidebarToggle>
    </div>
    </div>
  }
  if(sidebarOpen){
    return <div className='w-96 bg-blue-300 h-screen'>
    <div className='cursor-pointer bg-slate-300' onClick={()=>{
      setSidebarOpen(!sidebarOpen);
    }}>
      <SidebarToggle></SidebarToggle>
    </div>
  </div>
  }
  
  
}

function MainComponent({sidebarOpen}){
  return <div className='w-full'>
    <div className='h-72 bg-black hidden md:block'></div>
    <div className='grid grid-cols-11 gap-8 p-8'>
      <div className='h-96 rounded-2xl shadow bg-red-200 md:col-span-2 -translate-y-24 shadow-lg col-span-11 hidden md:block'></div>
      <div className='h-96 rounded-2xl shadow bg-green-200 md:col-span-6 shadow-lg col-span-11'></div>
      <div className='h-96 rounded-2xl shadow bg-yellow-200 md:col-span-3 shadow-lg col-span-11'></div>
    </div>
  </div>
}

export default App
