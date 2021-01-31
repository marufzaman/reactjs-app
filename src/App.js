import './App.css'
import React from 'react'
import WeatherEngine from './Components/WeatherEngine'

function App() {
  return (
    <div className="App">
      <WeatherEngine location="Dhaka, BD" />
      {/* <WeatherEngine location="Chiba, JP" />
      <WeatherEngine location="New York, USA" /> */}
    </div>
  )
}

export default App
