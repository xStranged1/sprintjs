import { useState } from 'react'
import './App.css'

function App() {

  const [time, setTime] = useState('')
  const [distance, setDistance] = useState('')
  const [pace, setPace] = useState('')

  const calculatePace = () => {

    const timePerKm = time / distance
    const minutes = timePerKm / 60

    const decimal = minutes % 1
    const seconds = (decimal * 100) * 60 / 100
    setPace(`${Math.floor(minutes)}:${Math.round(seconds)}m / KM`)
  }

  return (
    <div className='bg-red-50'>
      <h1 className=''>SprintJS</h1>
      <h2>Tiempo total (s)</h2>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
      <h2>Distancia total (km)</h2>
      <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
      <br />
      <button onClick={calculatePace}>Calcular ritmo</button>
      <h1>Ritmo: {pace}</h1>
    </div>
  )
}

export default App
