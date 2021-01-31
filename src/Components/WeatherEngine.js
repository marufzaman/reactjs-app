import React, { useState, useEffect } from 'react'
import WeatherCard from './WeatherCard/Component'
import PulseLoader from 'react-spinners/PulseLoader'

const WeatherEngine = ({ location }) => {
  const [, setQuery] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState({
    city: null,
    country: null,
    temp: null,
    condition: null,
  })

  const getWeather = async (q) => {
    setQuery('')
    setLoading(true)
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=40321937f2d01d0a0f2119aa2f84454f`,
      )
      const resJSON = await apiRes.json()
      setWeather({
        city: resJSON.name,
        country: resJSON.sys.country,
        temp: resJSON.main.temp,
        condition: resJSON.weather[0].main,
      })
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    getWeather(location)
  }, [location])

  if (error) {
    return (
      <div style={{ color: 'black' }}>
        There is an Error!
        <br />
        <button onClick={() => setError(false)}>Reset!</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          width: '200px',
          height: '240px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PulseLoader size={15} color="purple" />
      </div>
    )
  }

  return (
    <WeatherCard
      getWeather={getWeather}
      city={weather.city}
      country={weather.country}
      temp={weather.temp}
      condition={weather.condition}
    />
  )
}

export default WeatherEngine
