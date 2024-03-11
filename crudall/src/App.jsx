import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './input.css'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import Result from './components/Result'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Result/>
    </BrowserRouter>
    </>
  )
}

export default App
